import React from "react";
import Image from "next/image";
import { About } from "@prisma/client";

type ContactAbout = About & {
  value?: string;
  description?: string;
};

async function getContactAbout(): Promise<ContactAbout[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/public/about`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch about");
  const about: ContactAbout[] = await res.json();
  // Filter hanya contact
  const contactIds = [
    "gmail",
    "whatsapp",
    "instagram",
    "linkedin",
    "github",
    "discord",
  ];
  return Array.isArray(about)
    ? about.filter((item) => contactIds.includes(item.id))
    : [];
}

export default async function ContactPage() {
  const contacts = await getContactAbout();

  // Pisahkan masing-masing kontak berdasarkan id
  const getContactById = (id: string): ContactAbout | undefined =>
    Array.isArray(contacts)
      ? contacts.find((item) => item.id === id)
      : undefined;

  const gmail = getContactById("gmail");
  const whatsapp = getContactById("whatsapp");
  const instagram = getContactById("instagram");
  const linkedin = getContactById("linkedin");
  const github = getContactById("github");
  const discord = getContactById("discord");

  // Social media icon components with proper logos
  const socialLinks = [
    {
      id: "gmail",
      href: gmail ? `mailto:${gmail.content || gmail.value}` : "#",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24,5V19A3,3,0,0,1,21,22H3A3,3,0,0,1,0,19V5A3,3,0,0,1,3,2H21A3,3,0,0,1,24,5ZM20.5,6.6L12,12.89,3.5,6.6A1.5,1.5,0,0,0,2,8.1V18.5A1.5,1.5,0,0,0,3.5,20h17A1.5,1.5,0,0,0,22,18.5V8.1A1.5,1.5,0,0,0,20.5,6.6Z" />
        </svg>
      ),
      color: "hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10",
      show: !!gmail,
    },
    {
      id: "whatsapp",
      href: whatsapp
        ? `https://wa.me/${(whatsapp.content || whatsapp.value || "").replace(
            /[^0-9]/g,
            ""
          )}`
        : "#",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.488" />
        </svg>
      ),
      color:
        "hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10",
      show: !!whatsapp,
    },
    {
      id: "instagram",
      href: instagram ? `${instagram.content || instagram.value}` : "#",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
      color: "hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-500/10",
      show: !!instagram,
    },
    {
      id: "linkedin",
      href: linkedin ? linkedin.content || linkedin.value : "#",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      color: "hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10",
      show: !!linkedin,
    },
    {
      id: "github",
      href: github ? `${github.content || github.value}` : "#",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      color: "hover:text-gray-800 hover:bg-gray-50 dark:hover:bg-gray-500/10",
      show: !!github,
    },
    {
      id: "discord",
      href: "#",
      icon: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0189 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z" />
        </svg>
      ),
      color:
        "hover:text-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-500/10",
      show: !!discord,
      label: discord ? discord.content || discord.value : "",
    },
  ];

  return (
    <section className="bg-white dark:bg-slate-950 min-h-screen py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-700 via-sky-600 to-sky-500 dark:from-sky-400 dark:via-sky-300 dark:to-sky-200 bg-clip-text text-transparent">
            Contact
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-sky-500 to-sky-400 rounded-full mx-auto mt-4"></div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-16 items-center">
          {/* Left: Contact Form - More compact */}
          <div className="w-full lg:w-1/2">
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border border-sky-200/30 dark:border-sky-400/20 rounded-2xl shadow-xl shadow-sky-400/5 dark:shadow-sky-500/10 p-6 sm:p-8 max-w-lg mx-auto">
              <form className="space-y-5">
                {/* Name Input */}
                <div>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border-2 border-sky-200/50 dark:border-sky-400/30 bg-white/70 dark:bg-slate-800/70 text-sky-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-sky-400 dark:focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 outline-none transition-all duration-300"
                    placeholder="Your Name"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border-2 border-sky-200/50 dark:border-sky-400/30 bg-white/70 dark:bg-slate-800/70 text-sky-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-sky-400 dark:focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 outline-none transition-all duration-300"
                    placeholder="Your Email"
                  />
                </div>

                {/* Subject Input */}
                <div>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border-2 border-sky-200/50 dark:border-sky-400/30 bg-white/70 dark:bg-slate-800/70 text-sky-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-sky-400 dark:focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 outline-none transition-all duration-300"
                    placeholder="Subject"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <textarea
                    className="w-full px-4 py-3 rounded-lg border-2 border-sky-200/50 dark:border-sky-400/30 bg-white/70 dark:bg-slate-800/70 text-sky-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-sky-400 dark:focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20 outline-none transition-all duration-300 min-h-[120px] resize-none"
                    placeholder="Your message..."
                  />
                </div>

                {/* Submit Button - More compact */}
                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-sky-600 to-sky-500 dark:from-sky-500 dark:to-sky-400 text-white font-semibold shadow-lg shadow-sky-900/20 dark:shadow-sky-500/25 hover:shadow-xl hover:shadow-sky-900/25 dark:hover:shadow-sky-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  Send Message
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* Right: Image */}
          <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden shadow-lg shadow-sky-400/10 dark:shadow-sky-500/10 bg-neutral-100 dark:bg-slate-900">
              <Image
                src="/photo/about_photo.svg"
                alt="Contact Illustration"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 50vw, 40vw"
              />
            </div>
          </div>
        </div>

        {/* Social Media Icons - More compact and better organized */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">
              Let's Connect
            </h3>
            <div className="w-16 h-0.5 bg-gradient-to-r from-sky-500 to-sky-400 rounded-full mx-auto"></div>
          </div>

          <div className="flex flex-wrap gap-4 justify-center max-w-2xl mx-auto">
            {socialLinks
              .filter((s) => s.show)
              .map((s) =>
                s.id === "discord" ? (
                  <div
                    key={s.id}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-sky-200/30 dark:border-sky-400/20 shadow-md shadow-sky-400/5 dark:shadow-sky-500/10 hover:shadow-lg transition-all duration-300"
                  >
                    <span className="text-gray-600 dark:text-gray-300 hover:text-indigo-500 transition-colors duration-300">
                      {s.icon}
                    </span>
                    <span className="text-slate-700 dark:text-slate-200 font-medium text-sm">
                      {s.label}
                    </span>
                  </div>
                ) : (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center justify-center w-12 h-12 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-sky-200/30 dark:border-sky-400/20 shadow-md shadow-sky-400/5 dark:shadow-sky-500/10 transition-all duration-300 hover:shadow-lg hover:scale-110 text-gray-600 dark:text-gray-300 ${s.color}`}
                    aria-label={s.id}
                  >
                    {s.icon}
                  </a>
                )
              )}
          </div>
        </div>
      </div>
    </section>
  );
}
