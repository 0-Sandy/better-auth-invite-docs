import { getRSS } from "@/lib/rss";
import { NextResponse } from "next/server";

export const revalidate = false;

export function GET() {
  return new NextResponse(getRSS());
}
