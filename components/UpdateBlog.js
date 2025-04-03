import Link from "next/link"
import { HiPencil } from "react-icons/hi2"

function UpdateBlog({id}) {
    return (
        <Link href={`/edit-blog?id=${id}`}
                  
                  className=" cursor-pointer text-white rounded-lg shadow-md transform duration-300 hover:-translate-y-1 transition"
                >
                  <HiPencil className="w-5 h-5" />
                </Link>
    )
}

export default UpdateBlog
