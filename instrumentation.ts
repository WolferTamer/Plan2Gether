import User from "./app/db/models/User";
import { clerkClient } from "@clerk/nextjs/server";

export async function register() {
  console.log("Checking for mismatched users.");

  // Example: Initializing a database connection
  if (process.env.NEXT_RUNTIME === "nodejs") {
    // Ensure this only runs in the Node.js runtime, not Edge
    const users = await User.findAll({ attributes: ["clerkId"] });
    const client = await clerkClient();
    const { data, totalCount } = await client.users.getUserList();
    if (totalCount == users.length) return;
    for (const d of data) {
      if (!users.find((e) => e.clerkId === d.id)) {
        const u = await User.create({
          clerkId: d.id,
          email: d.primaryEmailAddress!.emailAddress,
          username:
            d.username ??
            d.firstName ??
            d.primaryEmailAddress?.emailAddress ??
            "No Name",
        });
        console.log(u);
      }
    }
  }
}
