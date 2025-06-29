import React from "react";

async function getContactAbout() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/public/about`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error("Failed to fetch about");
  const about = await res.json();
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
    ? about.filter((item: any) => contactIds.includes(item.id))
    : [];
}

export default async function ContactPage() {
  const contacts = await getContactAbout();

  // Pisahkan masing-masing kontak berdasarkan id
  const getContactById = (id: string) =>
    Array.isArray(contacts)
      ? contacts.find((item: any) => item.id === id)
      : undefined;

  const gmail = getContactById("gmail");
  const whatsapp = getContactById("whatsapp");
  const instagram = getContactById("instagram");
  const linkedin = getContactById("linkedin");
  const github = getContactById("github");
  const discord = getContactById("discord");

  return (
    <section className="max-w-4xl mx-auto py-12 text-center">
      <div className="mt-8 space-y-4 max-w-md mx-auto text-left">
        {/* Gmail */}
        <div>
          <span className="font-semibold">Gmail: </span>
          {gmail ? (
            <a
              href={`mailto:${gmail.content || gmail.value}`}
              className="text-blue-600 underline"
            >
              {gmail.content || gmail.value}
            </a>
          ) : (
            <span className="text-gray-500">Tidak tersedia</span>
          )}
        </div>
        {/* Whatsapp */}
        <div>
          <span className="font-semibold">Whatsapp: </span>
          {whatsapp ? (
            <a
              href={`https://wa.me/${(
                whatsapp.content ||
                whatsapp.value ||
                ""
              ).replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 underline"
            >
              {whatsapp.content || whatsapp.value}
            </a>
          ) : (
            <span className="text-gray-500">Tidak tersedia</span>
          )}
        </div>
        {/* Instagram */}
        <div>
          <span className="font-semibold">Instagram: </span>
          {instagram ? (
            <a
              href={`https://instagram.com/${
                instagram.content || instagram.value
              }`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 underline"
            >
              @{instagram.content || instagram.value}
            </a>
          ) : (
            <span className="text-gray-500">Tidak tersedia</span>
          )}
        </div>
        {/* Linkedin */}
        <div>
          <span className="font-semibold">LinkedIn: </span>
          {linkedin ? (
            <a
              href={linkedin.content || linkedin.value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline"
            >
              {linkedin.content || linkedin.value}
            </a>
          ) : (
            <span className="text-gray-500">Tidak tersedia</span>
          )}
        </div>
        {/* Github */}
        <div>
          <span className="font-semibold">GitHub: </span>
          {github ? (
            <a
              href={`https://github.com/${github.content || github.value}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 underline"
            >
              {github.content || github.value}
            </a>
          ) : (
            <span className="text-gray-500">Tidak tersedia</span>
          )}
        </div>
        {/* Discord */}
        <div>
          <span className="font-semibold">Discord: </span>
          {discord ? (
            <span>{discord.content || discord.value}</span>
          ) : (
            <span className="text-gray-500">Tidak tersedia</span>
          )}
        </div>
      </div>
    </section>
  );
}
