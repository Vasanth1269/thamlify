import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LenisScroll from "./LenisScroll";
import { ToastContainer, } from "react-toastify";


export default function Layout() {
  const location = useLocation();
  const hideHeader = location.pathname.startsWith("/preview");

  return (
    <>
      <ToastContainer />
      <LenisScroll />
      {!hideHeader && <Navbar />}
      <Outlet />
      <Footer />
    </>
  );
}