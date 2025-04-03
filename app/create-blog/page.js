"use client";
import { useState } from "react";
import TiptapEditor from "@/components/TiptapEditor";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { marked } from "marked";
import { LuBot } from "react-icons/lu";
import { FaRegSave } from "react-icons/fa";

function Page() {
  const { data: session } = useSession();
  const router = useRouter();
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("formal");
  const [length, setLength] = useState("medium");
  
  const [editorContent, setEditorContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");

  async function generateBlog(e) {
    e.preventDefault();
    setLoading(true);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.email}`,
      },
      body: JSON.stringify({ topic, tone, length }),
    });
    const data = await response.json();
    const cleanContent = marked(data.blog);
    
    
    setEditorContent(cleanContent);
    setTitle(data.title);
    
    if (!data.success) {
      toast.error(data.message);
    }
setTopic('');
    setLoading(false);
  }

  async function savingBlog() {
    setLoading(true);

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.email}`,
      },
      body: JSON.stringify({ title, content: editorContent }),
    });
    const data = await response.json();
    if (data.success) {
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }

    setLoading(false);
  router.push('/dashboard')    
  }

  return (
    <div className="max-w-3xl mx-auto p-4 h-full bg-white text-[var(--background)]">
      {/* Title */}
      <div className="flex justify-center font-bold text-4xl text-[var(--foreground)] h-20 items-center">
        <span className="border-b-2 pb-2">Create a Blog</span>
      </div>

      {/* Blog Topic Input */}
      <form onSubmit={generateBlog}>
        <div className="mt-6">
          <label className="block text-lg font-semibold mb-2">
            Enter Blog Topic
          </label>
          <input
            type="text"
            placeholder="Type your blog topic..."
            className="w-full p-2 border-2 rounded-md"
            value={topic}
            disabled={loading}
            onChange={(e) => setTopic(e.target.value)}
            required
          />
        </div>

        {/* Tone & Length Dropdowns */}
        <div className="mt-4 flex gap-4">
          <div className="flex sm:gap-4 gap-1 justify-center items-center">
            <label className="block text-lg font-semibold mb-1">Tone</label>
            <select
              className="w-full p-1.5 sm:p-2 border rounded-md"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              disabled={loading}
            >
              <option value="formal">Formal</option>
              <option value="casual">Casual</option>
              <option value="professional">Professional</option>
            </select>
          </div>
          <div className="flex sm:gap-4 gap-1 justify-center items-center">
            <label className="block text-lg font-semibold mb-1">Length</label>
            <select
              className="w-full p-1.5 sm:p-2 border rounded-md"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              disabled={loading}
            >
              <option value="short">Short</option>
              <option value="medium">Medium</option>
              <option value="long">Long</option>
            </select>
          </div>
        </div>

        {/* Generate Blog Button */}
        <div className="mt-8">
          <button className={`px-6 py-2 border-2 border-[var(--background)] text-[var(--background)] font-bold rounded-lg shadow-md transform flex justify-center items-center gap-2 transition duration-300 hover:-translate-y-1 ${loading? " cursor-not-allowed":"cursor-pointer"}`} disabled={loading}><LuBot className="w-5 h-5"/>
            {loading?'Generating...':'Generate Blog'}
          </button>
        </div>
      </form>

      {/* Show Editor Only After Generating Content */}
      {editorContent && (
        <>
          <div className="mt-6">
            <h2 className="text-3xl text-center text-[var(--foreground)] p-4 font-bold">
              <span className="border-b-2">Generated Blog</span>
            </h2>
            <TiptapEditor content={editorContent} setContent={setEditorContent} />
          </div>

          <div className="mt-4">
            <button
              className={`px-6 py-2 flex gap-2 justify-center items-center border-2 border-[var(--background)] bg-[var(--foreground)] text-[var(--background)] font-bold rounded-lg shadow-md transform transition duration-300 hover:-translate-y-1 
              ${loading? " cursor-not-allowed":"cursor-pointer"}`}
              onClick={savingBlog}
            ><FaRegSave className="w-5 h-5"/>
              {loading? 'Saving...':"Save Blog"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Page;
