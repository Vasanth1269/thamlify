export default function SkeletonCard() {
  return (
   <div className="bg-[#0f0f0f] rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-video bg-white/10" />

      <div className="p-4 space-y-3">
        <div className="h-4 bg-white/10 rounded w-3/4" />
        <div className="flex gap-2">
          <div className="h-6 w-16 bg-white/10 rounded" />
          <div className="h-6 w-16 bg-white/10 rounded" />
          <div className="h-6 w-12 bg-white/10 rounded" />
        </div>
        <div className="h-3 bg-white/10 rounded w-1/2" />
      </div>
    </div>
  );
}