import { colorSchemes } from "../../public/assets";
import { aspectRatios } from "../../public/assets";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppContext } from "../context/useAppContext";
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
interface LeftPanelProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  ratio: string; 
  setRatio: React.Dispatch<React.SetStateAction<string>>; 
  style: string;
  setStyle: React.Dispatch<React.SetStateAction<string>>;
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  details:string
  setDetails:React.Dispatch<React.SetStateAction<string>>
    onGenerate: () => void;
  thumbnails: Thumbnail[];
  
}

 function LeftPanel({ title, setTitle, ratio, setRatio, style, setStyle, color, setColor, isLoading,setDetails,details, onGenerate, thumbnails }:LeftPanelProps) {
        const { id } = useParams();
        const { userData } = useAppContext();
  const thumbnail = thumbnails.find((t) => t._id === id);
  const navigate = useNavigate()
         
      useEffect(() => {
  if (thumbnail) { 
    setRatio(thumbnail.aspect_ratio)
    setTitle(thumbnail.title)
    setColor(thumbnail.color_scheme)
    setDetails(thumbnail.prompt_used)

  }



}, [thumbnail]);

  const  user = userData?.name?.trim()?.[0]
  console.log(user)
   const handleuser= async(e)=>{
    if(!user){
      navigate("/login")
      return
  } 
    onGenerate();
  console.log ("len")
   } 


  return (
    <>
       <div className="rounded-2xl bg-white/5 border border-white/10 p-6 backdrop-blur-xl">
          <h2 className="text-xl font-semibold">Create Your Thumbnail</h2>
          <p className="text-sm text-gray-400 mt-1">
            Describe your vision and let AI bring it to life
          </p>

          {/* Title */}
          <div className="mt-6">
            <label className="text-sm text-gray-300">Title or Topic</label>
            <input
            value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 10 Tips for Better Sleep"
              className="mt-2 w-full rounded-lg bg-black/40 border border-white/10 px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <p className="text-right text-xs text-gray-500 mt-1">{title.length}/100</p>
          </div>

          {/* Aspect Ratio */}
          <div className="mt-6">
            <p className="text-sm text-gray-300 mb-2">Aspect Ratio</p>
            <div className="flex gap-3">
              { aspectRatios.map(({ size, Icon }) => (
                <button
                  key={size}
                  value={ratio}
                  onClick={() => setRatio(size)}
                  className={`px-4 py-2 pr-10 relative rounded-lg border flex transition ${
                    ratio === size
                      ? "bg-pink-600 border-pink-500"
                      : "bg-white/5 border-white/10 hover:bg-white/10"
                  }`}
                >
                 

                  {size}
                   <Icon className="ml-1.5 absolute right-2 top-1.5 text-gray-100 " />




                </button>
              ))}
            </div>
          </div>

          {/* Style */}
          <div className="mt-6">
            <p className="text-sm text-gray-300 mb-2">Thumbnail Style</p>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full   rounded-lg bg-black/40 border border-black  px-4 py-2 outline-none "
            >
          <option> Bold & Graphic</option>
          <option>Minimalist</option>
          <option>Photorealistic</option>
          <option>Illustrated</option>
           <option>Tech/Futuristic</option>

              
            </select>
          </div> 
        

     
          {/* Colors */}
         <div className="mt-6" >
  <p className="text-sm text-gray-300 mb-2">Color Scheme</p>
   <div className="grid grid-cols-4 sm:grid-cols-8 md:grid-cols-6 gap-6">
  {colorSchemes.map((palette) => (
    <div
    
      key={palette.id}
      onClick={() => setColor(palette.name)}   // 🔥 FIX
      className={`flex h-10 w-14 overflow-hidden rounded-lg border cursor-pointer
        ${color === palette.name 
          ? "border-black-500 ring-2 ring-black-500/40"
          : "border-black/10"}
      `}
    >
      {palette.colors.map((c, index) => (
        <div
          key={index}
          className="flex-1"
          style={{ backgroundColor: c }}
        />
      ))}
    </div>
  ))}
  </div>

  <p className="text-xs text-gray-400 mt-2">
    Selected: {color}
  </p>
</div>


          {/* Details */}
          <div className="mt-6">
            <label className="text-sm text-gray-300">Additional Details</label>
            <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
              placeholder="Add any specific elements, mood, or style preferences"
              className="mt-2 w-full rounded-lg bg-black/40 border border-white/10 px-4 py-2 h-24 outline-none"
            />
          </div>

           <button
            disabled={isLoading}
            onClick={handleuser}
           className="mt-6 w-full rounded-xl bg-pink-600 py-3 font-medium hover:bg-pink-500 transition">
            {isLoading?'Generating...' : 'Generate Thumbnail'} 
          </button>
        </div>
    </>
  )
}

export default LeftPanel