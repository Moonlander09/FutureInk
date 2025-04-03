"use client";

import { AiOutlineDelete } from "react-icons/ai";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


function DeleteBlog({ id }) {
    const router = useRouter();
  const { data: session } = useSession();

  async function handleDelete() {

    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.user.email}`,
      },
      cache: "no-store",
    });
    const data = await response.json();
    if(data.success){
        toast.success(data.message)
    }else{
        toast.error(data.message)
    }
 router.refresh();
  }
  return (
    <button
      onClick={handleDelete}
      className=" text-white rounded-lg shadow-md  transform duration-300 hover:-translate-y-1 transition cursor-pointer"
    >
      <AiOutlineDelete className="w-5 h-5" />
    </button>
  );
}

export default DeleteBlog;
