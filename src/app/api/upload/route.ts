import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { requireAuth } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    await requireAuth();

    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    // Validasi: file harus ada
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Membuat nama file unik berdasarkan timestamp
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name.replace(/\s+/g, "-")}`;
    const path = join(process.cwd(), "public", "uploads", filename);

    // Menyimpan file ke direktori uploads
    await writeFile(path, buffer);

    // Mengembalikan URL file yang di-upload
    const url = `/uploads/${filename}`;

    return NextResponse.json({ url });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json(
        { error: "Unauthorized, Jangan ya dek ya!" },
        { status: 401 }
      );
    }
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
