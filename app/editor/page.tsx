import { redirect } from "next/navigation";
import EditorForm from "@/components/editor/form";
import { getCurrentUserWithAdminFlag } from "@/utils/supabase/admin";

const EditPage = async () => {
  const { user, isAdmin } = await getCurrentUserWithAdminFlag();

  if (!user || !isAdmin) {
    redirect("/");
  }

  return (
    <div className="max-w-195 mx-auto py-12 px-8">
      <EditorForm />
    </div>
  );
};

export default EditPage;
