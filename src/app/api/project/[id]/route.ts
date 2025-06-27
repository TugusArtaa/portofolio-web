import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
  });
  if (!project) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  return NextResponse.json(project);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
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

  const updated = await prisma.project.update({
    where: { id: params.id },
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      techStack: data.techStack,
      coverImage: data.coverImage,
      url: data.url,
    },
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  await prisma.project.delete({ where: { id: params.id } });
  return NextResponse.json({ message: "Project deleted" });
}
