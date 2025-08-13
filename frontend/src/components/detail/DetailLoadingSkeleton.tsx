export const DetailLoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Link */}
        <div className="mb-6">
          <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>

        {/* Header Skeleton */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-2 w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <div className="h-4 bg-gray-200 rounded mb-1 w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-32"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-200 rounded mb-1 w-20"></div>
              <div className="h-4 bg-gray-200 rounded w-28"></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <div className="h-4 bg-gray-200 rounded mb-1 w-28"></div>
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-200 rounded mb-1 w-24"></div>
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </div>
            <div>
              <div className="h-6 bg-gray-200 rounded w-20"></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm mb-1">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
              <div className="h-4 bg-gray-200 rounded w-8"></div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gray-300 h-2 rounded-full w-3/4"></div>
            </div>
          </div>
        </div>

        {/* Sections Skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="border border-gray-200 rounded-lg animate-pulse">
              <div className="px-6 py-4 bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded mb-2 w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-5 w-5 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
