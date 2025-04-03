import { FaSignInAlt, FaKeyboard, FaRocket } from "react-icons/fa";

const steps = [
    { icon: <FaSignInAlt className="text-blue-500 text-4xl" />, title: "Sign In", desc: "Use Google to log in and access the AI blog generator." },
    { icon: <FaKeyboard className="text-purple-500 text-4xl" />, title: "Enter a Blog Topic", desc: "Type what you want to write about, and AI will do the rest." },
    { icon: <FaRocket className="text-green-500 text-4xl" />, title: "Generate & Publish", desc: "AI writes the blog for you in seconds. Edit and publish instantly!" },
  ];

function HowItWorks() {
    return (
        <section className="py-20 px-6 bg-white text-[var(--foreground)]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl mb-6 font-bold"><span className="border-b-2 ">How It Works</span></h2>
        <p className="mt-3 text-lg text-[var(--background)] font-semibold">Just three simple steps to generate high-quality blogs with AI.</p>
      </div>

      {/* Steps Layout */}
      <div className="mt-12 flex flex-col md:flex-row justify-center items-center md:items-stretch gap-8 max-w-5xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col items-center text-center p-6 bg-[var(--background)] shadow-md rounded-lg w-72 transform transition duration-300 hover:-translate-y-2">
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold">{step.title}</h3>
            <p className="text-white mt-1">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
    )
}

export default HowItWorks
