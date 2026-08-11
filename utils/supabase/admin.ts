import { createClient } from "@/utils/supabase/server";

export const getCurrentUserWithAdminFlag = async () => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user == null) {
    return { user: null, isAdmin: false };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  return { user, isAdmin: profile?.is_admin ?? false };
};
