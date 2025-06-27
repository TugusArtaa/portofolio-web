import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const certificates = await prisma.certificate.findMany({
    orderBy: { issueDate: "desc" },
  });
  return NextResponse.json(certificates);
}

export async function POST(req: Request) {
  const body = await req.json();
  const { id, title, issuer, issueDate, expireDate, image, userId } = body;
  if (!id || !title || !issuer || !issueDate) {
    return NextResponse.json(
      { message: "Field 'id', 'title', 'issuer', dan 'issueDate' wajib diisi" },
      { status: 400 }
    );
  }
  const cert = await prisma.certificate.create({
    data: {
      id,
      title,
      issuer,
      issueDate: new Date(issueDate),
      expireDate: expireDate ? new Date(expireDate) : null,
      image,
      userId,
    },
  });
  return NextResponse.json(cert, { status: 201 });
}
