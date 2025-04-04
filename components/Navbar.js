import Link from "next/link";
import {  FiUser } from "react-icons/fi";
import { FaPenNib } from "react-icons/fa";

function Navbar({user}) {
  
  return (
    <nav className="shadow-md p-4 h-24 flex justify-center items-center bg-[var(--background)] text-[var(--foreground)]">
      <div className="container mx-auto sm:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl sm:text-3xl font-bold flex items-center gap-2 transform transition duration-300 hover:-translate-y-1 hover:border-b-2"
        >
          <FaPenNib className="h-5 w-5"/>
          FutureInk
        </Link>

        {/* My Account Button (Styled as a button) */}
   {user?.user?.email ?  <Link
          href="/dashboard"
          className="text-sm sm:text-base px-3 sm:px-4 py-2 bg-[var(--foreground)] text-[var(--background)] border border-[var(--foreground)] font-bold rounded-lg shadow-md hover:bg-[var(--background)] hover:text-[var(--foreground)] flex items-center gap-2 cursor-pointer
          transform transition duration-300 hover:-translate-y-1"
        >
          <FiUser className="sm:h-5 sm:w-5 w-4 h-4" />
          My Dashboard
        </Link>  : <Link
          href="/signin"
          className="px-4 py-2 bg-[var(--foreground)] text-[var(--background)] border border-[var(--foreground)] font-bold rounded-lg shadow-md hover:bg-[var(--background)] hover:text-[var(--foreground)] flex items-center gap-2 cursor-pointer transform transition duration-300 hover:-translate-y-1"
        >
          <FiUser className="h-5 w-5" />
          My Account
        </Link>}
      </div>
    </nav>
  );
}

export default Navbar;
