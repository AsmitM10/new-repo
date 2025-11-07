import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ⚠️ must be service role key
);

export async function POST(req: Request) {
  try {
    const { username, whatsapp_no, referrer } = await req.json();

    // Validation
    if (!username || !whatsapp_no) {
      return NextResponse.json({ error: "Name and WhatsApp number are required" }, { status: 400 });
    }

    // Validate WhatsApp number format (Indian 10-digit)
    const cleanNumber = whatsapp_no.replace(/\D/g, '');
    if (cleanNumber.length !== 10 || !/^[6-9]\d{9}$/.test(cleanNumber)) {
      return NextResponse.json({ error: "Invalid WhatsApp number format" }, { status: 400 });
    }

    // Check if user already exists with this WhatsApp number
    const { data: existingUser, error: checkError } = await supabase
      .from("user4")
      .select("*")
      .eq("whatsapp_no", cleanNumber)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 means no rows found
      console.error("Error checking existing user:", checkError);
      return NextResponse.json({ error: "Database error while checking user" }, { status: 500 });
    }

    if (existingUser) {
      return NextResponse.json({ error: "User with this WhatsApp number already exists" }, { status: 409 });
    }

    // Calculate last_date (7 days from registration)
    const registrationDate = new Date();
    const lastDate = new Date(registrationDate);
    lastDate.setDate(lastDate.getDate() + 7);

    // Insert new user
    const insertData: any = {
      username: username.trim(),
      whatsapp_no: cleanNumber,
      registration_date: registrationDate.toISOString(),
      last_date: lastDate.toISOString(),
      verified: false,
    };

    // Add referrer if provided (assuming you have a referrer column)
    if (referrer) {
      insertData.referrer = referrer;
    }

    const { data, error } = await supabase
      .from("user4")
      .insert([insertData])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ 
      success: true, 
      user: data,
      message: "Registration successful" 
    });

  } catch (err: any) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}