import { NextResponse } from "next/server";
import { kitEmailSchema } from "@/lib/schemas";

// Soft-fail endpoint: records email signups for kit downloads.
// In production this would append to a Supabase table or send to a mailing list.
// Here we log and always return ok so the download never blocks.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = kitEmailSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "Invalid email" },
        { status: 400 }
      );
    }

    // TODO: persist to Supabase `kit_signups` table when env vars are present.
    console.log("[kit-signup]", parsed.data.email);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[kit-signup] error", err);
    // Soft-fail — never block the download on a logging error.
    return NextResponse.json({ ok: true });
  }
}
