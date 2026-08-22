"use client";

const GlobalError = ({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) => {
  return (
    <html>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "16px",
          backgroundColor: "#0e0e0e",
          color: "#efefef",
          fontFamily: "monospace",
        }}
      >
        <p style={{ fontSize: "13px", color: "#888888" }}>
          앱을 불러오는 중 문제가 발생했어요.
        </p>
        <button
          onClick={() => retry()}
          style={{
            padding: "8px 16px",
            border: "1px solid #2a2a2a",
            backgroundColor: "#0e0e0e",
            color: "#888888",
            fontSize: "11px",
            fontWeight: 600,
            fontFamily: "monospace",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          다시 시도
        </button>
      </body>
    </html>
  );
};

export default GlobalError;
