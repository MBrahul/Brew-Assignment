export default function MovieSkeleton() {
  return (
    <div className="mt-24 w-full max-w-6xl animate-pulse">

      <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden">

        <div className="grid lg:grid-cols-3">

          {/* Poster Skeleton */}
          <div className="bg-gray-800 h-[500px]" />

          {/* Content Skeleton */}
          <div className="lg:col-span-2 p-10 space-y-6">

            <div className="h-10 bg-gray-700 rounded w-3/4" />
            <div className="h-6 bg-gray-700 rounded w-1/4" />

            <div className="space-y-3">
              <div className="h-4 bg-gray-700 rounded w-full" />
              <div className="h-4 bg-gray-700 rounded w-5/6" />
              <div className="h-4 bg-gray-700 rounded w-4/6" />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
