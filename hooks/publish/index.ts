"use client";

import { useState, useCallback } from "react";
import type { EditorState } from "@hyeon1127/text-editor-kit";
import { updateArticle, publishArticle } from "@/actions/post";

type UsePublishProps = {
  postId?: string;
  onClearDraft: () => void;
};

export const usePublish = ({ postId, onClearDraft }: UsePublishProps) => {
  const [publishing, setPublishing] = useState(false);

  const handlePublish = useCallback(
    async (
      title: string,
      subtitle: string,
      content: EditorState | undefined,
      thumbnailUrl: string | undefined,
    ) => {
      setPublishing(true);
      try {
        onClearDraft();

        if (postId) {
          await updateArticle({
            id: postId,
            title,
            subtitle,
            content,
            thumbnailUrl,
          });
        } else {
          await publishArticle({ title, subtitle, content, thumbnailUrl });
        }
      } finally {
        setPublishing(false);
      }
    },
    [postId, onClearDraft],
  );

  return { publishing, handlePublish };
};
