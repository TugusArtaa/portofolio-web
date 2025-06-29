import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = { params: { id: string } };

// Handler GET: Mengambil data skill berdasarkan id
export async function GET(_: Request, { params }: Params) {
  const skill = await prisma.skill.findUnique({
    where: { id: params.id },
  });
  if (!skill) {
    return NextResponse.json({ message: "Skill not found" }, { status: 404 });
  }
  return NextResponse.json(skill);
}

// Handler PUT: Memperbarui data skill berdasarkan id
export async function PUT(req: Request, { params }: Params) {
  // Mendukung PUT untuk update penuh (kompatibel dengan form)
  const body = await req.json();
  const { name, level, icon } = body;
  // Validasi: name wajib diisi
  if (!name) {
    return NextResponse.json(
      { message: "Field 'name' wajib diisi" },
      { status: 400 }
    );
  }
  const updated = await prisma.skill.update({
    where: { id: params.id },
    data: {
      name,
      level: level ?? null,
      icon: icon ?? null,
    },
  });
  return NextResponse.json(updated);
}

// Handler DELETE: Menghapus data skill berdasarkan id
export async function DELETE(_: Request, { params }: Params) {
  await prisma.skill.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Deleted" });
}
