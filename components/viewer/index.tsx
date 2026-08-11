"use client";

import dynamic from "next/dynamic";
import type { EditorState } from "@hyeon1127/text-editor-kit";

const Viewer = dynamic(
  () => import("@hyeon1127/text-editor-kit").then((m) => m.Viewer),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 rounded-lg bg-blog-bg-3 animate-pulse" />
    ),
  },
);

type Props = {
  data: EditorState;
};

const ArticleViewer = ({ data }: Props) => {
  return <Viewer data={data} />;
};

export default ArticleViewer;
