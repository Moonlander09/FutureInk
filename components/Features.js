import { FaRobot, FaEdit, FaShareAlt, FaSearch, FaCheckCircle, FaSave } from "react-icons/fa";

function Features() {

    const features = [
        { icon: <FaRobot className="text-blue-500 text-4xl" />, title: "AI-Powered Blog Generation", desc: "Generate high-quality blogs instantly with AI." },
        { icon: <FaEdit className="text-purple-500 text-4xl" />, title: "Edit & Customize Content", desc: "Easily edit and tailor the content to match your style." },
        { icon: <FaShareAlt className="text-green-500 text-4xl" />, title: "Publish & Share Blogs", desc: "Share your blogs directly to platforms with one click." },
        { icon: <FaSearch className="text-yellow-500 text-4xl" />, title: "SEO Optimized", desc: "Ensure your content ranks higher with built-in SEO optimization." },
        { icon: <FaCheckCircle className="text-red-500 text-4xl" />, title: "Free & Easy to Use", desc: "No hidden fees. Simple and accessible for everyone." },
        { icon: <FaSave className="text-teal-500 text-4xl" />, title: "Save & Manage Blogs", desc: "Save unfinished blogs and manage all your blogs in one place." },
      ];
    return (
        <section className="py-20 px-6 bg-[var(--background)] text-[var(--foreground)]">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl mb-6 font-bold"><span className="border-b-2 ">What It Does</span></h2>
        <p className="mt-3 text-lg text-white">Explore the powerful features designed to enhance your blogging experience.</p>
      </div>

      {/* Features Grid */}
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-4 p-6 bg-white shadow-md rounded-lg transform transition duration-300 hover:-translate-y-2">
            {feature.icon}
            <div>
              <h3 className="text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-900 mt-1">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
    )
}

export default Features
