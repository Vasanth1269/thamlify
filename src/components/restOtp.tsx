import axios from "axios";
import SoftBackdrop from "./softBackdrop";
import { useState, useRef } from "react";
import { useAppContext } from "../context/useAppContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ResetOtp() {
  const OTP_LENGTH = 6;

  const [otp, setOtp] = useState<string[]>(
    Array(OTP_LENGTH).fill("")
  );

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const { backendUrl } = useAppContext();
  const navigate = useNavigate();

  // ✅ Verify OTP
  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement>
  ): Promise<void> => {
    e.preventDefault();

    const otpString = otp.join("");

    if (otpString.length !== OTP_LENGTH) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/resetotpverification`,
        { otp: otpString },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("OTP verified successfully");
        navigate("/resetPassword");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  // ✅ Resend OTP
  const resendOtp = async (): Promise<void> => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/auth/send-resetotp`,
         
        { withCredentials: true }
      );

      if (data.success) {
        toast.success("OTP sent to your email");
        setOtp(Array(OTP_LENGTH).fill(""));
        inputsRef.current[0]?.focus();
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Failed to resend OTP");
    }
  };

  const handleChange = (value: string, index: number) => {
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

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);

    if (!pastedData) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      newOtp[index] = char;
    });

    setOtp(newOtp);
    inputsRef.current[pastedData.length - 1]?.focus();
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <SoftBackdrop />

      <div className="w-[390px] rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-10 text-center">
        <h1 className="text-white text-3xl font-medium">
          Enter code
        </h1>

        <p className="text-gray-400 text-sm mt-2">
          We sent a 6-digit reset code to your email
        </p>

        <div className="flex gap-3 justify-center mt-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputsRef.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) =>
                handleChange(e.target.value, index)
              }
              onKeyDown={(e) =>
                handleKeyDown(e, index)
              }
              onPaste={handlePaste}
              className="w-10 h-12 text-center text-white bg-white/5 ring-2 ring-white/10 rounded-lg outline-none"
            />
          ))}
        </div>

        <p className="text-gray-400 text-sm mt-8 text-start">
          This code is valid for 24 hours
        </p>

        <button
          className="mt-8 w-full h-11 rounded-full bg-pink-600 text-white hover:bg-pink-500 transition"
          onClick={handleSubmit}
        >
          Verify
        </button>

        <p className="text-gray-400 text-sm mt-4">
          Didn’t receive the code?
          <span
            onClick={resendOtp}
            className="text-pink-400 ml-1 cursor-pointer hover:underline"
          >
            Resend
          </span>
        </p>
      </div>
    </div>
  );
}
