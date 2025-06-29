import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Handler untuk request GET, mengambil semua data 'about' dari database
export async function GET() {
  const abouts = await prisma.about.findMany({
    orderBy: { id: "asc" },
  });
  return NextResponse.json(abouts);
}

// Handler untuk request POST, menambah data baru ke tabel 'about'
export async function POST(req: Request) {
  const body = await req.json();
  const { id, content } = body;
  // Validasi: id dan content wajib diisi
  if (!id || !content) {
    return NextResponse.json(
      { message: "Field 'id' dan 'content' wajib diisi" },
      { status: 400 }
    );
  }
  // Menyimpan data baru ke database
  const about = await prisma.about.create({
    data: { id, content },
  });
  return NextResponse.json(about, { status: 201 });
}
