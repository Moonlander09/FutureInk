"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { IoShareOutline } from "react-icons/io5";
import Loading from "../loading";

function Blog() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [blog, setBlog] = useState("");
  const [loading, setLoading] = useState(false);
  const id = searchParams.get("id");

  useEffect(() => {
    if (!id) {
      router.replace("/"); // Redirect if no ID
      return;
    }

    async function fetchBlog() {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/${id}`, {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch blog");
        }

        const data = await response.json();
        setBlog(data.blog);
      } catch (error) {
        console.log("Error",error)
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id, router]);

  // Share function
  const handleShare = async () => {
    const blogUrl = `${window.location.origin}/blog?id=${id}`;
    
    if (navigator.share) {
      // Web Share API for mobile & supported browsers
      try {
        await navigator.share({
          title: blog.title,
          text: "Check out this blog!",
          url: blogUrl,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(blogUrl);
        alert("Blog link copied to clipboard!");
      } catch (error) {
        console.error("Failed to copy:", error);
      }
    }
  };

    // Show loading text while data is being fetched
    if (!blog) {
      return (
        <Loading/>
      );
    }
  

  return (
    <div className="max-w-3xl mx-auto p-4 h-full bg-white text-[var(--background)]">
      <div className="p-6">
        <h2 className="text-2xl text-center font-bold mb-3 uppercase">
          {blog.title}
        </h2>
        <div className="flex justify-between items-center my-8">

        <p className="text-gray-600 text-sm ">
          By <span className="text-[var(--foreground)]">{blog.author}</span> •{" "}
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        <button
          onClick={handleShare}
          className=" sm:px-4 sm:py-2 px-3 py-1.5 border-2 border-[var(--background)] bg-[var(--foreground)] text-[var(--background)] font-bold rounded-lg shadow-md transform transition duration-300 hover:-translate-y-1 cursor-pointer"
        >
         <IoShareOutline className="w-5 h-5"/>
        </button>
        </div>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Share Button */}
        
      </div>
    </div>
  );
}

export default Blog;