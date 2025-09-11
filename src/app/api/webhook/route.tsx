import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<Response> {
  // Verification (when Meta calls webhook setup)
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.META_VERIFY_TOKEN) {
    return new Response(challenge ?? "", { status: 200 });
  } else {
    return new Response("Forbidden", { status: 403 });
  }
}

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    console.log("Webhook event:", JSON.stringify(body, null, 2));

    // Extract incoming message
    const entry = body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (entry?.text?.body?.toLowerCase() === "verify") {
      await fetch(
        `https://graph.facebook.com/v17.0/${process.env.PHONE_NUMBER_ID}/messages`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.META_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: entry.from, // User's WhatsApp number
            text: { body: "✅ Welcome! You are verified." },
          }),
        }
      );
    }

    return NextResponse.json({ status: "ok" });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Webhook handling failed" },
      { status: 500 }
    );
  }
}
