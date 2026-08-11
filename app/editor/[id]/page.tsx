import { redirect, notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { getCurrentUserWithAdminFlag } from "@/utils/supabase/admin";
import type { EditorState } from "@hyeon1127/text-editor-kit";
import EditorForm from "@/components/editor/form/index";

type Props = { params: Promise<{ id: string }> };

const ModifyPage = async ({ params }: Props) => {
  const { id } = await params;
  const { user, isAdmin } = await getCurrentUserWithAdminFlag();

  // 페이지에 진입한 유저가 어드민이 아니거나, 비로그인 상태인 경우 Home으로 redirect합니다.
  if (!user || !isAdmin) {
    redirect("/");
  }

  const supabase = await createClient();
  const { data: post } = await supabase
    .from("articles")
    .select("id, title, content")
    .eq("id", id)
    .single();

  if (post == null) {
    notFound();
  }

  return (
    <div className="max-w-195 mx-auto py-12 px-8">
      <EditorForm
        postId={post.id}
        initialTitle={post.title}
        initialContent={post.content as EditorState}
      />
    </div>
  );
};

export default ModifyPage;
