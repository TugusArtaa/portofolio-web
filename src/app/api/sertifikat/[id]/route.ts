import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Params = { params: { id: string } };

// Handler GET: Mengambil data sertifikat berdasarkan id
export async function GET(_: Request, { params }: Params) {
  const cert = await prisma.certificate.findUnique({
    where: { id: params.id },
  });
  if (!cert) {
    return NextResponse.json(
      { message: "Certificate not found" },
      { status: 404 }
    );
  }
  return NextResponse.json(cert);
}

// Handler PUT: Memperbarui data sertifikat berdasarkan id
export async function PUT(req: Request, { params }: Params) {
  const body = await req.json();
  const { title, issuer, issueDate, expireDate, image, userId } = body;
  // Validasi: title, issuer, dan issueDate wajib diisi
  if (!title || !issuer || !issueDate) {
    return NextResponse.json(
      { message: "Field 'title', 'issuer', dan 'issueDate' wajib diisi" },
      { status: 400 }
    );
  }
  const updated = await prisma.certificate.update({
    where: { id: params.id },
    data: {
      title,
      issuer,
      issueDate: new Date(issueDate),
      expireDate: expireDate ? new Date(expireDate) : null,
      image,
      userId,
      updatedAt: new Date(),
    },
  });
  return NextResponse.json(updated);
}

// Handler DELETE: Menghapus data sertifikat berdasarkan id
export async function DELETE(_: Request, { params }: Params) {
  await prisma.certificate.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Deleted" });
}
