
import { FiDownload,FiTrash2,FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
interface Thumbnail {
  _id: string;
  title: string;
  image_url: string;
  aspect_ratio: string;
  style: string;
  color_scheme: string;
  createdAt: string;
}
interface MythumbnailCardProps {
  thumb: Thumbnail;
  setThumbnails: React.Dispatch<React.SetStateAction<Thumbnail>>;
}
function MythumbnailCard({ thumb,setThumbnails  }: MythumbnailCardProps) {
  const navigate = useNavigate();
  

  const ratioClassMap: Record<string, string> = {
    "16:9": "aspect-video",
    "1:1": "aspect-square",
    "9:16": "aspect-[9/16]",
  };

  const ratioClass =
    ratioClassMap[thumb.aspect_ratio] || "aspect-video";

const handleDelete = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:5000/api/thumbnails/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    // ✅ Remove from UI instantly
    setThumbnails(prev => prev.filter(item => item._id !== id));

  } catch (err: any) {
    alert(err.message);
  }
};

    

  return (
    <div
      className="group rounded-xl overflow-hidden bg-white/5 hover:scale-[1.02] transition-transform duration-300"
    >
      {/* IMAGE */}
      <div
        className={`relative ${ratioClass}`}
        onClick={() => navigate(`/generate/${thumb._id}`)}
      >
        <img
          src={thumb.image_url}
          alt={thumb.title}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* CONTENT */}
      <div className="p-4 relative">
        <h3 className="text-sm font-semibold text-white">
          {thumb.title}
        </h3>

        <div className="flex flex-wrap gap-2 mt-3 text-xs text-gray-300">
          <span className="px-2 py-1 rounded-md bg-white/10">
            {thumb.style}
          </span>
          <span className="px-2 py-1 rounded-md bg-white/10">
            {thumb.aspect_ratio}
          </span>
        </div>

        <p className="mt-3 text-xs text-gray-500">
          {new Date(thumb.createdAt).toLocaleString()}
        </p>

        {/* Hover Icons */}
        <div className="absolute bottom-2 right-1 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={() => handleDelete(thumb._id)}
            className="w-6 h-6 flex items-center justify-center rounded-md bg-black/70 text-white hover:bg-pink-600">
            <FiTrash2 />
          </button>

          <a
            href={thumb.image_url}
            download
            onClick={(e) => e.stopPropagation()}
            className="w-6 h-6 flex items-center justify-center rounded-md bg-black/70 text-white hover:bg-pink-600"
          >
            <FiDownload />
          </a>

          <a
            href={`/preview/${thumb._id}`}
            target="_blank"
            className="w-6 h-6 flex items-center justify-center rounded-md bg-black/70 text-white hover:bg-pink-600"
          >
            <FiArrowRight className=" rotate-320" />
          </a>
        </div>
      </div>
    </div>
  );
}
export default MythumbnailCard ;