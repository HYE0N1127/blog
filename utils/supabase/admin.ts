import { cache } from "react";
import { createClient } from "@/utils/supabase/server";

export const getCurrentUserWithAdminFlag = cache(async () => {
  const start = Date.now();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, isAdmin: false };
  }

  const profileStart = Date.now();
  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  return { user, isAdmin: profile?.is_admin ?? false };
});
