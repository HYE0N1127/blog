"use server";

import { createClient } from "@/utils/supabase/server";
import type { EditorState } from "@hyeon1127/text-editor-kit";
import { redirect } from "next/navigation";

type Article = {
  title: string;
  content?: EditorState;
};

/**
 * 현재 작성된 아티클의 내용을 수정합니다.
 *
 * @param id: 아티클의 id
 * @param title: 아티클의 제목
 * @param content: 아티클의 내용
 */
export const updateArticle = async ({
  id,
  title,
  content,
}: { id: string } & Article) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("articles")
    .update({ title, content })
    .eq("id", id);

  if (error != null) {
    throw new Error(error.message);
  }
};

/**
 * 작성한 아티클을 출간합니다.
 *
 * @param title: 작성한 아티클의 제목
 * @param content: 작성한 아티클의 내용
 */
export const publishArticle = async ({ title, content }: Article) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .insert({ title, content, status: "published" })
    .select("id")
    .single();

  if (error != null) {
    throw new Error(error.message);
  }

  // 출간 완료 후 해당 아티클 페이지로 이동합니다.
  redirect(`/articles/${data.id}`);
};
