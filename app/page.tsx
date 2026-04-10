import Link from "next/link";
import { createBoard } from "./actions/board";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center  font-sans ">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 sm:items-start">
        <div className="flex flex-col items-center justify-between gap-10">
          <h1 className="text-5xl text-center font-extrabold">
            Choose What to Do With Plan2Gather
          </h1>
          <Link
            href="/"
            className="bg-primary-500 text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer hover:bg-primary-300 items-center flex justify-center"
          >
            Make a Plan
          </Link>
        </div>
        <form action={createBoard}>
          <input type="text" name="title" id="title" />
          <button type="submit">Thing</button>
        </form>
      </main>
    </div>
  );
}
