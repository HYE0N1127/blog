"use client";

import type { EditorState } from "@hyeon1127/text-editor-kit";

export type Draft = {
  title: string;
  subtitle: string;
  content?: EditorState;
  thumbnailUrl?: string;
  savedAt: string;
};

type Props = {
  draft: Draft;
  onRestore: () => void;
  onIgnore: () => void;
};

const DraftModal = ({ draft, onRestore, onIgnore }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-blog-bg-2 border border-blog-border rounded-xl p-6 w-full max-w-sm mx-4">
        <h2 className="text-sm font-bold text-blog-fg font-mono mb-4">
          임시저장된 글이 있어요
        </h2>

        <div className="bg-blog-bg-3 rounded-lg p-3 mb-5 space-y-1">
          <p className="text-[11px] font-mono text-blog-fg-muted">
            제목:{" "}
            <span className="text-blog-fg">
              {draft.title.trim() || "(제목 없음)"}
            </span>
          </p>
          <p className="text-[11px] font-mono text-blog-fg-subtle">
            저장 시각: {new Date(draft.savedAt).toLocaleString("ko-KR")}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onRestore}
            className="flex-1 py-2 bg-blog-fg text-blog-bg text-xs font-semibold font-mono rounded-md hover:opacity-80 transition-opacity"
          >
            이어서 작성
          </button>
          <button
            onClick={onIgnore}
            className="flex-1 py-2 bg-blog-bg border border-blog-border-muted text-blog-fg-muted text-xs font-semibold font-mono rounded-md hover:bg-blog-bg-3 hover:text-blog-fg transition-colors"
          >
            새로 작성
          </button>
        </div>
      </div>
    </div>
  );
};

export default DraftModal;
