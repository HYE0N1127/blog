"use client";

import { useState, useCallback, useEffect } from "react";
import type { EditorState } from "@hyeon1127/text-editor-kit";
import { DRAFT_STORAGE_KEY } from "@/constants/key";
import { Draft } from "@/components/editor/modal/index";

type UseDraftProps = {
  isNewPost: boolean;
  onRestore: (draft: Draft) => void;
};

export const useDraft = ({ isNewPost, onRestore }: UseDraftProps) => {
  const [draftModal, setDraftModal] = useState<Draft | null>(null);

  useEffect(() => {
    if (!isNewPost) {
      return;
    }
    try {
      const raw = localStorage.getItem(DRAFT_STORAGE_KEY);

      if (!raw) {
        return;
      }

      const draft = JSON.parse(raw) as Draft;

      if (draft.title?.trim() || draft.content) {
        setDraftModal(draft);
      }
    } catch {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    }
  }, [isNewPost]);

  const saveToLocal = useCallback(
    (
      title: string,
      subtitle: string,
      content: EditorState | undefined,
      thumbnailUrl: string | undefined,
    ) => {
      if (!isNewPost) {
        return;
      }

      try {
        const data: Draft = {
          title,
          subtitle,
          content,
          thumbnailUrl,
          savedAt: new Date().toISOString(),
        };

        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(data));
      } catch {}
    },
    [isNewPost],
  );

  const handleRestore = useCallback(() => {
    if (!draftModal) return;
    onRestore(draftModal);
    setDraftModal(null);
  }, [draftModal, onRestore]);

  const handleIgnore = useCallback(() => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
    setDraftModal(null);
  }, []);

  const clearDraft = useCallback(() => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  }, []);

  return { draftModal, saveToLocal, handleRestore, handleIgnore, clearDraft };
};
