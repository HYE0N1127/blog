"use client";

import { useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import type { EditorState } from "@hyeon1127/text-editor-kit";
import DraftModal, { Draft } from "../modal/index";
import { useDraft } from "@/hooks/draft/index";
import { useEditorSave } from "@/hooks/editor/index";

const Editor = dynamic(
  () => import("@hyeon1127/text-editor-kit").then((m) => m.Editor),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 rounded-lg bg-blog-bg-3 animate-pulse" />
    ),
  },
);

type SaveStatus = "idle" | "pending" | "saving" | "saved" | "error";

const STATUS_LABEL: Record<SaveStatus, string> = {
  idle: "",
  pending: "변경됨",
  saving: "저장 중...",
  saved: "임시저장 완료",
  error: "저장 실패",
};

type Props = {
  postId?: string;
  initialTitle?: string;
  initialContent?: EditorState;
};

const EditorForm = ({
  postId: initialPostId,
  initialTitle = "",
  initialContent,
}: Props) => {
  const isNewPost = !initialPostId;

  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState<EditorState | undefined>(
    initialContent,
  );
  const [editorKey, setEditorKey] = useState(0);

  const handleRestoreFromDraft = useCallback((draft: Draft) => {
    setTitle(draft.title);
    setContent(draft.content);
    setEditorKey((key) => key + 1);
  }, []);

  const { draftModal, saveToLocal, handleRestore, handleIgnore, clearDraft } =
    useDraft({ isNewPost, onRestore: handleRestoreFromDraft });

  const {
    saveStatus,
    publishing,
    triggerAutoSave,
    handleManualSave,
    handlePublish,
    clearTimer,
  } = useEditorSave({
    postId: initialPostId,
    isNewPost,
    onSaveToLocal: saveToLocal,
    onClearDraft: clearDraft,
  });

  // initialContent가 늦게 도착하는 경우 동기화 (편집 페이지)
  useEffect(() => {
    if (initialContent === undefined) return;
    setContent(initialContent);
    setEditorKey((k) => k + 1);
  }, [initialContent]);

  // 언마운트 시 타이머 정리
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
              onClick={() => handleManualSave(title, content)}
              disabled={saveStatus === "saving" || !title.trim()}
              className="px-4 py-2 border border-blog-border-muted bg-blog-bg text-blog-fg-muted text-xs font-semibold font-mono rounded-md disabled:opacity-40 hover:bg-blog-bg-3 hover:text-blog-fg transition-colors cursor-pointer"
            >
              임시저장
            </button>

            {/* 발행 */}
            <button
              onClick={() => handlePublish(title, content)}
              disabled={publishing || !title.trim()}
              className="px-5 py-2 bg-blog-fg text-blog-bg text-xs font-semibold font-mono rounded-md disabled:opacity-40 hover:opacity-80 transition-opacity cursor-pointer"
            >
              {publishing ? "발행 중..." : "발행"}
            </button>
          </div>
        </div>

        {/* 제목 */}
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            triggerAutoSave(e.target.value, content);
          }}
          placeholder="제목을 입력하세요"
          className="w-full bg-transparent text-3xl font-bold text-blog-fg placeholder:text-blog-fg-subtle outline-none border-b border-blog-border pb-4 font-mono"
        />

        {/* 에디터 — key로 재마운트 제어 */}
        {!initialPostId || content !== undefined ? (
          <Editor
            key={editorKey}
            initialData={content}
            onChange={(data) => {
              setContent(data);
              triggerAutoSave(title, data);
            }}
          />
        ) : (
          <div className="h-96 rounded-lg bg-blog-bg-3 animate-pulse" />
        )}
      </div>
    </>
  );
};

export default EditorForm;
