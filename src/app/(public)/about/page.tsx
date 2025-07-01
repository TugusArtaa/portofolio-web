import React from "react";
import { About, Skill, Tool, Certificate } from "@prisma/client";

// Fungsi fetch data dari API public
async function getData(endpoint: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/public/${endpoint}`,
    { cache: "no-store" }
  );
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  return res.json();
}

export default async function AboutPage() {
  const [about, skills, tools, certificates]: [
    About[],
    Skill[],
    Tool[],
    Certificate[]
  ] = await Promise.all([
    getData("about"),
    getData("skill"),
    getData("tool"),
    getData("certificate"),
  ]);

  // Ambil masing-masing bagian about berdasarkan id
  const getAboutById = (id: string): About | undefined =>
    Array.isArray(about) ? about.find((item) => item.id === id) : undefined;

  const whoAmI = getAboutById("who_am_i");
  const education = getAboutById("education");
  const quote = getAboutById("quote");
  const callToAction = getAboutById("call_to_action");

  return (
    <section className="max-w-4xl mx-auto py-12 text-center">
      {/* Who Am I */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Tentang Saya</h2>
        {whoAmI ? (
          <p className="text-lg">
            {whoAmI.content /* About hanya punya content dan updatedAt */}
          </p>
        ) : (
          <p>Tidak ada data tentang saya.</p>
        )}
      </div>

      {/* Education */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Pendidikan</h2>
        {education ? (
          <p className="text-lg">{education.content}</p>
        ) : (
          <p>Tidak ada data pendidikan.</p>
        )}
      </div>

      {/* Quote */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Quote</h2>
        {quote ? (
          <blockquote className="italic text-lg border-l-4 border-blue-400 pl-4">
            {quote.content}
          </blockquote>
        ) : (
          <p>Tidak ada quote.</p>
        )}
      </div>

      {/* Call To Action */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Ayo Terhubung</h2>
        {callToAction ? (
          <p className="text-lg">{callToAction.content}</p>
        ) : (
          <p>Tidak ada call to action.</p>
        )}
      </div>

      {/* Skills */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Skill</h2>
        {Array.isArray(skills) && skills.length > 0 ? (
          <ul className="flex flex-wrap justify-center gap-3">
            {skills.map((skill: Skill) => (
              <li
                key={skill.id}
                className="border rounded px-3 py-1 bg-gray-50 flex items-center gap-2"
              >
                {skill.icon && (
                  <img src={skill.icon} alt={skill.name} className="w-5 h-5" />
                )}
                <span>{skill.name}</span>
                {skill.level && (
                  <span className="text-xs text-gray-500 ml-2">
                    ({skill.level})
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Tidak ada skill.</p>
        )}
      </div>

      {/* Tools */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">Tools</h2>
        {Array.isArray(tools) && tools.length > 0 ? (
          <ul className="flex flex-wrap justify-center gap-3">
            {tools.map((tool: Tool) => (
              <li
                key={tool.id}
                className="border rounded px-3 py-1 bg-gray-50 flex items-center gap-2"
              >
                {tool.icon && (
                  <img src={tool.icon} alt={tool.name} className="w-5 h-5" />
                )}
                <span>{tool.name}</span>
                {tool.level && (
                  <span className="text-xs text-gray-500 ml-2">
                    ({tool.level})
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Tidak ada tool.</p>
        )}
      </div>

      {/* Certificates */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Certificate</h2>
        {Array.isArray(certificates) && certificates.length > 0 ? (
          <ul className="grid gap-4">
            {certificates.map((cert: Certificate) => (
              <li
                key={cert.id}
                className="border rounded p-3 text-left flex flex-col items-start"
              >
                <span className="font-semibold">{cert.title}</span>
                <span className="text-sm text-gray-600">
                  {cert.issuer}{" "}
                  {cert.issueDate
                    ? `- ${new Date(cert.issueDate).getFullYear()}`
                    : ""}
                </span>
                {cert.image && (
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-32 mt-2 rounded"
                  />
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>Tidak ada certificate.</p>
        )}
      </div>
    </section>
  );
}
