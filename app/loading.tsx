const Loading = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col rounded-lg overflow-hidden border border-blog-border bg-blog-bg-2"
        >
          <div className="w-full aspect-video bg-blog-bg-3 animate-pulse" />
          <div className="flex flex-col gap-2 p-4">
            <div className="h-3 w-3/4 rounded bg-blog-bg-3 animate-pulse" />
            <div className="h-3 w-1/2 rounded bg-blog-bg-3 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Loading;
