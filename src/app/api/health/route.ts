import { NextResponse } from "next/server";

import { getPublicHealthMetadata } from "@/lib/reliability";

export const dynamic = "force-dynamic";

export function GET() {
  return NextResponse.json(
    {
      status: "ok",
      ...getPublicHealthMetadata(),
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
