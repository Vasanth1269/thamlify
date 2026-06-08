import MythumbnailCard from "../components/MythumbnailCard";
import SoftBackdrop from "../components/softBackdrop";
import SkeletonGrid from "../components/SkeletonGrid";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Thumbnail {
  _id: string;
  title: string;
  image_url: string;
  aspect_ratio: string;
  style: string;
  color_scheme: string;
  createdAt: string;
}

function MygeneratePage() {
  const [isLoading, setIsLoading] = useState(true);
  const[error , setError] = useState('')
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    // temporary fake loading
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
  const fetchThumbnails = async () => {
    try {
      const res = await fetch(`${API_URL}/api/thumbnails`, {
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to fetch thumbnails");
      }

      const data = await res.json();
       setThumbnails(data.thumbnails|| [] )
      console.log("API DATA:", data); // debug
    
    } catch (err: any) {
      setError(err.message);
    } 
  };
 
  fetchThumbnails();
}, []);
  

  return (
    <div className="min-h-screen pt-28 px-6 md:px-10 py-8">
      <SoftBackdrop />

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">
          My Generations
        </h1>
        <p className="text-sm text-gray-400">
          View and manage all your AI-generated thumbnails
        </p>
      </div>

      {/* Content */}
       
      {isLoading ? (
        <SkeletonGrid />
      ) : (
        <>
        {thumbnails.length === 0 ? (
        <div className="flex items-center justify-center h-[60vh]">
    <div className="text-center">
      <h2 className="text-xl font-semibold text-white mb-2">
        No Thumbnails Yet
      </h2>
      <p className="text-gray-400">
        Start creating your first thumbnail
      </p>
    </div>
  </div>
          ) : (
           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {thumbnails.map((thumb) => (
    <MythumbnailCard key={thumb._id} thumb={thumb} setThumbnails= {setThumbnails} />
  ))}
</div>
          )}
            
       
         
                
</> 
  )}
   </div>
  );
}


export default MygeneratePage;