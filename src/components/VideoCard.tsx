export default function VideoCard({ video }: any) {
  return (
    <div className="space-y-3 cursor-pointer">
      {/* Thumbnail */}
      <div className="relative aspect-video rounded-xl overflow-hidden">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Info */}
      <div className="flex gap-3">
        <img
          src={video.avatar}
          className="w-9 h-9 rounded-full"
        />

        <div>
          <h3 className="text-white text-sm font-semibold line-clamp-2">
            {video.title}
          </h3>
          <p className="text-xs text-gray-400">{video.channel}</p>
          <p className="text-xs text-gray-400">
            {video.views} views • {video.time}
          </p>
        </div>
      </div>
    </div>
  );
}
