import BoardList from "./BoardList";

export default async function Boards() {
  return (
    <div className="flex justify-center items-start">
      <BoardList className="max-w-lg md:max-w-2xl lg:max-w-4xl" />
    </div>
  );
}
