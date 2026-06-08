import { useState } from "react";
import SoftBackdrop from "../components/softBackdrop";
import ScrollToTop from "../components/ScrollToTop";
import LeftPanel from "../components/leftPanel";
import PreviewPanel from "../components/preview panel";
import { useEffect } from "react";
import { toast } from "react-toastify";
interface GeneratedResponse {
  message: string;
  thumbnail: Thumbnail;
}
interface Thumbnail {
  _id: string;
  title: string;
  image_url: string;
  aspect_ratio: string;
  style: string;
  color_scheme: string;
  createdAt: string;
}

export default function Generate() {
  const [ratio, setRatio] = useState<string>("16:9");
  const [style, setStyle] = useState<string>("Bold & Graphic");
  const [color, setColor] = useState<string>("Vibrant");
  const [title, setTitle] = useState<string>("");
  const [details, setDetails] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [genThumbnail, setGenThumbnail] = useState<GeneratedResponse | null>(null);
 const [thumbnails, setThumbnails] = useState<Thumbnail[]>([]);
 
 
const API_URL = import.meta.env.VITE_API_URL;
 const handleGenerate = async () => {
 

  if (!title) {
    toast.error("Title is required");
    return;
  }

  setIsLoading(true);

  const payload = {
    title,
    aspectRatio: ratio,
    style,
    colorScheme: color,
    details,
  };

  console.log( "sending data",payload);

  try {
    const res = await fetch(`${API_URL}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", 
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log( "data",data);
     setGenThumbnail(data);
    if (data) {
      setGenThumbnail(data);
    } else {
      toast.error(" Failed to generate thumbnail , Try Again")
    }

  } catch (error) {
    console.error(error);
    toast.error(" Failed to generate thumbnail , Try Again")
  } finally {
    setIsLoading(false);
  }

 
};
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
       
    
    } catch{

    }
  };
 
  fetchThumbnails();
}, []);

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen text-white flex items-center justify-center mt-23 px-6">
        <SoftBackdrop />
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Panel */}
          <LeftPanel
            title={title}
            setTitle={setTitle}
            ratio={ratio}
            setRatio={setRatio}
            style={style}
            setStyle={setStyle}
            color={color}
            setColor={setColor}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setDetails={setDetails}
            onGenerate={handleGenerate}
            thumbnails={thumbnails}
          />

          {/* Preview Panel */}
          <PreviewPanel  genthumbnail = {genThumbnail} thumbnails = {thumbnails} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
}

