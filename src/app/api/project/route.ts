import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Handler GET: Mengambil semua data project, diurutkan dari terbaru
export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(projects);
}

// Handler POST: Menambah data project baru
export async function POST(req: Request) {
  const data = await req.json();

  // Validasi field wajib
  if (!data.title || !data.slug || !data.description || !data.coverImage) {
    return NextResponse.json(
      {
        message:
          "Field 'title', 'slug', 'description', dan 'coverImage' wajib diisi",
      },
      { status: 400 }
    );
  }

  const newProject = await prisma.project.create({
    data: {
      id: data.id,
      title: data.title,
      slug: data.slug,
      description: data.description,
      techStack: data.techStack ?? [],
      coverImage: data.coverImage,
      url: data.url ?? null,
      userId: data.userId ?? null,
    },
  });
  return NextResponse.json(newProject, { status: 201 });
}
