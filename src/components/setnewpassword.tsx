import SoftBackdrop from "./softBackdrop";
import { useAppContext } from "../context/useAppContext";
import React, { useState } from "react";
import axios from "axios";
import {toast} from "react-toastify"

export default function SetNewPasswordCard() {
     const {backendUrl} = useAppContext()
      const [newPassword , setNewPassword] = useState<{password:string;confirmPassword:string}>({
        password:"",
        confirmPassword:''
      })

    const handleResetPassword = async (): Promise<void> => {
  if (newPassword.password !== newPassword.confirmPassword) {
    toast.error("Password mismatch. Please double check.");
    return;
  }

  try {
    const { data } = await axios.post(
      `${backendUrl}/api/auth/resetpassword`,
      { password: newPassword.password },
      { withCredentials: true }
    );

    if (data.success) {
      toast.error("Password has been reset successfully");
      // 👉 redirect to login or show success UI
    } else {
      toast.error(data.message || "Failed to reset password");
    }
  } catch (error) {
     toast.error("Something went wrong while resetting password");
  }
};

      
  return (

    <div className="min-h-screen flex items-center justify-center px-4">
        <SoftBackdrop />
      <div className="w-[390px] rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-10 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Set New Password</h2>
        <p className="text-gray-400 mb-6 text-sm">Enter your new password to continue</p>

        <form className="flex flex-col gap-4">
          <input
            type="password"
            value={newPassword.password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>  setNewPassword({
      ...newPassword,
      password: e.target.value,
    })}
            placeholder="New Password"
            className="bg-white/5 placeholder-gray-400 border-gray-400 text-white rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="password"
            value={newPassword.confirmPassword}
            onChange={(e:React.ChangeEvent<HTMLInputElement>)=>(
              setNewPassword({...newPassword, confirmPassword:e.target.value})
            )}

            
            placeholder="Confirm Password"
            className="bg-white/5 placeholder-gray-400 text-white rounded-full px-4 py-3 p-6 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <span className="text-xs text-gray-400 mt-1 text-start">Note :</span>
          <p className="text-xs text-gray-400 -mt-3 text-start">
              Use at least 8 characters with a mix of letters, numbers, and symbols.
         </p>

          <button
            type="submit"
            onClick={handleResetPassword}
            className="mt-4 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-full transition-all duration-300"
          >
            Update Password
          </button>
   

        </form>

        
      </div>
    </div>
  );
}
