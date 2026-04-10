import { MigrationBuilder } from "node-pg-migrate";

export const shorthands: { [key: string]: unknown } | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("board", {
    id: "id",
    title: { type: "varchar(1000)", notNull: true },
    owner: { type: "varchar(100)", notNull: true },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    updatedAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("board");
}
