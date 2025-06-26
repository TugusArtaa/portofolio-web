import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  const about = await prisma.about.findUnique({
    where: { id: params.id },
  });
  if (!about) {
    return NextResponse.json({ message: "About not found" }, { status: 404 });
  }
  return NextResponse.json(about);
}

export async function PUT(req: Request, { params }: Params) {
  const body = await req.json();
  const { content } = body;
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

export async function DELETE(_: Request, { params }: Params) {
  await prisma.about.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Deleted" });
}
