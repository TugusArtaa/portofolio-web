"use client";

import { useState, useEffect } from "react";
import FormLayout from "@/components/shared/FormLayout";
import FormInput from "@/components/shared/FormInput";
import SertifikatPreview from "@/components/shared/SertifikatPreview";
import ImageUpload from "@/components/shared/ImageUpload";
import { useToast } from "@/components/ui/toast";

interface SertifikatFormProps {
  existing?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export default function SertifikatForm({
  existing,
  onSuccess,
  onCancel,
}: SertifikatFormProps) {
  const [form, setForm] = useState({
    id: "",
    title: "",
    issuer: "",
    issueDate: "",
    expireDate: "",
    image: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    if (existing) {
      setForm({
        id: existing.id || "",
        title: existing.title || "",
        issuer: existing.issuer || "",
        issueDate: existing.issueDate ? existing.issueDate.slice(0, 10) : "",
        expireDate: existing.expireDate ? existing.expireDate.slice(0, 10) : "",
        image: existing.image || "",
      });
    }
  }, [existing]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.title.trim()) newErrors.title = "Judul wajib diisi";
    if (!form.issuer.trim()) newErrors.issuer = "Penerbit wajib diisi";
    if (!form.issueDate) newErrors.issueDate = "Tanggal terbit wajib diisi";
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const fieldError = validate()[field];
    if (fieldError) setErrors((prev) => ({ ...prev, [field]: fieldError }));
  };

  const handleImageChange = (url: string) => {
    setForm((prev) => ({ ...prev, image: url }));
    if (errors.image) setErrors((prev) => ({ ...prev, image: "" }));
  };

  const handleSubmit = async () => {
    const validation = validate();
    setErrors(validation);
    setTouched({
      title: true,
      issuer: true,
      issueDate: true,
      expireDate: true,
      image: true,
    });
    if (Object.keys(validation).length > 0) {
      addToast({
        type: "error",
        title: "Form Tidak Valid",
        message: "Silakan lengkapi semua field yang wajib diisi.",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const method = existing ? "PUT" : "POST";
      const url = existing
        ? `/api/sertifikat/${existing.id}`
        : "/api/sertifikat";
      const payload = {
        ...form,
        id: existing ? existing.id : form.id || crypto.randomUUID(),
        issueDate: form.issueDate,
        expireDate: form.expireDate || null,
        image: form.image || null,
      };
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        addToast({
          type: "success",
          title: existing ? "Sertifikat Diperbarui" : "Sertifikat Ditambahkan",
          message: existing
            ? "Data berhasil diperbarui."
            : "Data baru berhasil ditambahkan.",
        });
        if (onSuccess) onSuccess();
      } else {
        throw new Error();
      }
    } catch {
      addToast({
        type: "error",
        title: "Gagal Menyimpan",
        message: "Terjadi kesalahan saat menyimpan data.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormLayout
      title={existing ? "Edit Sertifikat" : "Tambah Sertifikat"}
      subtitle={
        existing ? "Edit data sertifikat" : "Tambah data sertifikat baru"
      }
      onCancel={onCancel}
      onSubmit={handleSubmit}
      submitLabel={existing ? "Update Sertifikat" : "Simpan Sertifikat"}
      isSubmitting={isSubmitting}
      preview={
        <SertifikatPreview
          title={form.title}
          issuer={form.issuer}
          issueDate={form.issueDate}
          expireDate={form.expireDate}
          image={form.image}
        />
      }
    >
      <FormInput
        label="Judul Sertifikat"
        name="title"
        placeholder="Contoh: Frontend Developer"
        value={form.title}
        onChange={handleChange}
        onBlur={() => handleBlur("title")}
        required
        error={touched.title ? errors.title : ""}
      />
      <FormInput
        label="Penerbit"
        name="issuer"
        placeholder="Contoh: Dicoding, Coursera"
        value={form.issuer}
        onChange={handleChange}
        onBlur={() => handleBlur("issuer")}
        required
        error={touched.issuer ? errors.issuer : ""}
      />
      <FormInput
        label="Tanggal Terbit"
        name="issueDate"
        type="date"
        placeholder="Tanggal terbit"
        value={form.issueDate}
        onChange={handleChange}
        onBlur={() => handleBlur("issueDate")}
        required
        error={touched.issueDate ? errors.issueDate : ""}
      />
      <FormInput
        label="Tanggal Expired (Opsional)"
        name="expireDate"
        type="date"
        placeholder="Tanggal expired (opsional)"
        value={form.expireDate}
        onChange={handleChange}
        onBlur={() => handleBlur("expireDate")}
        error={touched.expireDate ? errors.expireDate : ""}
      />
      <ImageUpload
        label="Gambar Sertifikat (Opsional)"
        value={form.image}
        onChange={handleImageChange}
        onPreviewChange={() => {}} // tambahkan ini agar tidak error typescript
      />
    </FormLayout>
  );
}
