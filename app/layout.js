import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { auth } from "@/lib/auth";
import AuthProvider from "@/components/AuthContext";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer";



const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "FutureInk - AI-Powered Blog Generator",
  description: "FutureInk is an AI-powered blog generator that helps you create high-quality, engaging blogs instantly. Simply enter a topic, and let AI craft compelling content for you. Generate, edit, and save blogs effortlessly with our intuitive editor.",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={`${nunito.className} antialiased `}>
        
        <Navbar user = {session}/>
    <AuthProvider>
        {children}
      </AuthProvider>  
    <Footer/>
      <Toaster/>
        
        </body>
    </html>
  );
}
