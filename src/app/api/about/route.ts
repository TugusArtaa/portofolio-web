import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

// Handler untuk request GET, mengambil semua data 'about' dari database
export async function GET() {
  try {
    await requireAuth();
    const abouts = await prisma.about.findMany({
      orderBy: { id: "asc" },
    });
    return NextResponse.json(abouts);
  } catch {
    return NextResponse.json(
      { message: "Unauthorized, Jangan ya dek ya!" },
      { status: 401 }
    );
  }
}

// Handler untuk request POST, menambah data baru ke tabel 'about'
export async function POST(req: Request) {
  try {
    await requireAuth();
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
  } catch {
    return NextResponse.json(
      { message: "Unauthorized, Jangan ya dek ya!" },
      { status: 401 }
    );
  }
}
