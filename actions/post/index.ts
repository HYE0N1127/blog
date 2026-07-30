"use server";

import { revalidatePath } from "next/cache";
import { DEFAULT_THUMBNAIL_URL } from "@/constants/thumbnail";
import { createClient } from "@/utils/supabase/server";
import type { EditorState } from "@hyeon1127/text-editor-kit";
import { redirect } from "next/navigation";

type Article = {
  title: string;
  subtitle?: string;
  content?: EditorState;
  thumbnailUrl?: string;
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
  subtitle,
  content,
  thumbnailUrl,
}: { id: string } & Article) => {
  const supabase = await createClient();

  const { error } = await supabase
    .from("articles")
    .update({
      title,
      subtitle: subtitle || null,
      content,
      thumbnail_url: thumbnailUrl ?? DEFAULT_THUMBNAIL_URL,
    })
    .eq("id", id);

  if (error != null) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  revalidatePath(`/article/${id}`); // 상세 페이지
};

/**
 * 작성한 아티클을 출간합니다.
 *
 * @param title: 작성한 아티클의 제목
 * @param content: 작성한 아티클의 내용
 */
export const publishArticle = async ({
  title,
  subtitle,
  content,
  thumbnailUrl,
}: Article) => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("articles")
    .insert({
      title,
      subtitle: subtitle || null,
      content,
      thumbnail_url: thumbnailUrl ?? DEFAULT_THUMBNAIL_URL,
      status: "published",
    })
    .select("id")
    .single();

  if (error != null) {
    throw new Error(error.message);
  }

  revalidatePath("/");
  redirect(`/articles/${data.id}`);
};
