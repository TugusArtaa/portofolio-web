import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  // Ganti 'tool' dengan nama model/table sesuai skema Prisma Anda
  const tools = await prisma.tool.findMany();
  return NextResponse.json(tools, {
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
