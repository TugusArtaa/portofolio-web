"use client";

import ProfileCard from "@/components/ProfileCard/ProfileCard";
import AnimatedTitle from "@/components/AnimatedTitle/AnimatedTitle";
import { TypeAnimation } from "react-type-animation";
import TiltedCard from "@/components/TiltedCard/TiltedCard";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* ====== Hero Section ====== */}
      <section className="bg-white dark:bg-slate-950 py-8 sm:py-12 lg:py-16">
        <div className="min-h-[70vh] flex flex-col-reverse lg:flex-row items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-8 lg:gap-12">
          {/* Kiri: Teks dan Tombol */}
          <div className="flex flex-col justify-center w-full lg:w-3/5 space-y-4 lg:space-y-6 text-left">
            {/* Subtitle */}
            <h2 className="text-md sm:text-sm md:text-base lg:text-lg tracking-[0.1em] text-slate-400 dark:text-slate-400 font-medium uppercase text-left">
              I PUTU AGUS SENIARTAWAN
            </h2>

            {/* Main Title */}
            <h1 className="leading-tight inline-block text-left">
              <AnimatedTitle />
            </h1>

            {/* Description */}
            <div className="text-md sm:text-base md:text-lg lg:text-xl text-slate-600 dark:text-neutral-300 leading-relaxed max-w-2xl text-left">
              <p className="mb-2 text-left">
                <strong className="text-sky-900 dark:text-white">
                  Hi! I'm Putu Agus
                </strong>{" "}
                — Junior front-end developer, UI/UX designer, and graphic
                designer. I love turning ideas into lively, neat, and
                user-friendly web displays. Coding and design are my way of
                telling stories in the digital world{" "}
                <TypeAnimation
                  sequence={[
                    "inspiring.",
                    1200,
                    "",
                    200,
                    "interactive.",
                    1200,
                    "",
                    200,
                    "impressive.",
                    1200,
                    "",
                    200,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="text-slate-600 dark:text-neutral-300"
                />
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-row gap-3 sm:gap-4 pt-4 items-start">
              <button className="group relative overflow-hidden bg-gradient-to-r from-sky-700 to-sky-400 hover:from-transparent hover:to-transparent dark:bg-gradient-to-r dark:from-sky-500 dark:to-sky-400 dark:hover:from-transparent dark:hover:to-transparent text-white hover:text-sky-900 dark:hover:text-sky-400 font-semibold border-2 border-sky-400 dark:border-sky-400 hover:border-sky-400 hover:dark:border-sky-400 px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-md shadow-sky-900/20 dark:shadow-sky-500/20 hover:shadow-lg hover:shadow-sky-900/30 dark:hover:shadow-sky-400/30 transform hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base text-left">
                <span className="relative z-10">Download CV</span>
              </button>

              <button className="group relative overflow-hidden bg-transparent hover:bg-gradient-to-r hover:from-sky-700 hover:to-sky-400 dark:hover:bg-gradient-to-r dark:hover:from-sky-500 dark:hover:to-sky-400 border-2 border-sky-400 dark:border-sky-400 text-sky-900 dark:text-sky-400 hover:text-white dark:hover:text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-md shadow-sky-400/20 dark:shadow-sky-400/20 hover:shadow-lg hover:shadow-sky-900/30 dark:hover:shadow-sky-400/30 transform hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base text-left">
                <span className="relative z-10">Contact Me</span>
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-row flex-wrap gap-4 sm:gap-6 pt-6 text-xs sm:text-sm text-slate-400 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Available for projects</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
                <span>Based in Bali, Indonesia</span>
              </div>
            </div>
          </div>

          {/* Kanan: Profile Card */}
          <div className="flex justify-center lg:justify-end items-center w-full lg:w-2/5 mb-8 lg:mb-0">
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-sky-400 to-sky-500 dark:from-sky-500 dark:to-sky-400 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-sky-500 to-sky-400 dark:from-sky-400 dark:to-sky-500 rounded-full blur-xl opacity-20 animate-pulse animation-delay-1000"></div>

              {/* Profile Card Container */}
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-300">
                <ProfileCard
                  name="Putu Aguss"
                  title="Front-end Developer"
                  avatarUrl="/avatar.jpg"
                  handle="Putuaguss"
                  status="Simplicity."
                  contactText="Hello!"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== About Section ====== */}
      <section className="bg-white dark:bg-slate-950 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Gambar About - Kiri */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px]">
                <TiltedCard
                  imageSrc="/About.jpg"
                  altText="About Me"
                  captionText="This is me!"
                  containerHeight="100%"
                  containerWidth="100%"
                  imageHeight="100%"
                  imageWidth="100%"
                  rotateAmplitude={12}
                  scaleOnHover={1.2}
                  showMobileWarning={false}
                  showTooltip={true}
                  displayOverlayContent={true}
                  overlayContent={
                    <p className="absolute top-6 left-6 bg-sky-900 dark:bg-sky-500 text-white px-4 py-1 rounded-3xl text-base font-medium shadow-lg shadow-sky-900/20 dark:shadow-sky-500/20">
                      Hello!
                    </p>
                  }
                />
              </div>
            </div>

            {/* Teks About - Kanan */}
            <div className="w-full lg:w-1/2 text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-sky-900 dark:text-white text-left">
                About Me
              </h2>
              <p className="text-slate-600 dark:text-neutral-300 text-md sm:text-lg lg:text-xl leading-relaxed mb-8 text-left">
                A brief introduction about me and my interest — including the
                skills I've learned, tools I use, and certifications that
                support my journey.
              </p>
              <Link href="/about" passHref>
                <button className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-sky-700 to-sky-400 dark:bg-gradient-to-r dark:from-sky-500 dark:to-sky-400 hover:from-sky-800 hover:to-sky-500 dark:hover:from-sky-400 dark:hover:to-sky-300 text-white font-semibold rounded-lg transition-all duration-300 shadow-md shadow-sky-900/20 dark:shadow-sky-500/20 hover:shadow-lg hover:shadow-sky-900/30 dark:hover:shadow-sky-400/30 transform hover:-translate-y-0.5 text-left">
                  Learn More
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Projects Section ====== */}
      <section className="bg-white dark:bg-slate-950 py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16">
            {/* Gambar Project - Kanan */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="w-full max-w-lg">
                {/* Container untuk layout gambar */}
                <div className="flex gap-4 h-64 sm:h-80 lg:h-96">
                  {/* Gambar Besar - Kiri */}
                  <div className="flex-1">
                    <img
                      src="/About.jpg"
                      alt="Main Project"
                      className="w-full h-full object-cover rounded-lg shadow-md shadow-slate-400/20 dark:shadow-slate-950/40 grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>

                  {/* Container Gambar Kecil - Kanan */}
                  <div className="flex flex-col gap-4 w-32 sm:w-40 lg:w-44">
                    {/* Gambar Kecil Atas */}
                    <div className="flex-1">
                      <img
                        src="/About.jpg"
                        alt="Project 2"
                        className="w-full h-full object-cover rounded-lg shadow-md shadow-slate-400/20 dark:shadow-slate-950/40 grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>

                    {/* Gambar Kecil Bawah */}
                    <div className="flex-1">
                      <img
                        src="/About.jpg"
                        alt="Project 3"
                        className="w-full h-full object-cover rounded-lg shadow-md shadow-slate-400/20 dark:shadow-slate-950/40 grayscale hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Teks Project - Kiri */}
            <div className="w-full lg:w-1/2 text-left">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-sky-900 dark:text-white text-left">
                Projects
              </h2>
              <p className="text-slate-600 dark:text-neutral-300 text-md sm:text-lg lg:text-xl leading-relaxed mb-8 text-left">
                Here are some projects I've completed and ones I'm currently
                working on — Click below to explore more.
              </p>
              <button className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-sky-400 to-sky-700 dark:bg-gradient-to-r dark:from-sky-400 dark:to-sky-500 hover:from-sky-500 hover:to-sky-800 dark:hover:from-sky-300 dark:hover:to-sky-400 text-white font-semibold rounded-lg transition-all duration-300 shadow-md shadow-sky-400/20 dark:shadow-sky-400/20 hover:shadow-lg hover:shadow-sky-900/30 dark:hover:shadow-sky-500/30 transform hover:-translate-y-0.5 text-left">
                View Projects
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Let's Connect Section ====== */}
      <section className="bg-white dark:bg-slate-950 py-2 sm:py-2 lg:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-6 text-sky-900 dark:text-white">
              Let's Connect
            </h2>
            <p className="hidden sm:block text-slate-600 dark:text-neutral-300 text-md sm:text-lg lg:text-xl leading-relaxed mb-8 max-w-full mx-auto">
              Ready to bring your ideas to life? Let's discuss your next project
              and create something amazing together.
            </p>
            <Link href="/contact" passHref>
              <button className="inline-flex items-center px-8 sm:px-12 font-bold rounded-lg transition-all duration-300 shadow-none text-3xl sm:text-2xl text-sky-600 dark:text-sky-400 focus:outline-none hover:text-sky-400 dark:hover:text-sky-300 hover:scale-105 group">
                Get In Touch
                <svg
                  className="ml-2 w-8 h-8 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 48 48"
                >
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  />
                  <path
                    d="M18 24h12M26 18l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
