"use client";

import type { Certificate } from "@prisma/client";
import Image from "next/image";
import { useState } from "react";
import { X, Eye } from "lucide-react";

interface CertificatesSectionProps {
  certificates: Certificate[];
}

const customScrollbarStyles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgb(241 245 249);
    border-radius: 9999px;
  }
  
  .dark .custom-scrollbar::-webkit-scrollbar-track {
    background: rgb(30 41 59);
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgb(125 211 252);
    border-radius: 9999px;
    transition: background-color 0.2s ease;
  }
  
  .dark .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgb(2 132 199);
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgb(56 189 248);
  }
  
  .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgb(14 165 233);
  }
  
  /* Firefox */
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgb(125 211 252) rgb(241 245 249);
  }
  
  .dark .custom-scrollbar {
    scrollbar-color: rgb(2 132 199) rgb(30 41 59);
  }
`;

export default function CertificatesSection({
  certificates,
}: CertificatesSectionProps) {
  const [showAll, setShowAll] = useState(false);
  const [selectedCertificate, setSelectedCertificate] =
    useState<Certificate | null>(null);

  const displayedCertificates = showAll
    ? certificates
    : certificates.slice(0, 3);

  const openModal = (cert: Certificate) => {
    setSelectedCertificate(cert);
  };

  const closeModal = () => {
    setSelectedCertificate(null);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customScrollbarStyles }} />
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
              {displayedCertificates.map((cert: Certificate) => (
                <div
                  key={cert.id}
                  className="group relative bg-white/50 dark:bg-slate-800/50 rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:shadow-sky-400/40 border border-slate-200 dark:border-slate-700 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02]"
                >
                  {/* Corner borders */}
                  <div className="absolute top-0 right-0 w-8 h-8 sm:w-12 sm:h-12 border-t-2 border-r-2 rounded-tr-2xl transition-all duration-300 border-muted-foreground/30 group-hover:border-sky-500 group-hover:w-12 group-hover:h-12 sm:group-hover:w-16 sm:group-hover:h-16 z-10" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 sm:w-12 sm:h-12 border-b-2 border-l-2 rounded-bl-2xl transition-all duration-300 border-muted-foreground/30 group-hover:border-sky-500 group-hover:w-12 group-hover:h-12 sm:group-hover:w-16 sm:group-hover:h-16 z-10" />

                  {/* Certificate Image - With padding and A4 landscape ratio */}
                  <div className="p-4 sm:p-6">
                    <div className="relative overflow-hidden aspect-[297/210] bg-gradient-to-br from-slate-900 to-black rounded-lg group/image">
                      {cert.image ? (
                        <Image
                          src={cert.image || "/placeholder.svg"}
                          alt={cert.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-lg"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-white">
                          <h3 className="text-base sm:text-lg font-bold mb-2">
                            Gambar Certificate
                          </h3>
                          <p className="text-xs sm:text-sm opacity-80">
                            Rasio A4 Landscape
                          </p>
                        </div>
                      )}

                      {/* Desktop Hover overlay with view icon */}
                      <div className="hidden lg:flex absolute inset-0 bg-black/50 opacity-0 group-hover/image:opacity-100 transition-all duration-300 rounded-lg items-center justify-center">
                        <button
                          onClick={() => openModal(cert)}
                          className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-3 hover:bg-white/30 transition-all duration-200 transform hover:scale-110"
                        >
                          <Eye className="w-6 h-6 text-white" />
                        </button>
                      </div>

                      {/* Mobile View Button - Always visible on mobile */}
                      <button
                        onClick={() => openModal(cert)}
                        className="lg:hidden absolute top-2 right-2 bg-black/50 backdrop-blur-sm border border-white/30 rounded-full p-2 hover:bg-black/70 transition-all duration-200 z-20"
                      >
                        <Eye className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  </div>

                  {/* Certificate Info - Compact bottom section */}
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 relative z-10">
                    {/* Title - Full width */}
                    <h3 className="font-bold text-base sm:text-lg text-slate-800 dark:text-neutral-100 line-clamp-1 group-hover:text-sky-700 dark:group-hover:text-sky-400 transition-colors duration-300 mb-2">
                      {cert.title || "Cert.title"}
                    </h3>

                    {/* Issuer and Year - Same line */}
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm text-slate-600 dark:text-neutral-400 truncate flex-1">
                        {cert.issuer || "cert.issuer"}
                      </p>

                      {cert.issueDate ? (
                        <button className="px-3 py-1.5 bg-sky-500 hover:bg-sky-600 group-hover:bg-sky-600 text-white text-xs font-medium rounded-lg transition-colors duration-200 group-hover:shadow-md flex-shrink-0">
                          {new Date(cert.issueDate).getFullYear()}
                        </button>
                      ) : (
                        <button className="px-3 py-1.5 bg-sky-500 hover:bg-sky-600 group-hover:bg-sky-600 text-white text-xs font-medium rounded-lg transition-colors duration-200 group-hover:shadow-md flex-shrink-0">
                          2025
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {certificates.length > 3 && (
              <div className="text-center">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-700 hover:to-sky-600 dark:from-sky-500 dark:to-sky-400 dark:hover:from-sky-600 dark:hover:to-sky-500 text-white font-semibold rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-sky-400/40 transform hover:-translate-y-1"
                >
                  {showAll
                    ? "Show Less"
                    : `Show More (${certificates.length - 3})`}
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

        {/* Certificate Modal */}
        {selectedCertificate && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="relative bg-white dark:bg-slate-800 rounded-xl max-w-4xl w-full max-h-[95vh] overflow-hidden shadow-md">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-slate-800 dark:text-white"
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
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-white">
                    {selectedCertificate.title || "Certificate"}
                  </h3>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-all duration-200 group"
                >
                  <X className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:rotate-90 transition-transform duration-200" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(95vh-120px)] custom-scrollbar">
                {/* Certificate Image - Large Display */}
                <div className="mb-6">
                  <div className="relative aspect-[297/210] bg-gradient-to-br from-slate-900 to-black rounded-lg overflow-hidden shadow-md">
                    {selectedCertificate.image ? (
                      <Image
                        src={selectedCertificate.image || "/placeholder.svg"}
                        alt={selectedCertificate.title}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-white">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                          <svg
                            className="w-8 h-8"
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
                        <h3 className="text-xl font-bold mb-2">
                          Certificate Preview
                        </h3>
                        <p className="text-sm opacity-80">
                          A4 Landscape Format
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Certificate Info - Simple Layout */}
                <div className="flex items-start justify-between gap-6">
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                      {selectedCertificate.issuer || "Certificate Issuer"}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-3">
                      <span>
                        Issued:{" "}
                        {selectedCertificate.issueDate
                          ? new Date(
                              selectedCertificate.issueDate
                            ).getFullYear()
                          : "2025"}
                      </span>
                      {selectedCertificate.expireDate && (
                        <>
                          <span>•</span>
                          <span
                            className={`${
                              new Date(selectedCertificate.expireDate) <
                              new Date()
                                ? "text-red-600 dark:text-red-400"
                                : new Date(selectedCertificate.expireDate) <
                                  new Date(
                                    Date.now() + 30 * 24 * 60 * 60 * 1000
                                  )
                                ? "text-amber-600 dark:text-amber-400"
                                : "text-slate-600 dark:text-slate-400"
                            }`}
                          >
                            Expires:{" "}
                            {new Date(
                              selectedCertificate.expireDate
                            ).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    {/* Status Badge - Always show, default to Valid if no expireDate */}
                    {selectedCertificate.expireDate ? (
                      // If expireDate exists, check status
                      new Date(selectedCertificate.expireDate) < new Date() ? (
                        <span className="inline-flex items-center gap-1 px-3 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-sm font-medium rounded-lg">
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
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Expired
                        </span>
                      ) : new Date(selectedCertificate.expireDate) <
                        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? (
                        <span className="inline-flex items-center gap-1 px-3 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-sm font-medium rounded-lg">
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
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                          </svg>
                          Expires Soon
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium rounded-lg">
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
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          Valid
                        </span>
                      )
                    ) : (
                      // If no expireDate, default to Valid
                      <span className="inline-flex items-center gap-1 px-3 py-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-sm font-medium rounded-lg">
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
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Valid
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
