import { auth } from "@/lib/auth";
import Link from "next/link";
import { FiLogOut } from "react-icons/fi";
import { signOutAction } from "../_server/actions";
import { HiPencilSquare } from "react-icons/hi2";
import UserBlogs from "@/components/UserBlogs";

async function page() {
  const session = await auth();
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/getblogs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.user.email}`,
    },
    cache: "no-store", // Ensures fresh data is fetched
  });

  const data = await response.json();

  return (
    <div className="max-w-3xl mx-auto p-4 h-full bg-white text-[var(--background)]">
      <div className="flex justify-center  font-bold text-4xl text-[var(--foreground)] h-20 items-center">
        <span className="border-b-2">Dashboard</span>
      </div>
      {/* Welcome message */}
      <div className="flex h-20 items-center justify-between mb-8">
        <h1 className="text-2xl font-bold ">Welcome, {session?.user?.name}</h1>

        {/* Logout Button */}
        <form action={signOutAction}>
          <button className="px-4 py-2  text-[var(--background)] border-2 border-[var(--background)] font-bold rounded-lg shadow-md  flex items-center gap-2 cursor-pointer transform transition duration-300 hover:-translate-y-1">
            <FiLogOut className="h-5 w-5" />
            SignOut
          </button>
        </form>
      </div>

      {/* Create New Blog Button */}
      <div className="h-28 flex flex-col gap-3 justify-center items-center">
        <p className="text-lg font-semibold ">
          To create your blog click on the button
        </p>

        <Link href="/create-blog">
          <button className="px-8 py-4  text-[var(--background)] border-2 border-[var(--background)] font-bold rounded-lg shadow-md  bg-[var(--foreground)] flex items-center gap-2 cursor-pointer transform transition duration-300 hover:-translate-y-1">
            <HiPencilSquare className="w-5 h-5" /> Create New Blog
          </button>
        </Link>
      </div>

      {/* List of Blogs */}
      {data.blogs.blogs.length > 0 && (
        <div className="mt-14">
          <h2 className="text-3xl text-center font-bold mb-6 text-[var(--foreground)]">
            <span className="border-b-2">Your Blogs</span>
          </h2>

          <UserBlogs blogs={data.blogs.blogs} />
        </div>
      )}
    </div>
  );
}

export default page;
