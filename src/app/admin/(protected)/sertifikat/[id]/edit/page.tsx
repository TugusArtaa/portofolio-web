"use client";

import { useEffect, useState, use } from "react";
import SertifikatForm from "../../_form";

export default function SertifikatEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const actualParams = use(params);
  const [data, setData] = useState<any>(null);
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`/api/sertifikat/${actualParams.id}`, { cache: "no-store" })
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
          Data Sertifikat tidak ditemukan.
        </div>
      </div>
    );
  }

  return (
    <SertifikatForm
      existing={data}
      onSuccess={() => (window.location.href = "/admin/sertifikat")}
      onCancel={() => (window.location.href = "/admin/sertifikat")}
    />
  );
}
