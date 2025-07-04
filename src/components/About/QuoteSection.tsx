"use client";

import type { About } from "@prisma/client";

interface QuoteSectionProps {
  quote?: About;
}

export default function QuoteSection({ quote }: QuoteSectionProps) {
  return (
    <section className="mb-12 sm:mb-16">
      <div className="relative max-w-4xl mx-auto">
        <div className="text-center">
          {quote ? (
            <blockquote className="relative">
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-sky-400 dark:text-sky-500 mb-6 sm:mb-8 mx-auto opacity-50"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
              </svg>
              <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-slate-700 dark:text-neutral-200 italic leading-relaxed">
                "{quote.content}"
              </p>
            </blockquote>
          ) : (
            <p className="text-slate-500 dark:text-slate-400 text-lg sm:text-xl">
              No quote available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
