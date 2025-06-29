import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

type Params = { params: { id: string } };

// Handler GET: Mengambil data 'about' berdasarkan id
export async function GET(_: Request, { params }: Params) {
  try {
    await requireAuth();
    const about = await prisma.about.findUnique({
      where: { id: params.id },
    });
    if (!about) {
      return NextResponse.json({ message: "About not found" }, { status: 404 });
    }
    return NextResponse.json(about);
  } catch {
    return NextResponse.json(
      { message: "Unauthorized, Jangan ya dek ya!" },
      { status: 401 }
    );
  }
}

// Handler PUT: Memperbarui data 'about' berdasarkan id
export async function PUT(req: Request, { params }: Params) {
  try {
    await requireAuth();
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
  } catch {
    return NextResponse.json(
      { message: "Unauthorized, Jangan ya dek ya!" },
      { status: 401 }
    );
  }
}

// Handler DELETE: Menghapus data 'about' berdasarkan id
export async function DELETE(_: Request, { params }: Params) {
  try {
    await requireAuth();
    await prisma.about.delete({ where: { id: params.id } });
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json(
      { message: "Unauthorized, Jangan ya dek ya!" },
      { status: 401 }
    );
  }
}
