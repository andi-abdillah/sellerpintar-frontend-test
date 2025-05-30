const ArticleCardSkeleton = () => {
  return (
    <div className="w-72 h-full space-y-4 animate-pulse">
      <div className="h-44 bg-gray-200 rounded-xl" />
      <div className="space-y-2">
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-5 w-3/4 bg-gray-300 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-5/6 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

export default ArticleCardSkeleton