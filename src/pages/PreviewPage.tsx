import { useMemo } from "react";
import { Yt_html } from "../../public/assets";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
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


function PreviewPage() {
  const { id } = useParams();
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
  const API_URL = import.meta.env.VITE_API_URL;

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
       
    
    } catch (error)
   {
        toast.error("something went wrong")
    } 
  };
 
  fetchThumbnails();
}, []);
  const thumbnail = thumbnails.find((t) => t._id === id);

    
  const htmlWithThumbnail = useMemo(() => {
    if (!thumbnail) return Yt_html;
    return Yt_html.replace("%%THUMBNAIL_URL%%", thumbnail.image_url)
                   .replace("%%TITLE%%", thumbnail.title || "No Title");
  }, [thumbnail]);

  useEffect(() => {
    // Run scripts manually if needed (Lucide icons)
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  return (
    <>
  
  <div
    className="dark bg-yt text-white font-sans"
    dangerouslySetInnerHTML={{ __html: htmlWithThumbnail }}
  />

</>
  );
}
 
export default PreviewPage;
