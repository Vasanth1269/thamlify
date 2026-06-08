import { useParams } from "react-router-dom";
import { FiDownload } from "react-icons/fi";
import { useState } from "react";
interface Thumbnail {
  _id: string;
  title: string;
  image_url: string;
  aspect_ratio: string;
  style: string;
  color_scheme: string;
  createdAt: string;
}
interface GeneratedResponse {
  message: string;
  thumbnail: Thumbnail;
}


interface PreviewPanelProps{
  thumbnails: Thumbnail[];
  genthumbnail: GeneratedResponse | null;
  isLoading:boolean;
  
}
function PreviewPanel({  thumbnails , genthumbnail,isLoading }: PreviewPanelProps) {
  const { id } = useParams<{ id: string }>();
  console.log( "here id",id)
  const thumb = thumbnails.find(item => item._id === id)
  const imageUrl = thumb?.image_url || genthumbnail?.thumbnail.image_url;
   const hasTriedGenerate = genthumbnail !== null;
const hasImage = Boolean(imageUrl);
const showError = hasTriedGenerate && !isLoading && !hasImage;

console.log( "imageURL",genthumbnail?.thumbnail.image_url)
  
 console.log(genthumbnail)
 
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col p-4 sm:p-6 max-h-100">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Preview</h2>

      {/* ✅ FIXED HEIGHT PREVIEW AREA */}
      <div className="h-100 group relative rounded-xl border border-dashed border-white/20 flex items-center justify-center text-gray-400 px-4 text-center overflow-hidden">
        { hasImage? (
          <>
           <img
              src={imageUrl}
              alt="Thumbnail preview"
              className="max-h-full max-w-full object-contain rounded-lg"
            /> 

            <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <a
                href={imageUrl}
                download
                onClick={(e) => e.stopPropagation()}
                className="
                  flex items-center gap-3
                  px-14 py-2
                  rounded-lg
                  bg-[#7fa6bb]/70
                  hover:bg-[#7fa6bb]/70
                  text-white font-medium
                  text-sm backdrop-blur-md
                  shadow-lg shadow-black/30
                  group-hover:-translate-y-1
                  transition-all duration-700 ease-out
                  z-40
                "
              >
                <FiDownload />
                <span className="font-medium">Download</span>
              </a>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="w-12 sm:w-14 sm:h-14 rounded-full bg-white/10 flex items-center justify-center mb-2 sm:mb-3">
               {
                isLoading ?(<div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-4 border-white/30 border-t-white/10 rounded-full animate-spin"></div>

      
    </div>):<i className="fa-regular fa-image text-lg sm:text-xl transition hover:text-indigo-400" />
               }
            </div>
           {
            isLoading ?( <><p className="font-medium text-sm sm:text-base">
              Generating thumbnail...
            </p>

            <p className="text-xs sm:text-sm mt-1">
              Please wait, it will take 10–15 seconds.
            </p> </>): showError ? (<><p className="font-medium text-sm sm:text-base">
             Thumbnail generation failed
            </p>

            <p className="text-xs sm:text-sm mt-1">
               Please try again
              
              
              
            </p></>) :(
              <><p className="font-medium text-sm sm:text-base">
             Generate your first thumbnail
            </p>

            <p className="text-xs sm:text-sm mt-1">
               Fill out the form and click Generate
              
              
              
            </p></>
            )
           }
           
          </div>
        )}
      </div>
    </div>
  );
}

export default PreviewPanel;
