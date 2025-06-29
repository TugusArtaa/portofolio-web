import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = { params: { id: string } };

// Handler GET: Mengambil data 'about' berdasarkan id
export async function GET(_: Request, { params }: Params) {
  const about = await prisma.about.findUnique({
    where: { id: params.id },
  });
  if (!about) {
    return NextResponse.json({ message: "About not found" }, { status: 404 });
  }
  return NextResponse.json(about);
}

// Handler PUT: Memperbarui data 'about' berdasarkan id
export async function PUT(req: Request, { params }: Params) {
  const body = await req.json();
  const { content } = body;
  // Validasi: content wajib diisi
  if (!content) {
    return NextResponse.json(
      { message: "Field 'content' wajib diisi" },
      { status: 400 }
    );
  }
  const updated = await prisma.about.update({
    where: { id: params.id },
    data: { content },
  });
  return NextResponse.json(updated);
}

// Handler DELETE: Menghapus data 'about' berdasarkan id
export async function DELETE(_: Request, { params }: Params) {
  await prisma.about.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Deleted" });
}
