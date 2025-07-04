"use client";

import type { About } from "@prisma/client";
import Image from "next/image";

interface WhoAmISectionProps {
  whoAmI?: About;
}

export default function WhoAmISection({ whoAmI }: WhoAmISectionProps) {
  return (
    <section className="mb-20 sm:mb-24">
      <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
        {/* Text Content - Left */}
        <div className="order-2 lg:order-1">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 sm:mb-8 text-sky-900 dark:text-white">
            Who Am I?
          </h2>
          {whoAmI ? (
            <div className="space-y-4 sm:space-y-6">
              <div className="space-y-5 text-base sm:text-lg lg:text-xl text-slate-600 dark:text-neutral-300 leading-relaxed">
                {whoAmI.content.split("\n").map((para, idx) => (
                  <p key={idx} dangerouslySetInnerHTML={{ __html: para }} />
                ))}
              </div>
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-4">
                <div className="flex items-center gap-2 bg-sky-50 dark:bg-sky-900/20 px-3 sm:px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-medium text-sky-700 dark:text-sky-300">
                    Open to opportunities
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-3 sm:px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-sky-400 rounded-full"></div>
                  <span className="text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300">
                    Always learning
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-slate-500 dark:text-slate-400 text-base sm:text-lg">
              No information available.
            </p>
          )}
        </div>
        {/* Photo - Right */}
        <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="relative w-64 sm:w-80 lg:w-96">
            <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl transform rotate-6"></div>
            <div className="relative bg-white dark:bg-slate-800 p-2 rounded-2xl shadow-2xl">
              <Image
                src="/photo/about_photo_2.svg"
                alt="Profile Photo"
                width={320}
                height={400}
                className="rounded-xl object-cover w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
