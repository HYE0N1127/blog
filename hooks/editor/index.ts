"use client";

import { useState, useRef, useCallback } from "react";
import type { EditorState } from "@hyeon1127/text-editor-kit";
import { updateArticle, publishArticle } from "@/actions/post";

type SaveStatus = "idle" | "pending" | "saving" | "saved" | "error";

export const STATUS_LABEL: Record<SaveStatus, string> = {
  idle: "",
  pending: "변경됨",
  saving: "저장 중...",
  saved: "임시저장 완료",
  error: "저장 실패",
};

type UseEditorSaveProps = {
  postId?: string;
  isNewPost: boolean;
  onSaveToLocal: (
    title: string,
    subtitle: string,
    content: EditorState | undefined,
    thumbnailUrl: string | undefined,
  ) => void;
  onClearDraft: () => void;
};

export const useEditorSave = ({
  postId,
  onSaveToLocal,
  onClearDraft,
}: UseEditorSaveProps) => {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [publishing, setPublishing] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const save = useCallback(
    async (
      title: string,
      subtitle: string,
      content: EditorState | undefined,
      thumbnailUrl: string | undefined,
      id?: string,
    ) => {
      if (!id || !title.trim()) {
        return;
      }

      setSaveStatus("saving");

      try {
        await updateArticle({ id, title, subtitle, content, thumbnailUrl });

        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } catch {
        setSaveStatus("error");
      }
    },
    [],
  );

  const triggerAutoSave = useCallback(
    (
      title: string,
      subtitle: string,
      content: EditorState | undefined,
      thumbnailUrl: string | undefined,
    ) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      setSaveStatus("pending");
      onSaveToLocal(title, subtitle, content, thumbnailUrl);

      timerRef.current = setTimeout(
        () => save(title, subtitle, content, thumbnailUrl, postId),
        2000,
      );
    },
    [save, onSaveToLocal, postId],
  );

  const handleManualSave = useCallback(
    (
      title: string,
      subtitle: string,
      content: EditorState | undefined,
      thumbnailUrl: string | undefined,
    ) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      onSaveToLocal(title, subtitle, content, thumbnailUrl);
      setSaveStatus("saved");

      setTimeout(() => setSaveStatus("idle"), 3000);
    },
    [onSaveToLocal],
  );

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

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  }, []);

  return {
    saveStatus,
    publishing,
    triggerAutoSave,
    handleManualSave,
    handlePublish,
    clearTimer,
  };
};
