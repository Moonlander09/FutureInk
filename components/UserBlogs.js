
import Link from "next/link";
import DeleteBlog from "./DeleteBlog";
import UpdateBlog from "./UpdateBlog";

function UserBlogs({ blogs }) {
  

  return (
    <div className="mt-6">
      <div className="space-y-8">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className=" flex gap-2 justify-between items-center p-4  rounded-lg shadow-lg text-white bg-[var(--background)]"
          ><Link href={`/blog?id=${blog._id}`}>
            <h3 className="text-sm sm:text-lg font-bold uppercase">{blog.title}</h3>
          </Link>

            {/* Action Buttons */}
            <div className="flex gap-2.5">
              <UpdateBlog id={blog._id} />
              <DeleteBlog id={blog._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserBlogs;
