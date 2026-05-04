import { auth } from "@clerk/nextjs/server";
import { Board } from "../db";

export async function createBoard(formData: FormData) {
  "use server";
  const isAuthenticated = await auth();
  console.log(isAuthenticated);
  if (!isAuthenticated.isAuthenticated) return;

  if (formData.has("title")) {
    const instance = await Board.create({
      title: formData.get("title") as string,
      owner: isAuthenticated.userId,
    });
    console.log(instance);
  }
}

export async function getBoards() {
  "use server";
  const { userId, isAuthenticated } = await auth();
  if (!isAuthenticated) return;
  const Boards = await Board.findAll({ where: { owner: userId }, raw: true });
  return Boards;
}

export async function getBoard(id: number) {
  "use server";
  const { userId, isAuthenticated } = await auth();
  if (!isAuthenticated) return;
  const board = await Board.findOne({
    where: { owner: userId, id: id },
    raw: true,
  });
  return board;
}
