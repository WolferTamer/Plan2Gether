"use server";

import { auth } from "@clerk/nextjs/server";
import { Board } from "../db";
import Link from "next/link";
import BoardCard from "./BoardCard";
import { User } from "../db";
import { notFound } from "next/navigation";

export default async function BoardList({ className }: { className?: string }) {
  const { userId, redirectToSignIn } = await auth();
  if (!userId) {
    redirectToSignIn();
    return <div></div>;
  }
  const user = await User.findOne({
    where: {
      clerkId: userId,
    },
    include: [User.associations.ownedBoards],
  });
  if (!user) notFound();
  const Boards = user.ownedBoards;
  if (!Boards) notFound();
  return (
    <div className={"grid grid-cols-2 " + className}>
      <h1 className="col-span-2 text-3xl mb-5 font-bold">Boards!</h1>
      {Boards.map((e) => {
        return (
          <BoardCard
            title={e.title}
            owner={user.username}
            key={e.id}
            collaborators={e.collaborators?.map((e) => e.username)}
            lastUpdate={e.updatedAt}
            id={e.id}
            className="w-75"
          />
        );
      })}
    </div>
  );
}
