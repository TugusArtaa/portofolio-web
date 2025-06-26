import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const abouts = await prisma.about.findMany({
    orderBy: { id: "asc" },
  });
  return NextResponse.json(abouts);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { id, content } = body;
  if (!id || !content) {
    return NextResponse.json(
      { message: "Field 'id' dan 'content' wajib diisi" },
      { status: 400 }
    );
  }
  const about = await prisma.about.create({
    data: { id, content },
  });
  return NextResponse.json(about, { status: 201 });
}
