"use client";

import SertifikatForm from "../_form";

export default function SertifikatNewPage() {
  return (
    <SertifikatForm
      onSuccess={() => (window.location.href = "/admin/sertifikat")}
      onCancel={() => (window.location.href = "/admin/sertifikat")}
    />
  );
}
