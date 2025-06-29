import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Handler GET: Mengambil semua data tool, diurutkan dari terbaru
export async function GET() {
  const tools = await prisma.tool.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(tools);
}

// Handler POST: Menambah data tool baru
export async function POST(req: Request) {
  const body = await req.json();
  const { id, name, level, icon } = body;
  // Validasi: id dan name wajib diisi
  if (!id || !name) {
    return NextResponse.json(
      { message: "Field 'id' dan 'name' wajib diisi" },
      { status: 400 }
    );
  }
  const tool = await prisma.tool.create({
    data: {
      id,
      name,
      level,
      icon,
    },
  });
  return NextResponse.json(tool, { status: 201 });
}
