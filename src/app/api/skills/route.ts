import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

// Handler GET: Mengambil semua data skill, diurutkan dari terbaru
export async function GET() {
  try {
    await requireAuth();
    const skills = await prisma.skill.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(skills);
  } catch {
    return NextResponse.json(
      { message: "Unauthorized, Jangan ya dek ya!" },
      { status: 401 }
    );
  }
}

// Handler POST: Menambah data skill baru
export async function POST(req: Request) {
  try {
    await requireAuth();
    const body = await req.json();
    const { id, name, level, icon } = body;
    // Validasi: id dan name wajib diisi
    if (!id || !name) {
      return NextResponse.json(
        { message: "Field 'id' dan 'name' wajib diisi" },
        { status: 400 }
      );
    }
    const skill = await prisma.skill.create({
      data: {
        id,
        name,
        level: level ?? null,
        icon: icon ?? null,
      },
    });
    return NextResponse.json(skill, { status: 201 });
  } catch {
    return NextResponse.json(
      { message: "Unauthorized, Jangan ya dek ya!" },
      { status: 401 }
    );
  }
}
