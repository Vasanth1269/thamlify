import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { navlinks } from "../data/navlinks";
import type { INavLink } from "../types";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/useAppContext";
import axios from "axios";
import {toast} from "react-toastify"

export default function Navbar() {
    const [loggingOut, setLoggingOut] = useState(false);

    const [isOpen, setIsOpen] = useState(false);
    const [open , setOpen]=useState(false)
    const { isLoggedIn, userData,backendUrl,setIsLoggedIn,checkAuth } = useAppContext();
    
    const handlelogout =async()=>{
        
         try {
            setLoggingOut(true)
             await new Promise((resolve) => setTimeout(resolve, 3000));
            
             
             
                const {data} =await axios.post(backendUrl+"/api/auth/logout",{}, { withCredentials: true })
            
            
            if(data.success){
            checkAuth()
            setIsLoggedIn(false)
            
             toast.success("Logged out successfully")
            }else{
                toast.error(data.message)
            } 
            
            

           
           
            
         } catch (error) {
            checkAuth()
            toast.error("Failled to logout")
         }finally{
            setLoggingOut(false)
         }
    }
   
    return (
        <>
            <motion.nav className="fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
            >
                <Link to="/">
                    <img className="h-8.5 w-auto" src="/logo.svg" alt="logo" width={130} height={34} />
                </Link>

                <div className="hidden md:flex items-center gap-8 transition duration-500">
                    {navlinks.map((link: INavLink) => (
                        <Link key={link.name} to={link.href} className="hover:text-pink-500 transition">
                            {link.name}
                        </Link>
                    ))}
                </div>

                {isLoggedIn ?(
                    <>
                      <div className="relative group">
      {/* Avatar */}
      <div onClick={() => setOpen(prev => !prev)}
 className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 text-white flex items-center justify-center font-semibold uppercase cursor-pointer">
        {userData?.name?.trim()?.[0]}
      </div>

      {/* Dropdown */}
      {open && (<div className="absolute right-0 mt-2 w-40 rounded-xl bg-black border border-white/10 shadow-lg animate-fade-in">
        
        <div className="px-4 py-3 border-b border-pink-500/20 text-white text-sm">
          {userData?.name}
        </div>

      <button
  onClick={handlelogout}
  disabled={loggingOut}
  className="w-full px-4 py-2 flex items-center gap-2 text-left text-sm text-red-600 hover:bg-pink-500/10 hover:text-pink-300 transition disabled:opacity-60"
>
  {loggingOut && (
    <span className="w-4 h-4 border-2 border-red-400/40 border-t-red-500 rounded-full animate-spin" />
  )}

  {loggingOut ? "Logging out..." : "Logout"}
</button>

      </div>)}
    </div>
                 
                </>)
                     : <Link  to={'/login'} className="hidden md:block  px-6 py-2.5 bg-pink-600 hover:bg-pink-700 active:scale-95 transition-all rounded-full">
                    Start Generate
                </Link>
                    
                } 
                <button onClick={() => setIsOpen(true)} className="md:hidden">
                    <MenuIcon size={26} className="active:scale-90 transition" />
                </button>
            </motion.nav>

            <div className={`fixed inset-0 z-100 bg-black/40 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-400 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                {navlinks.map((link: INavLink) => (
                    <Link key={link.name} to={link.href} onClick={() => setIsOpen(false)}>
                        {link.name}
                    </Link>
                ))}
                <button onClick={() => setIsOpen(false)} className="active:ring-3 active:ring-white aspect-square size-10 p-1 items-center justify-center bg-pink-600 hover:bg-pink-700 transition text-white rounded-md flex">
                    <XIcon />
                </button>
            </div>
        </>
    );
}