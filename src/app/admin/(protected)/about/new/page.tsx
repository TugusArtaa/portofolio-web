"use client";

import { useEffect, useState } from "react";
import AboutForm from "../_form";
import { About } from "@prisma/client";

export default function AboutNewPage() {
  const [usedIds, setUsedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/about")
      .then((res) => res.json())
      .then((data: About[]) => setUsedIds(data.map((item) => item.id)))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return null;

  return (
    <AboutForm
      usedIds={usedIds}
      onSuccess={() => (window.location.href = "/admin/about")}
      onCancel={() => (window.location.href = "/admin/about")}
    />
  );
}
