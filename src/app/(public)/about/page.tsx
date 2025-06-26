"use client";

import { useEffect, useState } from "react";

const ABOUT_ORDER = [
  "who_am_i",
  "education",
  "quote",
  "whatsapp",
  "gmail",
  "instagram",
  "github",
  "linkedin",
  "discord",
  "call_to_action",
];

const ABOUT_LABELS: Record<string, string> = {
  who_am_i: "Who Am I",
  education: "Education",
  quote: "Quote",
  whatsapp: "WhatsApp",
  gmail: "Gmail",
  instagram: "Instagram",
  github: "GitHub",
  linkedin: "LinkedIn",
  discord: "Discord",
  call_to_action: "Call To Action",
};

export default function AboutPage() {
  const [aboutList, setAboutList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((data) => {
        // Sort by ABOUT_ORDER
        const sorted = [...data].sort(
          (a, b) => ABOUT_ORDER.indexOf(a.id) - ABOUT_ORDER.indexOf(b.id)
        );
        setAboutList(sorted);
      })
      .catch(() => setAboutList([]))
      .finally(() => setIsLoading(false));
  }, []);

  // Cari data secara individual
  const whoAmIData = aboutList.find((item) => item.id === "who_am_i");
  const educationData = aboutList.find((item) => item.id === "education");
  const quoteData = aboutList.find((item) => item.id === "quote");
  const whatsappData = aboutList.find((item) => item.id === "whatsapp");
  const gmailData = aboutList.find((item) => item.id === "gmail");
  const instagramData = aboutList.find((item) => item.id === "instagram");
  const githubData = aboutList.find((item) => item.id === "github");
  const linkedinData = aboutList.find((item) => item.id === "linkedin");
  const discordData = aboutList.find((item) => item.id === "discord");
  const callToActionData = aboutList.find(
    (item) => item.id === "call_to_action"
  );

  return (
    <section className="max-w-3xl mx-auto py-8 px-4 space-y-8">
      <h1 className="text-3xl font-semibold mb-2">Tentang Saya</h1>
      <p className="text-slate-600 dark:text-slate-300 mb-6">
        Seluruh informasi tentang saya, pendidikan, kontak, dan lainnya.
      </p>
      {isLoading ? (
        <div className="flex flex-col gap-6">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="h-8 bg-slate-100 dark:bg-slate-800 rounded-md animate-pulse"
            ></div>
          ))}
        </div>
      ) : aboutList.length === 0 ? (
        <div className="text-center text-slate-400 dark:text-slate-500 italic py-12">
          Belum ada data about yang tersedia.
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {whoAmIData && (
            <div className="styling-khusus-who-am-i">
              <div className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                {ABOUT_LABELS["who_am_i"]}
              </div>
              <div className="text-slate-700 dark:text-slate-300 whitespace-pre-line">
                {whoAmIData.content}
              </div>
            </div>
          )}
          {educationData && (
            <div className="styling-khusus-education">
              <div className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                {ABOUT_LABELS["education"]}
              </div>
              <div className="text-slate-700 dark:text-slate-300 whitespace-pre-line">
                {educationData.content}
              </div>
            </div>
          )}
          {quoteData && (
            <div className="styling-khusus-quote">
              <div className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                {ABOUT_LABELS["quote"]}
              </div>
              <div className="text-slate-700 dark:text-slate-300 whitespace-pre-line">
                {quoteData.content}
              </div>
            </div>
          )}
          {whatsappData && (
            <div className="styling-khusus-whatsapp">
              <div className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                {ABOUT_LABELS["whatsapp"]}
              </div>
              <div className="text-slate-700 dark:text-slate-300 whitespace-pre-line">
                {whatsappData.content}
              </div>
            </div>
          )}
          {gmailData && (
            <div className="styling-khusus-gmail">
              <div className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                {ABOUT_LABELS["gmail"]}
              </div>
              <div className="text-slate-700 dark:text-slate-300 whitespace-pre-line">
                {gmailData.content}
              </div>
            </div>
          )}
          {instagramData && (
            <div className="styling-khusus-instagram">
              <div className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                {ABOUT_LABELS["instagram"]}
              </div>
              <div className="text-slate-700 dark:text-slate-300 whitespace-pre-line">
                {instagramData.content}
              </div>
            </div>
          )}
          {githubData && (
            <div className="styling-khusus-github">
              <div className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                {ABOUT_LABELS["github"]}
              </div>
              <div className="text-slate-700 dark:text-slate-300 whitespace-pre-line">
                {githubData.content}
              </div>
            </div>
          )}
          {linkedinData && (
            <div className="styling-khusus-linkedin">
              <div className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                {ABOUT_LABELS["linkedin"]}
              </div>
              <div className="text-slate-700 dark:text-slate-300 whitespace-pre-line">
                {linkedinData.content}
              </div>
            </div>
          )}
          {discordData && (
            <div className="styling-khusus-discord">
              <div className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                {ABOUT_LABELS["discord"]}
              </div>
              <div className="text-slate-700 dark:text-slate-300 whitespace-pre-line">
                {discordData.content}
              </div>
            </div>
          )}
          {callToActionData && (
            <div className="styling-khusus-call-to-action">
              <div className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
                {ABOUT_LABELS["call_to_action"]}
              </div>
              <div className="text-slate-700 dark:text-slate-300 whitespace-pre-line">
                {callToActionData.content}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
