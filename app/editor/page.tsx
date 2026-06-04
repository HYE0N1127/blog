import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import EditorForm from "@/components/editor/form/index";

const EditPage = async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.ADMIN_EMAIL) {
    redirect("/");
  }

  return (
    <div className="max-w-195 mx-auto py-12 px-8">
      <EditorForm />
    </div>
  );
};

export default EditPage;
