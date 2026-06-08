import SoftBackdrop from "./softBackdrop";
import { useAppContext } from "../context/useAppContext";
import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type Step = "EMAIL" | "OTP" | "PASSWORD";

const OTP_LENGTH = 6;

export default function ResetPassword() {
  const [loading , setloading] = useState(false)
  const { backendUrl } = useAppContext();
  const navigate = useNavigate();

  /* ================= STATE ================= */
  const [step, setStep] = useState<Step>("EMAIL");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  /* ================= STEP 1: SEND OTP ================= */
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter email");
      return;
    }

    try {
         setloading(true)
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-resetotp`,
        { email }
      );

      if (data.success) {
        setloading(false)
        toast.success("OTP sent to your email");
        setStep("OTP");
      } else {
        setloading(false)
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to send OTP");
      setloading(false)
    }
  };

  /* ================= OTP INPUT HANDLERS ================= */
  const handleOtpChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pasted) return;

    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      newOtp[i] = char;
    });

    setOtp(newOtp);
    inputsRef.current[pasted.length - 1]?.focus();
  };

  /* ================= STEP 2: STORE OTP ONLY ================= */
  const goToResetPassword = () => {
    if (otp.join("").length !== OTP_LENGTH) {
      toast.error("Please enter complete OTP");
      return;
    }

    // ❌ NO API CALL HERE
    setStep("PASSWORD");
  };

  /* ================= STEP 3: FINAL API CALL ================= */
  const handleResetPassword = async () => {
    if (!password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password mismatch");
      return;
    }

    try {
      setloading(true)
      const { data } = await axios.post(
        `${backendUrl}/api/auth/resetPasswordVerify`,
        {
          email,
          otp: otp.join(""),
          password,
        }
      );

      if (data.success) {
        toast.success("Password reset successful");
        setloading(false)
        navigate("/login");
        
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Password reset failed");
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <SoftBackdrop />

      {/* ================= EMAIL CARD ================= */}
      {step === "EMAIL" && (
        <div className="w-[450px] rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Reset your password
          </h2>
          <p className="text-gray-400 mb-6 text-sm">
            Provide your email address to receive a password reset verification code.
          </p>

          <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              required
              className="bg-white/5 placeholder-gray-400 text-white w-full  rounded-2xl px-4 py-3 p-6 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />

           <button onClick={handleResetPassword}
      type="submit"
      disabled={loading}
  
  className={`mt-3 w-full h-11 rounded-2xl text-white 
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
     "Rest Password"
  )}
</button>
          </form>
        </div>
      )}

      {/* ================= OTP CARD ================= */}
      {step === "OTP" && (
        <div className="w-[4500px] rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-10 text-center">
          <h1 className="text-white text-2xl font-medium">Enter OTP</h1>
          
        <p className="text-gray-400 text-sm mt-2">
          We sent a 6-digit reset code to your email
        </p>

          <div className="flex gap-3 justify-center mt-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) =>
                  handleOtpChange(e.target.value, index)
                }
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-10 h-12 text-center text-white bg-white/5 ring-2 ring-white/10 rounded-2xl outline-none  focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            ))}
           
          </div>
              <p className="text-gray-400 text-sm mt-4 ml-3 text-start">
          This code is valid for 24 hours
        </p>
          <button
            onClick={goToResetPassword}
            className="mt-8 w-full h-11 rounded-full bg-pink-600 text-white"
          >
              Continue
          </button>
        </div>
      )}

      {/* ================= RESET PASSWORD CARD ================= */}
      {step === "PASSWORD" && (
        <div className="w-[450px] rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Set New Password
          </h2>
          <p className="text-gray-400 mb-6 text-sm">Enter your new password to continue</p>

          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white/5 placeholder-gray-400 w-full mb-6 text-white rounded-2xl px-4 py-3 p-6 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-white/5 placeholder-gray-400 text-white w-full mb-6 rounded-2xl px-4 py-3 p-6 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          
          <p className="text-xs text-gray-400 -mt-3 text-start">
              Use at least 8 characters with a mix of letters, numbers, and symbols.
         </p>

     <button onClick={handleResetPassword}
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
     "Rest Password"
  )}
</button>
        
        </div>
      )}
    </div>
  );
}
