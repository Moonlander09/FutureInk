import Link from "next/link";

async function Blogs() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/get`, {
    method: "GET",
    cache: "no-store",
  });
  const data = await response.json();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl my-12 text-[var(--foreground)] font-bold mb-6 text-center">
        <span className="border-b-2 ">Latest Blogs</span>
      </h1>
      <div className=" mt-12 flex flex-col gap-8">
        {data.success && data.blogs.length > 0 ? (
          data.blogs.map((blog) => (
            <Link href={`/blog?id=${blog._id}`} key={blog._id}>
              <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                <h2 className="text-3xl text-center font-bold my-3 uppercase ">
                  {blog.title}
                </h2>
                <p className="text-gray-600 text-sm my-6">
                  By{" "}
                  <span className="text-[var(--foreground)]">
                    {blog.author}
                  </span>{" "}
                  • {new Date(blog.createdAt).toLocaleDateString()}
                </p>
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No blogs found.</p>
        )}
      </div>
    </div>
  );
}

export default Blogs;
