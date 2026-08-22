"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import type { EditorState } from "@hyeon1127/text-editor-kit";
import DraftModal, { Draft } from "../modal";
import { useDraft } from "@/hooks/draft";
import { useEditorSave, STATUS_LABEL } from "@/hooks/editor";
import { uploadArticleImage } from "@/utils/supabase/storage";
import ThumbnailUpload from "../thumbnail";
import { usePublish } from "@/hooks/publish";

const Editor = dynamic(
  () => import("@hyeon1127/text-editor-kit").then((m) => m.Editor),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 rounded-lg bg-blog-bg-3 animate-pulse" />
    ),
  },
);

type Props = {
  postId?: string;
  initialTitle?: string;
  initialSubtitle?: string;
  initialContent?: EditorState;
  initialThumbnailUrl?: string;
};

type ArticleFormState = {
  title: string;
  subtitle: string;
  content: EditorState | undefined;
  thumbnailUrl: string | undefined;
};

const EditorForm = ({
  postId: initialPostId,
  initialTitle = "",
  initialSubtitle = "",
  initialContent,
  initialThumbnailUrl,
}: Props) => {
  const isNewPost = !initialPostId;

  const [form, setForm] = useState<ArticleFormState>({
    title: initialTitle,
    subtitle: initialSubtitle,
    content: initialContent,
    thumbnailUrl: initialThumbnailUrl,
  });
  const [editorKey, setEditorKey] = useState(0);

  const { draftModal, saveToLocal, handleRestore, handleIgnore, clearDraft } =
    useDraft({
      isNewPost,
      onRestore: (draft: Draft) => {
        setForm({
          title: draft.title,
          subtitle: draft.subtitle,
          content: draft.content,
          thumbnailUrl: draft.thumbnailUrl,
        });
        setEditorKey((key) => key + 1);
      },
    });

  const { saveStatus, triggerAutoSave, handleManualSave, clearTimer } =
    useEditorSave({
      postId: initialPostId,
      onSaveToLocal: saveToLocal,
    });

  const { publishing, handlePublish } = usePublish({
    postId: initialPostId,
    onClearDraft: clearDraft,
  });

  const updateForm = useCallback(
    (patch: Partial<ArticleFormState>) => {
      setForm((prev) => {
        const next = { ...prev, ...patch };
        triggerAutoSave(
          next.title,
          next.subtitle,
          next.content,
          next.thumbnailUrl,
        );
        return next;
      });
    },
    [triggerAutoSave],
  );

  useEffect(() => {
    if (initialContent === undefined) {
      return;
    }

    setForm((prev) => ({ ...prev, content: initialContent }));
    setEditorKey((key) => key + 1);
  }, [initialContent]);

  useEffect(() => {
    return clearTimer;
  }, [clearTimer]);

  return (
    <>
      {/* 임시저장 복원 모달 */}
      {draftModal && (
        <DraftModal
          draft={draftModal}
          onRestore={handleRestore}
          onIgnore={handleIgnore}
        />
      )}

      <div className="flex flex-col gap-8">
        {/* 상단 바 */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-mono text-blog-fg-subtle min-w-20">
            {STATUS_LABEL[saveStatus]}
          </span>

          <div className="flex items-center gap-2">
            {/* 수동 임시저장 */}
            <button
              onClick={() =>
                handleManualSave(
                  form.title,
                  form.subtitle,
                  form.content,
                  form.thumbnailUrl,
                )
              }
              disabled={saveStatus === "saving" || !form.title.trim()}
              className="px-4 py-2 border border-blog-border-muted bg-blog-bg text-blog-fg-muted text-xs font-semibold font-mono rounded-md disabled:opacity-40 hover:bg-blog-bg-3 hover:text-blog-fg transition-colors cursor-pointer"
            >
              임시저장
            </button>

            {/* 발행 */}
            <button
              onClick={() => {
                clearTimer();
                handlePublish(
                  form.title,
                  form.subtitle,
                  form.content,
                  form.thumbnailUrl,
                );
              }}
              disabled={publishing || !form.title.trim()}
              className="px-5 py-2 bg-blog-fg text-blog-bg text-xs font-semibold font-mono rounded-md disabled:opacity-40 hover:opacity-80 transition-opacity cursor-pointer"
            >
              {publishing ? "발행 중..." : "발행"}
            </button>
          </div>
        </div>

        {/* 제목 */}
        <input
          type="text"
          value={form.title}
          onChange={(e) => updateForm({ title: e.target.value })}
          placeholder="제목을 입력하세요"
          className="w-full bg-transparent text-3xl font-bold text-blog-fg placeholder:text-blog-fg-subtle outline-none border-b border-blog-border pb-4 font-mono"
        />

        {/* 부제목 */}
        <input
          type="text"
          value={form.subtitle}
          onChange={(e) => updateForm({ subtitle: e.target.value })}
          placeholder="부제목을 입력하세요 (선택)"
          className="w-full bg-transparent text-sm text-blog-fg-muted placeholder:text-blog-fg-subtle outline-none font-mono"
        />

        {/* 썸네일 업로드 */}
        <ThumbnailUpload
          value={form.thumbnailUrl}
          onChange={(url) => updateForm({ thumbnailUrl: url })}
        />

        {/* 에디터 — key로 재마운트 제어 */}
        {!initialPostId || form.content !== undefined ? (
          <Editor
            key={editorKey}
            initialData={form.content}
            onChange={(data) => updateForm({ content: data })}
            onImageUpload={uploadArticleImage}
          />
        ) : (
          <div className="h-96 rounded-lg bg-blog-bg-3 animate-pulse" />
        )}
      </div>
    </>
  );
};

export default EditorForm;
