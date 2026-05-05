import User from "@/app/db/models/User";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`,
    );
    if (eventType === "user.created" || eventType === "user.updated") {
      const email = evt.data.email_addresses.find(
        (e) => e.id === evt.data.primary_email_address_id,
      );
      const username =
        evt.data.username ??
        evt.data.first_name ??
        email?.email_address ??
        "Default Name";
      const clerkId = evt.data.id;
      if (!email) {
        return new Response("No email associated", { status: 400 });
      }
      const [newUser, created] = await User.findOrCreate({
        where: {
          email: email.email_address,
        },
        defaults: {
          clerkId: clerkId,
          email: email.email_address,
          username: username,
        },
      });
      if (eventType === "user.updated") {
        newUser.email = email.email_address;
        newUser.username = username;
        newUser.save();
      }
      return new Response("User Object Created", { status: 200 });
    } else if (eventType === "user.deleted") {
      const deleted = await User.destroy({
        where: {
          clerkId: evt.data.id!,
        },
      });
      if (deleted >= 1) {
        return new Response("User Deleted", { status: 200 });
      } else {
        return new Response("Unable to delete User", { status: 400 });
      }
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}

export async function GET() {
  return Response.json({ message: "Hello World!" });
}
