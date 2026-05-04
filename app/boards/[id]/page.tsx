import { getBoard } from "@/app/actions/board";
import { notFound } from "next/navigation";

export default async function Board({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = await params;
  const board = await getBoard(id);
  if (!board) {
    notFound();
    return;
  }
  return (
    <div>
      <div>{board.title}</div>
      <div>{board.owner}</div>
    </div>
  );
}
