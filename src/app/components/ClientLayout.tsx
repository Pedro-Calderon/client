"use client";
import { usePathname } from "next/navigation";
//import Header from "@/app/components/global/header/Header";
import Navbar from "./global/Navbar";
import Footer from "./global/footer";
export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
const hideLayout = ["/login", "/register", "/forgot-password", "/reset-password", "/unauthorized"].includes(pathname);

  return (
    <>
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </>
  );
}
