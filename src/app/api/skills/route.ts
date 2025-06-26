import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const skills = await prisma.skill.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(skills);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { name, level, icon } = body;
  if (!name) {
    return NextResponse.json(
      { message: "Field 'name' wajib diisi" },
      { status: 400 }
    );
  }
  const skill = await prisma.skill.create({
    data: {
      name,
      level: level ?? null,
      icon: icon ?? null,
    },
  });
  return NextResponse.json(skill, { status: 201 });
}
