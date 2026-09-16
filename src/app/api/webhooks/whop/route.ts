import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const sig = req.headers.get("whop-signature");
    const secret = process.env.WHOP_WEBHOOK_SECRET;

    if (!sig || !secret) {
      return NextResponse.json({ error: "Missing signature or secret" }, { status: 400 });
    }

    // Verify webhook signature (Whop uses sha256 HMAC)
    const expectedSig = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (sig !== expectedSig) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(body);

    // Only process successful payment or activated membership events
    if (payload.action === "membership.activated" || payload.action === "payment.succeeded") {
      // The email of the person who just paid
      const userEmail = payload.data.user?.email;

      if (userEmail) {
        // We use the service role key here to bypass RLS since this is a server-to-server call
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
        const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
        
        if (!supabaseServiceRole) {
           console.error("Missing SUPABASE_SERVICE_ROLE_KEY for webhook processing");
           return NextResponse.json({ error: "Server config error" }, { status: 500 });
        }

        const supabase = createClient(supabaseUrl, supabaseServiceRole);
        
        // Find the user's ID by their email
        const { data: users, error: userError } = await supabase.auth.admin.listUsers();
        const user = users?.users?.find(u => u.email === userEmail);

        if (userError || !user) {
          console.error("Webhook could not find user with email:", userEmail);
          return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        
        // Upgrade them to pro
        const { error } = await supabase
          .from("profiles")
          .update({ is_pro: true })
          .eq("id", user.id);

        if (error) {
          console.error("Webhook Supabase Error:", error);
          return NextResponse.json({ error: "Database error" }, { status: 500 });
        }
        
        console.log(`Successfully upgraded user ${user.id} to Pro.`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
