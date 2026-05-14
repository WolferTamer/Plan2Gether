import { MigrationBuilder } from "node-pg-migrate";

export const shorthands: { [key: string]: unknown } | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("page", {
    id: "id",
    name: { type: "varchar(100)", notNull: true },
    boardId: {
      type: "integer",
      notNull: true,
      references: '"board"',
      onDelete: "CASCADE",
    },
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

  pgm.createTable("plan", {
    id: "id",
    title: { type: "varchar(100)", notNull: true },
    description: {
      type: "varchar(1000)",
      notNull: true,
    },
    pageId: {
      type: "integer",
      references: '"page"',
      notNull: true,
      onDelete: "CASCADE",
    },
    url: {
      type: "varchar(1000)",
      notNull: false,
    },
    cost: {
      type: "varchar(50)",
      notNull: false,
    },
    time: {
      type: "timestamp",
      notNull: false,
    },
    deleted: {
      type: "boolean",
      notNull: true,
      default: false,
    },
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
  pgm.dropTable("page");
  pgm.dropTable("plan");
}
