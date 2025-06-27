"use client";

import ToolForm from "../_form";

export default function ToolNewPage() {
  return (
    <ToolForm
      onSuccess={() => (window.location.href = "/admin/tools")}
      onCancel={() => (window.location.href = "/admin/tools")}
    />
  );
}
