import Image from "next/image";
import Link from "next/link";
import { BsCollection } from "react-icons/bs";

function Hero() {
  return (
    <section className="flex flex-col items-center text-center py-20 px-4 bg-white">
      {/* Headline */}
      <h1 className="text-4xl md:text-5xl font-bold ">
        Generate High-Quality Blogs Instantly with AI
      </h1>

      {/* Subtext */}
      <p className="mt-4 text-lg text-[var(--background)] max-w-2xl">
        Enter a topic, and let AI generate a complete blog for you in seconds.
        No writing skills needed!
      </p>
      <div className="flex flex-col gap-2.5 items-center">
        <p className="text-lg font-bold">
          &quot;Find the information you need in our complete blog archive.&quot;
        </p>
        <Link href="/blogs">
          <button className="px-6 py-2  text-[var(--background)] border-2 border-[var(--background)] font-bold rounded-lg shadow-md  bg-[var(--foreground)] flex items-center gap-2 cursor-pointer transform transition duration-300 hover:-translate-y-1">
            <BsCollection className="w-5 h-5" /> Explore Blogs
          </button>
        </Link>
      </div>

      {/* Typing Effect */}
      <div className="mt-6 text-xl font-bold text-[var(--background)]">
        <span className="typing-effect">AI is Drafting Your Blog...</span>
      </div>

      {/* Image */}
      <div className="mt-8 w-full max-w-3xl">
        <Image
          src="/hero-1.jpg"
          alt="AI Writing Illustration"
          width={500}
          height={500}
          className="mx-auto w-auto h-auto"
        priority />
      </div>
    </section>
  );
}

export default Hero;
