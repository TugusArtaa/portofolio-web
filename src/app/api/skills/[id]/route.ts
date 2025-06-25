import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = { params: { id: string } };

export async function GET(_: Request, { params }: Params) {
  const skill = await prisma.skill.findUnique({
    where: { id: params.id },
  });
  return NextResponse.json(skill);
}

export async function PATCH(req: Request, { params }: Params) {
  const body = await req.json();
  const updated = await prisma.skill.update({
    where: { id: params.id },
    data: body,
  });
  return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: Params) {
  await prisma.skill.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Deleted" });
}
