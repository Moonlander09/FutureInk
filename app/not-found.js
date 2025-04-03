import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-[var(--foreground)]">404 - Page Not Found</h1>
      <p className="text-[var(--background)] mt-2">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="mt-4 px-4 py-2  text-[var(--background)] border border-[var(--foreground)] font-bold rounded-lg shadow-md   flex items-center gap-2 cursor-pointer transform transition duration-300 hover:-translate-y-1">
        Go to Homepage
      </Link>
    </div>
  );
}