import { useState } from "react";
import SoftBackdrop from "./softBackdrop";
import ScrollToTop from "./ScrollToTop";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/useAppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";


function Login() {
  const { backendUrl,checkAuth } = useAppContext();
  const [loading, setLoading,] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [mode, setMode] = useState("signup"); // "login" | "signup"

  const [formData, setFormData,] = useState({
    name: "",
    email: "",
    password: "",
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
     setLoading(true);
     
    axios.defaults.withCredentials = true;

    try {
      console.log(mode)
      if (mode === "signup") {
        const {data}  = await axios.post(
         `${API_URL}/api/auth/send-verify-otp`,
          {
            name:formData.name,
            email:formData.email,
            password:formData.password
          }
          
           
        );
        setLoading(false)
      
         if(data.success){
          localStorage.setItem("signupData", JSON.stringify(formData));
          navigate("/auth/otp");
          console.log("OTP send your Email.please Checkout")
         }else{
          console.log("Problem in send OTP , please contect support")
          console.log(formData)
          toast.error(data.message);
         }

        if (data.success) {
          navigate("/auth/otp");
          setLoading(false)
        } else {
          toast.error(data.message);
          setLoading(false)
        }
        console.log("success")
      } else {
        const { data } = await axios.post(
          `${API_URL}/api/auth/login`,
          {
            email: formData.email,
            password: formData.password,
          },{
    withCredentials: true
  }
        );
     setLoading(false)
        if (data.success) {
           checkAuth()
          toast.success("Login successful");
          navigate("/");
          setLoading(false)
        } else {
          toast.error(data.message);
          setLoading(false)
        }
        console.log("success")
      }
    } catch (error) {
      toast.error("Something went wrong");
      setLoading(false)
    }
  };

  return (
    <>
     <ScrollToTop/>
      <div className="w-full h-screen flex justify-center items-center">
        <SoftBackdrop />

        <form
          onSubmit={handleSubmit}
          className="w-full sm:w-87.5 text-center bg-white/6 border border-white/10 rounded-2xl px-8"
        >
          <h1 className="text-white text-3xl mt-10 font-medium">
            {mode === "login" ? "Login" : "Sign up"}
          </h1>

          <p className="text-gray-400 text-sm mt-2">
            Please sign in to continue
          </p>

          {mode === "signup" && (
            <div className="flex items-center mt-6 w-full bg-white/5 ring-2 ring-white/10 h-12 rounded-full">
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full bg-transparent h-full rounded-full  outline-none p-6"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="flex items-center w-full mt-4 bg-white/5 ring-2 ring-white/10 h-12 rounded-full ">
            <input
              type="email"
              name="email"
              placeholder="Email id"
              className="w-full bg-transparent text-white h-full pl-6 rounded-full outline-none"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center mt-4 w-full bg-white/5 ring-2 ring-white/10 h-12 rounded-full">
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full bg-transparent pl-6 h-full text-white outline-none"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
           
           {mode === 'login'?<Link
  to="/resetPassword"
  className="block text-start p-2 text-pink-400 text-sm hover:underline">Forgot password?</Link>
 : ''}

         <button
  type="submit"
  disabled={loading}
  
  className={`mt-6 w-full h-11 rounded-full text-white 
    ${loading 
      ? "bg-pink-400 cursor-not-allowed" 
      : "bg-pink-600 hover:bg-pink-500"
    }`}
>
  {loading ? (
    <span className="flex items-center justify-center gap-2">
      <svg
        className="w-5 h-5 animate-spin"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      Please wait...
    </span>
  ) : (
    mode === "login" ? "Login" : "Sign up"
  )}
</button>


          <p
            onClick={() =>
              setMode((prev) => (prev === "login" ? "signup" : "login"))
            }
            className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer"
          >
            {mode === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <span className="text-pink-400 ml-1 hover:underline">
              Click here
            </span>
          </p>
        </form>
      </div>
      <ScrollToTop/>
    </>

  );

}


export default Login;
