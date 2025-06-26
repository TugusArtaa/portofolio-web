import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  const skill = await prisma.skill.findUnique({
    where: { id: params.id },
  });
  if (!skill) {
    return NextResponse.json({ message: "Skill not found" }, { status: 404 });
  }
  return NextResponse.json(skill);
}

export async function PATCH(req: Request, { params }: Params) {
  const body = await req.json();
  const { name, level, icon } = body;
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

export async function PUT(req: Request, { params }: Params) {
  // Support PUT for full update (for compatibility with form)
  const body = await req.json();
  const { name, level, icon } = body;
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

export async function DELETE(_: Request, { params }: Params) {
  await prisma.skill.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Deleted" });
}
