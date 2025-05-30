const ArticleDetailSkeleton = () => {
  return (
    <div className="py-10 px-5 md:px-40 flex items-center flex-col space-y-4 animate-pulse">
      <div className="h-4 w-48 bg-gray-200 rounded" />
      <div className="h-8 w-3/4 bg-gray-300 rounded" />
      <div className="w-full max-w-5xl h-[300px] bg-gray-200 rounded-xl" />
      <div className="space-y-2 w-full max-w-4xl">
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-5/6 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export default ArticleDetailSkeleton;