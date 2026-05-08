import Link from "next/link";

type BoardCardComponents = {
  title: string;
  owner: string;
  collaborators?: string[];
  lastUpdate: Date;
  id: number;
  className?: string;
  style?: "classic" | "stack" | "row";
};
export default async function BoardCard({
  title,
  collaborators,
  lastUpdate,
  owner,
  id,
  className,
  style = "classic",
}: BoardCardComponents) {
  const parentFlexClasses =
    style === "classic"
      ? "flex-row flex-wrap "
      : style === "stack"
        ? "flex-col "
        : "flex-row ";

  return (
    <Link
      href={`/boards/${id}`}
      className={
        parentFlexClasses +
        "flex @container items-start justify-between p-4 rounded-md border border-stone-600 shadow-stone-900 shadow-md hover:bg-stone-800 " +
        (className ?? "")
      }
    >
      <h2
        className={
          "text-[clamp(1rem,15cqw,3rem)] font-semibold h-auto " +
          (style === "classic" ? "w-full" : "")
        }
      >
        {title}
      </h2>
      <p className="text-sm webkit-box line-clamp-3 self-end ">
        Collaborators:{" "}
        <span className="text-stone-600">
          {owner + (collaborators ? ", " + collaborators.join(", ") : "")}
        </span>
      </p>
      <p className="text-sm text-stone-600 text-right self-end basis-[40%]">
        Last Changed{" "}
        {`${lastUpdate.getMonth()}/${lastUpdate.getDate()}/${lastUpdate.getFullYear() % 100}`}
      </p>
    </Link>
  );
}
