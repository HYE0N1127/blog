"use client";

import { useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { DEFAULT_THUMBNAIL_URL } from "@/constants/thumbnail";
import { uploadArticleImage } from "@/utils/supabase/storage";

type Props = {
  value?: string;
  onChange: (url: string | undefined) => void;
};

const ThumbnailUpload = ({ value, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file == null) {
      return;
    }

    setUploading(true);

    try {
      const url = await uploadArticleImage(file);
      onChange(url);
    } catch {
      alert("썸네일 업로드에 실패했습니다.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <span className="text-[11px] text-blog-fg-subtle font-mono tracking-wide">
        썸네일
      </span>

      <div className="relative w-full max-w-[320px] aspect-video rounded-md overflow-hidden border border-blog-border bg-blog-bg-3 group">
        <img
          src={value ?? DEFAULT_THUMBNAIL_URL}
          alt="썸네일 미리보기"
          className="w-full h-full object-cover"
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="absolute inset-0 flex items-center justify-center gap-1.5 bg-black/0 group-hover:bg-black/50 text-transparent group-hover:text-white text-xs font-mono font-semibold transition-colors"
        >
          <ImagePlus className="h-4 w-4" />
          {uploading ? "업로드 중..." : "이미지 변경"}
        </button>

        {value && (
          <button
            type="button"
            onClick={() => onChange(undefined)}
            aria-label="썸네일 제거"
            className="absolute top-2 right-2 flex items-center justify-center w-6 h-6 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleSelect}
        className="hidden"
      />
    </div>
  );
};

export default ThumbnailUpload;
