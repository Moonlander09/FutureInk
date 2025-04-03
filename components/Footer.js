import { FaPenNib } from "react-icons/fa"

function Footer() {
    return (
        <footer className="text-gray-300 py-6 bg-[var(--background)] text-center">
      <h2 className="text-3xl flex justify-center items-center  gap-2 text-[var(--foreground)] font-bold">
        <FaPenNib className="h-5 w-5" />FutureInk</h2>
      <p className="text-sm text-white mt-2">
        &copy; {new Date().getFullYear()} FutureInk. All rights reserved.
      </p>
      <p className="text-sm text-white mt-2">
        Design and Developed By MoonLander
      </p>
    </footer>
    )
}

export default Footer
