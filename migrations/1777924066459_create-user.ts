import { MigrationBuilder } from "node-pg-migrate";

export const shorthands: { [key: string]: unknown } | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("user", {
    clerkId: {
      type: "varchar(100)",
      unique: true,
      notNull: true,
      primaryKey: true,
    },
    email: {
      type: "varchar(256)",
      unique: true,
      notNull: true,
    },
    username: {
      type: "varchar(50)",
      notNull: true,
    },
    displayname: {
      type: "varchar(50)",
      notNull: false,
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
  pgm.dropTable("user");
}
