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
  const skill = await prisma.skill.create({ data: body });
  return NextResponse.json(skill, { status: 201 });
}
