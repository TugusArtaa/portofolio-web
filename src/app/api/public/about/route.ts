import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  // Ganti 'about' dengan nama model/table sesuai skema Prisma Anda
  const about = await prisma.about.findMany();
  return NextResponse.json(about, {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
}

// Tolak method selain GET
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
