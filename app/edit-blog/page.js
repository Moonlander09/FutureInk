"use client";
import { useEffect, useState } from "react";
import TiptapEditor from "@/components/TiptapEditor";
import { useSearchParams } from "next/navigation";
import { marked } from "marked";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loading from "../loading";

function EditBlog() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [editorContent, setEditorContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      router.replace("/dashboard");
      return;
    }

    async function fetchBlog() {
      setLoading(true); // Start loading
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/${id}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch blog");
        }
        const data = await response.json();
        const cleanContent = marked(data.blog.content);
        setEditorContent(cleanContent);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id, router]);

  async function updateBlog() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.user.email}`,
        },
        cache: "no-store",
        body: JSON.stringify({ content: editorContent }),
      }
    );
    const data = await response.json();

    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }

    router.push("/dashboard");
  }

    if (!editorContent) {
        return (
          <Loading/>
        );
      }
  return (
    <div className="max-w-3xl mx-auto p-4 h-full bg-white text-[var(--background)]">
      {/* Title */}
      <div className="flex justify-center font-bold text-2xl text-[var(--foreground)] h-20 items-center">
        <span className="border-b-2 ">Edit Blog</span>
      </div>

      {/* Show Editor Only After Generating Content */}
      {editorContent && (
        <>
      
            <TiptapEditor
              content={editorContent}
              setContent={setEditorContent}
            />
      
          <div className="mt-4">
            <button
              className={`px-6 py-2 border-2 border-[var(--background)] bg-[var(--foreground)] text-[var(--background)] font-bold rounded-lg shadow-md transform transition duration-300 hover:-translate-y-1 cursor-pointer
                      ${loading ? " cursor-not-allowed" : "cursor-pointer"}`}
              onClick={updateBlog}
            >
              {loading ? "Updating..." : "Update Blog"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default EditBlog;
