"use client";

import ProfileCard from "@/components/ProfileCard/ProfileCard";
import AnimatedTitle from "@/components/AnimatedTitle/AnimatedTitle";
import { TypeAnimation } from "react-type-animation";
import TiltedCard from "@/components/TiltedCard/TiltedCard";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const heroRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const connectRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      const mobileSettings = {
        duration: isMobile ? 0.8 : 1.2,
        stagger: isMobile ? 0.1 : 0.15,
        yOffset: isMobile ? 30 : 60,
        xOffset: isMobile ? 40 : 80,
        scale: isMobile ? 0.98 : 0.95,
        ease: "power2.out",
      };

      // Hero Section Animation
      gsap.utils.toArray("[data-hero-text]").forEach((el: any, i: number) => {
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: mobileSettings.yOffset,
            scale: mobileSettings.scale,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: mobileSettings.duration,
            ease: mobileSettings.ease,
            scrollTrigger: {
              trigger: el,
              start: isMobile ? "top 90%" : "top 80%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
              // markers: true,
            },
          }
        );
      });
      gsap.fromTo(
        "[data-hero-card]",
        {
          opacity: 0,
          y: isMobile ? 40 : 80,
          scale: isMobile ? 0.95 : 0.9,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: mobileSettings.duration * 0.9,
          ease: mobileSettings.ease,
          scrollTrigger: {
            trigger: "[data-hero-card]",
            start: isMobile ? "top 90%" : "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
        }
      );

      // About Section Animation
      gsap.fromTo(
        "[data-about-image]",
        {
          opacity: 0,
          x: isMobile ? 0 : -80,
          y: isMobile ? 40 : 0,
          scale: isMobile ? 0.9 : 0.8,
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          duration: mobileSettings.duration,
          ease: mobileSettings.ease,
          scrollTrigger: {
            trigger: "[data-about-image]",
            start: isMobile ? "top 85%" : "top 75%",
            end: "bottom 25%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
      gsap.utils
        .toArray("[data-about-content]")
        .forEach((el: any, i: number) => {
          gsap.fromTo(
            el,
            {
              opacity: 0,
              y: mobileSettings.yOffset,
              scale: mobileSettings.scale,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: mobileSettings.duration * 0.9,
              ease: mobileSettings.ease,
              delay: i * (mobileSettings.stagger * 1.2),
              scrollTrigger: {
                trigger: el,
                start: isMobile ? "top 85%" : "top 75%",
                end: "bottom 25%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        });

      // Projects Section Animation
      gsap.utils
        .toArray("[data-projects-content]")
        .forEach((el: any, i: number) => {
          gsap.fromTo(
            el,
            {
              opacity: 0,
              y: mobileSettings.yOffset,
              scale: mobileSettings.scale,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: mobileSettings.duration * 0.9,
              ease: mobileSettings.ease,
              delay: i * (mobileSettings.stagger * 1.3),
              scrollTrigger: {
                trigger: el,
                start: isMobile ? "top 85%" : "top 75%",
                end: "bottom 25%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        });
      gsap.utils
        .toArray("[data-projects-images]")
        .forEach((el: any, i: number) => {
          gsap.fromTo(
            el,
            {
              opacity: 0,
              x: isMobile ? 0 : 80,
              y: isMobile ? 40 : 0,
              scale: isMobile ? 0.9 : 0.8,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: mobileSettings.duration,
              ease: mobileSettings.ease,
              delay: i * (mobileSettings.stagger * 0.8),
              scrollTrigger: {
                trigger: el,
                start: isMobile ? "top 85%" : "top 75%",
                end: "bottom 25%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        });

      // Connect Section Animation (fix: animasi hanya pada elemen yang tampil)
      const connectEls = gsap.utils.toArray(
        "[data-connect-content]"
      ) as HTMLElement[];
      connectEls.forEach((el: HTMLElement) => {
        // Skip animasi jika elemen hidden di mobile (misal: <p className="hidden sm:block ...">)
        if (
          isMobile &&
          el.classList.contains("hidden") &&
          el.classList.contains("sm:block")
        ) {
          gsap.set(el, { opacity: 1, y: 0, scale: 1 });
          return;
        }
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: isMobile ? 20 : 50,
            scale: isMobile ? 0.98 : 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: mobileSettings.duration * 0.9,
            ease: mobileSettings.ease,
            delay: 0,
            scrollTrigger: {
              trigger: el,
              start: isMobile ? "top 98%" : "top 90%",
              end: "bottom 20%",
              toggleActions: "play reverse play reverse",
            },
          }
        );
      });

      // Mobile-specific performance optimization
      if (isMobile) {
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) {
          gsap.set(
            "[data-hero-text], [data-hero-card], [data-about-image], [data-about-content], [data-projects-content], [data-projects-images], [data-connect-content]",
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            }
          );
        }
      }

      // Handle orientation change on mobile
      const handleOrientationChange = () => {
        if (isMobile) {
          ScrollTrigger.refresh();
        }
      };

      window.addEventListener("orientationchange", handleOrientationChange);

      return () => {
        window.removeEventListener(
          "orientationchange",
          handleOrientationChange
        );
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* ====== Hero Section ====== */}
      <section ref={heroRef} className="py-8 sm:py-12 lg:py-16">
        <div className="min-h-[70vh] flex flex-col-reverse lg:flex-row items-center justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-8 lg:gap-12">
          {/* Kiri: Teks dan Tombol */}
          <div className="flex flex-col justify-center w-full lg:w-3/5 space-y-4 lg:space-y-6 text-left">
            {/* Subtitle */}
            <h2
              data-hero-text
              className="text-md sm:text-sm md:text-base lg:text-lg tracking-[0.1em] text-slate-400 dark:text-slate-400 font-medium uppercase text-left"
            >
              I PUTU AGUS SENIARTAWAN
            </h2>

            {/* Main Title */}
            <h1 data-hero-text className="leading-tight inline-block text-left">
              <AnimatedTitle />
            </h1>

            {/* Description */}
            <div
              data-hero-text
              className="text-md sm:text-base md:text-lg lg:text-xl text-slate-600 dark:text-neutral-300 leading-relaxed max-w-2xl text-left"
            >
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
            <div
              data-hero-text
              className="flex flex-row gap-3 sm:gap-4 pt-4 items-start"
            >
              <a
                href="/cv/CV_ATS_Putu_Aguss.pdf"
                download
                className="group relative overflow-hidden bg-gradient-to-r from-sky-700 to-sky-400 hover:from-transparent hover:to-transparent dark:bg-gradient-to-r dark:from-sky-500 dark:to-sky-400 dark:hover:from-transparent dark:hover:to-transparent text-white hover:text-sky-900 dark:hover:text-sky-400 font-semibold border-2 border-sky-400 dark:border-sky-400 hover:border-sky-400 hover:dark:border-sky-400 px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-md shadow-sky-900/20 dark:shadow-sky-500/20 hover:shadow-lg hover:shadow-sky-900/30 dark:hover:shadow-sky-400/30 transform hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base text-left active:translate-y-1 active:scale-95"
              >
                <span className="relative z-10">Download CV</span>
              </a>

              <Link
                href="/contact"
                passHref
                className="group relative overflow-hidden bg-transparent hover:bg-gradient-to-r hover:from-sky-700 hover:to-sky-400 dark:hover:bg-gradient-to-r dark:hover:from-sky-500 dark:hover:to-sky-400 border-2 border-sky-400 dark:border-sky-400 text-sky-900 dark:text-sky-400 hover:text-white dark:hover:text-white font-semibold px-4 py-2 sm:px-6 sm:py-3 rounded-xl shadow-md shadow-sky-400/20 dark:shadow-sky-400/20 hover:shadow-lg hover:shadow-sky-900/30 dark:hover:shadow-sky-400/30 transform hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base text-left active:translate-y-1 active:scale-95"
              >
                <span className="relative z-10">Contact Me</span>
              </Link>
            </div>

            {/* Stats */}
            <div
              data-hero-text
              className="flex flex-row flex-wrap gap-4 sm:gap-6 pt-6 text-xs sm:text-sm text-slate-400 dark:text-slate-400"
            >
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
          <div
            data-hero-card
            className="flex justify-center lg:justify-end items-center w-full lg:w-2/5 mb-8 lg:mb-0"
          >
            <div className="relative">
              {/* Profile Card Container */}
              <div className="relative z-10 transform hover:scale-105 transition-transform duration-300">
                <ProfileCard
                  name="Putu Aguss"
                  title="Front-end Developer"
                  handle="Putuaguss"
                  status="Simplicity."
                  contactText="Contact Me"
                  iconUrl="/photo/iconpattern.png"
                  avatarUrl="/photo/tuagus_photo.svg"
                  miniAvatarUrl="/photo/tuagus_profil.svg"
                  behindGradient="to-br from-blue-400 via-purple-500 to-pink-600"
                  innerGradient="to-r from-blue-500 to-purple-500"
                  showUserInfo={true}
                  enableTilt={true}
                  onContactClick={() =>
                    (window.location.href = "mailto:ptaguss2@gmail.com")
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== About Section ====== */}
      <section ref={aboutRef} className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            {/* Gambar About - Kiri */}
            <div
              data-about-image
              className="w-full lg:w-1/2 flex justify-center"
            >
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-[400px] lg:h-[400px]">
                <TiltedCard
                  imageSrc="/photo/about_photo.svg"
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
                    <p
                      className="absolute top-6 left-6 px-6 py-2 rounded-2xl bg-gray-700/70 text-white text-xl font-bold shadow-lg"
                      style={{ backdropFilter: "blur(4px)" }}
                    >
                      Hello!
                    </p>
                  }
                />
              </div>
            </div>

            {/* Teks About - Kanan */}
            <div className="w-full lg:w-1/2 text-left">
              <h2
                data-about-content
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-sky-900 dark:text-white text-left"
              >
                About Me
              </h2>
              <p
                data-about-content
                className="text-slate-600 dark:text-neutral-300 text-md sm:text-lg lg:text-xl leading-relaxed mb-8 text-left"
              >
                A brief introduction about me and my interest — including the
                skills I've learned, tools I use, and certifications that
                support my journey.
              </p>
              <div data-about-content>
                <Link href="/about" passHref>
                  <button className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-sky-700 to-sky-400 dark:bg-gradient-to-r dark:from-sky-500 dark:to-sky-400 hover:from-sky-800 hover:to-sky-500 dark:hover:from-sky-400 dark:hover:to-sky-300 text-white font-semibold rounded-lg transition-all duration-300 shadow-md shadow-sky-900/20 dark:shadow-sky-500/20 hover:shadow-lg hover:shadow-sky-900/30 dark:hover:shadow-sky-400/30 transform hover:-translate-y-0.5 text-left active:translate-y-1 active:scale-95">
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
        </div>
      </section>

      {/* ====== Projects Section ====== */}
      <section ref={projectsRef} className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16">
            {/* Gambar Project - Kanan */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="w-full max-w-lg">
                {/* Container untuk layout gambar */}
                <div className="flex gap-4 h-64 sm:h-80 lg:h-96">
                  {/* Gambar Besar - Kiri */}
                  <div data-projects-images className="flex-1">
                    <Image
                      src="/photo/photo_project_left.svg"
                      alt="Main Project"
                      width={500}
                      height={400}
                      className="w-full h-full object-cover rounded-lg shadow-lg shadow-slate-400/30 dark:shadow-slate-900/50 grayscale hover:grayscale-0 transition-all duration-700 ease-out transform hover:scale-105 hover:shadow-2xl hover:shadow-sky-500/40 dark:hover:shadow-sky-400/50 active:scale-110 active:grayscale-0 active:shadow-2xl active:shadow-sky-600/50 dark:active:shadow-sky-300/60 cursor-pointer sm:active:scale-[1.15] sm:active:shadow-3xl"
                    />
                  </div>

                  {/* Container Gambar Kecil - Kanan */}
                  <div className="flex flex-col gap-4 w-32 sm:w-40 lg:w-44">
                    {/* Gambar Kecil Atas */}
                    <div data-projects-images className="flex-1">
                      <Image
                        src="/photo/photo_project_right_1.svg"
                        alt="Project 2"
                        width={300}
                        height={200}
                        className="w-full h-full object-cover rounded-lg shadow-md shadow-slate-400/25 dark:shadow-slate-900/40 grayscale hover:grayscale-0 transition-all duration-600 ease-out transform hover:scale-110 hover:rotate-2 hover:shadow-xl hover:shadow-sky-500/35 dark:hover:shadow-sky-400/45 active:scale-[1.2] active:grayscale-0 active:rotate-3 active:shadow-xl active:shadow-sky-600/45 dark:active:shadow-sky-300/55 cursor-pointer sm:active:scale-[1.25] sm:active:rotate-[5deg]"
                      />
                    </div>

                    {/* Gambar Kecil Bawah */}
                    <div data-projects-images className="flex-1">
                      <Image
                        src="/photo/photo_project_right_2.svg"
                        alt="Project 3"
                        width={300}
                        height={200}
                        className="w-full h-full object-cover rounded-lg shadow-md shadow-slate-400/25 dark:shadow-slate-900/40 grayscale hover:grayscale-0 transition-all duration-600 ease-out transform hover:scale-110 hover:-rotate-2 hover:shadow-xl hover:shadow-sky-500/35 dark:hover:shadow-sky-400/45 active:scale-[1.2] active:grayscale-0 active:-rotate-3 active:shadow-xl active:shadow-sky-600/45 dark:active:shadow-sky-300/55 cursor-pointer sm:active:scale-[1.25] sm:active:-rotate-[5deg]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Teks Project - Kiri */}
            <div className="w-full lg:w-1/2 text-left">
              <h2
                data-projects-content
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-sky-900 dark:text-white text-left"
              >
                Projects
              </h2>
              <p
                data-projects-content
                className="text-slate-600 dark:text-neutral-300 text-md sm:text-lg lg:text-xl leading-relaxed mb-8 text-left"
              >
                Here are some projects I've completed and ones I'm currently
                working on — Click below to explore more.
              </p>
              <div data-projects-content>
                <Link href="/projects" passHref>
                  <button className="inline-flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-sky-400 to-sky-700 dark:bg-gradient-to-r dark:from-sky-400 dark:to-sky-500 hover:from-sky-500 hover:to-sky-800 dark:hover:from-sky-300 dark:hover:to-sky-400 text-white font-semibold rounded-lg transition-all duration-300 shadow-md shadow-sky-400/20 dark:shadow-sky-400/20 hover:shadow-lg hover:shadow-sky-900/30 dark:hover:shadow-sky-500/30 transform hover:-translate-y-0.5 text-left active:translate-y-1 active:scale-95">
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
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Let's Connect Section ====== */}
      <section ref={connectRef} className="py-2 sm:py-2 lg:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2
              data-connect-content
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-6 text-sky-900 dark:text-white"
            >
              Let's Connect
            </h2>
            <p
              data-connect-content
              className="hidden sm:block text-slate-600 dark:text-neutral-300 text-md sm:text-lg lg:text-xl leading-relaxed mb-8 max-w-full mx-auto"
            >
              Ready to bring your ideas to life? Let's discuss your next project
              and create something amazing together.
            </p>
            <div data-connect-content>
              <Link href="/contact" passHref>
                <button className="inline-flex items-center px-8 sm:px-12 font-bold rounded-lg transition-all duration-300 shadow-none text-3xl sm:text-2xl text-sky-600 dark:text-sky-400 focus:outline-none hover:text-sky-400 dark:hover:text-sky-300 hover:scale-105 group active:translate-y-1 active:scale-95">
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
        </div>
      </section>
    </>
  );
}
