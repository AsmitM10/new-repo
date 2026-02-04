// src/app/api/verify-user/route.ts
// This endpoint is for admin to verify users when they send "verify" message

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { whatsapp_no } = await req.json();

    if (!whatsapp_no) {
      return NextResponse.json({ error: "WhatsApp number is required" }, { status: 400 });
    }

    // Clean the WhatsApp number
    const cleanNumber = whatsapp_no.replace(/\D/g, '');

    // Find and verify the user
    const { data, error } = await supabase
      .from("user4")
      .update({ 
        verified: true,
        verified_at: new Date().toISOString()
      })
      .eq("whatsapp_no", cleanNumber)
      .select()
      .single();

    if (error) {
      console.error("Verification error:", error);
      return NextResponse.json({ error: "User not found or already verified" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      user: data,
      message: "User verified successfully" 
    });

  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// GET endpoint to check user verification status
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const whatsapp_no = searchParams.get('whatsapp_no');

    if (!whatsapp_no) {
      return NextResponse.json({ error: "WhatsApp number is required" }, { status: 400 });
    }

    const cleanNumber = whatsapp_no.replace(/\D/g, '');

    const { data, error } = await supabase
      .from("user4")
      .select("*")
      .eq("whatsapp_no", cleanNumber)
      .single();

    if (error) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user: data });

  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}