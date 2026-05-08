import { getBoard } from "@/app/actions/board";
import { notFound } from "next/navigation";

export default async function Board({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const board = await getBoard(id);

  if (!board || !board.ownerObject) {
    notFound();
  }
  return (
    <div className="relative">
      <div className="absolute top-0 left-0 mt-5 ml-5 opacity-50">
        {board.title}
      </div>
      <div className="absolute bottom-0 left-0 mb-5 ml-5 opacity-50">
        {"Created By: " + board.ownerObject.username}
      </div>
    </div>
  );
}
