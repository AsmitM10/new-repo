// import { NextResponse } from "next/server";
// import { createSupabaseServerClient } from "@/lib/supabase/server";

// export async function POST(req: Request) {
//   try {
//     // ✅ Initialize Supabase server client inside handler
//     const supabase = createSupabaseServerClient();

//     const { username, whatsapp_no, referrer } = await req.json();

//     // Validation
//     if (!username || !whatsapp_no) {
//       return NextResponse.json(
//         { error: "Name and WhatsApp number are required" },
//         { status: 400 }
//       );
//     }

//     // Validate WhatsApp number format (Indian 10-digit)
//     const cleanNumber = whatsapp_no.replace(/\D/g, "");
//     if (cleanNumber.length !== 10 || !/^[6-9]\d{9}$/.test(cleanNumber)) {
//       return NextResponse.json(
//         { error: "Invalid WhatsApp number format" },
//         { status: 400 }
//       );
//     }

//     // Check if user already exists
//     const { data: existingUser, error: checkError } = await supabase
//       .from("user4")
//       .select("*")
//       .eq("whatsapp_no", cleanNumber)
//       .single();

//     if (checkError && checkError.code !== "PGRST116") {
//       console.error("Error checking existing user:", checkError);
//       return NextResponse.json(
//         { error: "Database error while checking user" },
//         { status: 500 }
//       );
//     }

//     if (existingUser) {
//       return NextResponse.json(
//         { error: "User with this WhatsApp number already exists" },
//         { status: 409 }
//       );
//     }

//     // Calculate last_date (7 days from registration)
//     const registrationDate = new Date();
//     const lastDate = new Date(registrationDate);
//     lastDate.setDate(lastDate.getDate() + 7);

//     // Prepare insert data
//     const insertData: any = {
//       username: username.trim(),
//       whatsapp_no: cleanNumber,
//       registration_date: registrationDate.toISOString(),
//       last_date: lastDate.toISOString(),
//       verified: false,
//       ...(referrer && { referrer }),
//     };

//     // Insert new user
//     const { data, error } = await supabase
//       .from("user4")
//       .insert([insertData])
//       .select()
//       .single();

//     if (error) {
//       console.error("Supabase insert error:", error);
//       return NextResponse.json({ error: error.message }, { status: 400 });
//     }

//     return NextResponse.json({
//       success: true,
//       user: data,
//       message: "Registration successful",
//     });

//   } catch (err: any) {
//     console.error("API error:", err);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const { username, whatsapp_no } = await req.json()

  const slug =
    username.replace(/\s+/g, "_").toLowerCase() +
    "_" +
    Date.now()

  const { error } = await supabase.from("user4").insert({
    username,
    whatsapp_no,
    userpage_slug: slug,
    verified: false,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ slug })
}
