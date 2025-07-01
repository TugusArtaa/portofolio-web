"use client";

import { useEffect, useState, use } from "react";
import AboutForm from "../../_form";
import { About } from "@prisma/client";

export default function AboutEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const actualParams = use(params);
  const [data, setData] = useState<About | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/about/${actualParams.id}`, { cache: "no-store" })
      .then(async (res) => {
        if (!res.ok) {
          setNotFound(true);
        } else {
          setData(await res.json());
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setIsLoading(false));
  }, [actualParams.id]);

  if (isLoading) return null;

  if (notFound) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center text-red-500 font-bold text-xl">
          Data About tidak ditemukan.
        </div>
      </div>
    );
  }

  return (
    <AboutForm
      existing={data as About}
      onSuccess={() => (window.location.href = "/admin/about")}
      onCancel={() => (window.location.href = "/admin/about")}
    />
  );
}
