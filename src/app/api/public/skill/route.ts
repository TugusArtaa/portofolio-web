import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  // Ganti 'skill' dengan nama model/table sesuai skema Prisma Anda
  const skills = await prisma.skill.findMany();
  return NextResponse.json(skills, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}

// Block all non-GET methods
export function POST() {
  return new Response("Method Not Allowed", { status: 405 });
}
export function PUT() {
  return new Response("Method Not Allowed", { status: 405 });
}
export function PATCH() {
  return new Response("Method Not Allowed", { status: 405 });
}
export function DELETE() {
  return new Response("Method Not Allowed", { status: 405 });
}
