import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";

import Footer from "./components/Footer";
import Restotp from "./components/restOtp";
import "./globals.css";
import LenisScroll from "./components/LenisScroll";
import Login from "./components/login";
import Generate from "./pages/generatePage";
import PreviewPage from "./pages/PreviewPage";
import Layout from "./components/layout";
import Otp from "./components/otp";
import MygeneratePage from "./pages/MygeneratePage";
import SetNewPasswordCard from "./components/setnewpassword";
import ResetPassword from "./components/resetPassword";
import { Community } from "./pages/community";

export default function App() {
     
    return (
        <>
            <LenisScroll />
            
         

            <Routes>
                 <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/generate" element={<Generate />} />
                <Route path="/community" element={<Community  />} /> 
                <Route path="/generate/:id" element={<Generate />} />
                <Route path="/thumbnails" element={<MygeneratePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/auth/otp" element={<Otp />} />
                 <Route path="/newpassword" element={<SetNewPasswordCard />}/>
                 <Route path="/reset-otp" element={<Restotp/>}/>
                 <Route path="/resetPassword" element={<ResetPassword/>}/>
                </Route> 
                <Route path="/preview/:id" element={<PreviewPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/auth/otp" element={<Otp />} />
            </Routes>
            
        </>
    );
}