import axios from "axios";
import SoftBackdrop from "./softBackdrop";
import { useState, useRef } from "react";
import { useAppContext } from "../context/useAppContext";
import { useNavigate } from "react-router-dom";
export default function Otp() {
const OTP_LENGTH = 6;

const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));

const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const { backendUrl } = useAppContext();
   const navigate = useNavigate()

const handleSubmit = async (e) => {
  e.preventDefault();

 try {
  axios.defaults.withCredentials = true;

  const signupData = JSON.parse(localStorage.getItem("signupData") || "{}");
  const otpString = otp.join("");

  const { data } = await axios.post(
    `${backendUrl}/api/auth/verify-email`,
    {
      otp: otpString,
      email: signupData.email,
    },
    {
      withCredentials: true,
    }
  );

  if (data.success) {
    localStorage.removeItem("signupData");
    navigate("/");
  } else {
    alert(data.message);
  }
} catch (error) {
  console.log("OTP Error:", error);
  alert("OTP verification failed");
}

};
 const restOtp = async (e) =>{
  e.preventDefault()
  axios.defaults.withCredentials=true
   const otpResponse = await axios.post(backendUrl + "/api/auth/send-verify-otp")
         if(otpResponse.data.success){
          console.log("OTP send your Email.please Checkout")
         }else{
          console.log("Problem in send OTP , please contect support")
         }

 }

const handleChange = (value: string, index: number) => {
  if (!/^[0-9]?$/.test(value)) return;

  const newOtp = [...otp];
  newOtp[index] = value;
  setOtp(newOtp);

  if (value && index < OTP_LENGTH - 1) {
   inputsRef.current[index + 1]?.focus();

  }
};

const handleKeyDown = ( e: React.KeyboardEvent<HTMLInputElement>,
  index: number) => {
  if (e.key === "Backspace" && !otp[index] && index > 0) {
    inputsRef.current[index - 1]?.focus();
  }
};
const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
  e.preventDefault();

  const pastedData = e.clipboardData
    .getData("text")
    .replace(/\D/g, "") // only numbers
    .slice(0, OTP_LENGTH);

  if (!pastedData) return;

  const newOtp = [...otp];

  pastedData.split("").forEach((char, index) => {
    newOtp[index] = char;
  });

  setOtp(newOtp);

  // focus last filled input
  const lastIndex = pastedData.length - 1;
  inputsRef.current[lastIndex]?.focus();
};
console.log(otp)

  return (
    
<>
       <div className="w-full h-screen flex justify-center items-center">
        <SoftBackdrop />
      {/* Card */}
      <div className="relative w-[390px] rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-10 text-center">
        <h1 className="text-white text-3xl font-medium">
          Enter code
        </h1>

        <p className="text-gray-400 text-sm mt-2">
          We sent a 6-digit code to your email
        </p>

        {/* OTP inputs */}
 <div className="flex gap-3 justify-center mt-6">
  {otp.map((digit, index) => (
    <input
      key={index}
       ref={(el: HTMLInputElement | null) => {
    inputsRef.current[index] = el;
  }}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={digit}
      onChange={(e) => handleChange(e.target.value, index)}
      onKeyDown={(e) => handleKeyDown(e, index)}
      className="w-10 h-12 text-center text-white bg-white/5 ring-2 ring-white/10 rounded-lg outline-none"
        onPaste={handlePaste}
    />
  ))}
</div>



        <p className="text-gray-400 text-sm mt-8 text-start">
         This code is valid for 24 hours

</p>

        {/* Verify button */}
        <button
          type="submit"
          className="
            mt-8 w-full h-11
            rounded-full
            bg-pink-600
            text-white
            hover:bg-pink-500
            transition
          "
          onClick={handleSubmit}

        >
          Verify
        </button>

        {/* Resend */}
        <p className="text-gray-400 text-sm mt-4">
          Didn’t receive the code?
          <span onClick={restOtp} className="text-pink-400 ml-1 cursor-pointer hover:underline">
            Resend
          </span>
        </p>
      </div>
    </div>
    </>
  );
}
