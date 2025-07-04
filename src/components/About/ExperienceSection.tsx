"use client";

import Image from "next/image";

interface Experience {
  id: number;
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  logo: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
}

export default function ExperienceSection({
  experiences,
}: ExperienceSectionProps) {
  return (
    <section className="mb-20 sm:mb-24">
      <div className="text-center mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-sky-900 dark:text-white">
          My Experience
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-neutral-300">
          Professional journey and key milestones
        </p>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-sky-400 to-blue-600"></div>

        <div className="space-y-12 sm:space-y-16">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative">
              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-sky-400 rounded-full border-4 border-white dark:border-slate-900 shadow-lg z-10"></div>

              {/* Content */}
              <div
                className={`flex ${
                  index % 2 === 0 ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`w-full sm:w-5/12 lg:w-5/12 xl:w-2/5 ${
                    index % 2 === 0
                      ? "pr-8 sm:pr-16 lg:pr-20"
                      : "pl-8 sm:pl-16 lg:pl-20"
                  }`}
                >
                  <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-300">
                    {/* Header with Logo and Title */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                        <Image
                          src={exp.logo || "/placeholder.svg"}
                          alt={exp.company}
                          width={28}
                          height={28}
                          className="rounded-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-neutral-100 leading-tight mb-1">
                          {exp.title}
                        </h3>
                        <p className="text-sky-600 dark:text-sky-400 font-semibold text-base sm:text-lg">
                          {exp.company}
                        </p>
                      </div>
                    </div>

                    {/* Date and Location */}
                    <div className="flex flex-wrap gap-3 mb-4">
                      <div className="flex items-center gap-2 bg-sky-50 dark:bg-sky-900/20 px-3 py-1.5 rounded-full">
                        <svg
                          className="w-4 h-4 text-sky-600 dark:text-sky-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span className="text-sm font-medium text-sky-700 dark:text-sky-300">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-700 px-3 py-1.5 rounded-full">
                        <svg
                          className="w-4 h-4 text-slate-600 dark:text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                          {exp.location}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-slate-600 dark:text-neutral-300 leading-relaxed text-sm sm:text-base">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
