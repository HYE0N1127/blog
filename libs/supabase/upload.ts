"use client";

import { createClient } from "@/utils/supabase/client";

export const uploadArticleImage = async (file: File): Promise<string> => {
  const supabase = createClient();
  const ext = file.name.split(".").pop();
  const path = `${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("article-images")
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (error != null) {
    throw new Error(error.message);
  }

  const { data } = supabase.storage.from("article-images").getPublicUrl(path);

  return data.publicUrl;
};
