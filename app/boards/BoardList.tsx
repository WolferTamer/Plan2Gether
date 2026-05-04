"use server";

import { auth } from "@clerk/nextjs/server";
import { Board } from "../db";
import Link from "next/link";

export default async function BoardList() {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) {
    redirectToSignIn();
    return <div></div>;
  }
  const Boards = await Board.findAll({
    where: {
      owner: userId,
    },
  });
  return (
    <div>
      <h1>Boards!</h1>
      {Boards.map((e) => {
        return (
          <div key={e.id}>
            <Link href={"/boards/" + e.id}>{e.title}</Link>
          </div>
        );
      })}
    </div>
  );
}
