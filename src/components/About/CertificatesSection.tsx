"use client";

import type { Certificate } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export default function CertificatesSection({
  certificates,
}: CertificatesSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const displayedCertificates = showAll
    ? certificates
    : certificates.slice(0, 4);

  return (
    <section className="mb-20 sm:mb-24">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-sky-900 dark:text-white">
          Certificates & Achievements
        </h2>
        <p className="text-base sm:text-lg text-slate-600 dark:text-neutral-300">
          Professional certifications and recognitions
        </p>
      </div>

      {Array.isArray(certificates) && certificates.length > 0 ? (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {displayedCertificates.map((cert: Certificate) => (
              <div
                key={cert.id}
                className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:shadow-sky-200/50 dark:hover:shadow-sky-900/30 transition-all duration-300 hover:-translate-y-2"
              >
                {cert.image && (
                  <div className="relative overflow-hidden h-32 sm:h-36">
                    <Image
                      src={cert.image || "/placeholder.svg"}
                      alt={cert.title}
                      width={300}
                      height={150}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                )}
                <div className="p-2 sm:p-3 lg:p-4">
                  <h3 className="font-bold text-xs sm:text-sm lg:text-base text-slate-800 dark:text-neutral-100 mb-2 line-clamp-2 group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs sm:text-sm">
                    <span className="font-medium text-slate-600 dark:text-neutral-400 truncate">
                      {cert.issuer}
                    </span>
                    {cert.issueDate && (
                      <span className="bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-400 px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2">
                        {new Date(cert.issueDate).getFullYear()}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {certificates.length > 4 && (
            <div className="text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 dark:from-sky-500 dark:to-sky-400 dark:hover:from-sky-600 dark:hover:to-sky-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-sky-900/20 dark:shadow-sky-500/20 hover:shadow-xl hover:shadow-sky-900/30 dark:hover:shadow-sky-400/30 transform hover:-translate-y-1"
              >
                {showAll
                  ? "Show Less"
                  : `Show More (${certificates.length - 4})`}
                <svg
                  className={`ml-2 w-4 h-4 transition-transform duration-300 ${
                    showAll ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-12 sm:py-16">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg">
            No certificates available.
          </p>
        </div>
      )}
    </section>
  );
}
