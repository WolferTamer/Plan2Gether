import { auth, currentUser } from "@clerk/nextjs/server";
import { Board } from "../db";

export async function createBoard(formData: FormData) {
  "use server";
  const isAuthenticated = await auth();
  console.log(isAuthenticated);
  if (!isAuthenticated) return;

  if (formData.has("title")) {
    const instance = await Board.create({
      title: formData.get("title"),
      owner: isAuthenticated.userId,
    });
    console.log(instance);
  }
}
