import { MigrationBuilder } from "node-pg-migrate";

export const shorthands: { [key: string]: unknown } | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.dropColumn("board", "owner");

  pgm.addColumn("board", {
    owner: {
      type: "varchar(100)",
      notNull: true,
      references: '"user"',
      onDelete: "CASCADE",
    },
  });

  pgm.createTable("board_collaborators", {
    clerkId: {
      type: "varchar(100)",
      notNull: true,
      references: '"user"',
      onDelete: "CASCADE",
    },
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
  pgm.addConstraint("board_collaborators", "collaborators_pk", {
    primaryKey: ["clerkId", "boardId"],
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropColumn("board", "owner");
  pgm.addColumn("board", {
    owner: { type: "varchar(100)", notNull: true },
  });
  pgm.dropTable("board_collaborators");
  pgm.dropConstraint("board", "board_owner");
}
