import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  const data = await req.json();
  const newProject = await prisma.project.create({
    data: {
      title: data.title,
      slug: data.slug,
      description: data.description,
      techStack: data.techStack,
      coverImage: data.coverImage,
      url: data.url,
      userId: data.userId ?? null,
    },
  });
  return NextResponse.json(newProject);
}
