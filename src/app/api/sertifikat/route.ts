import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";

// Handler GET: Mengambil semua data sertifikat, diurutkan berdasarkan tanggal terbit terbaru
export async function GET() {
  try {
    await requireAuth();
    const certificates = await prisma.certificate.findMany({
      orderBy: { issueDate: "desc" },
    });
    return NextResponse.json(certificates);
  } catch {
    return NextResponse.json(
      { message: "Unauthorized, Jangan ya dek ya!" },
      { status: 401 }
    );
  }
}

// Handler POST: Menambah data sertifikat baru
export async function POST(req: Request) {
  try {
    await requireAuth();
    const body = await req.json();
    const { id, title, issuer, issueDate, expireDate, image, userId } = body;
    // Validasi: id, title, issuer, dan issueDate wajib diisi
    if (!id || !title || !issuer || !issueDate) {
      return NextResponse.json(
        {
          message: "Field 'id', 'title', 'issuer', dan 'issueDate' wajib diisi",
        },
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
  } catch {
    return NextResponse.json(
      { message: "Unauthorized, Jangan ya dek ya!" },
      { status: 401 }
    );
  }
}
