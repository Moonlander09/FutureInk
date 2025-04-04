
import { FcGoogle } from "react-icons/fc";
import { signInAction } from "../_server/actions";

function page() {
    return (
        <form action={signInAction}>

        <div className="flex flex-col gap-6 pt-10 items-center bg-white h-screen">
            <h2 className="text-3xl text-center font-semibold">Sign In to access your Account.</h2>
            
            <button className="px-4 py-2  text-[var(--background)] border border-[var(--foreground)] font-bold rounded-lg shadow-md   flex items-center gap-2 cursor-pointer transform transition duration-300 hover:-translate-y-1">
          <FcGoogle className="h-5 w-5" />

          Continue with Google
        </button>
        
        </div>
        </form>
    )
}

export default page
