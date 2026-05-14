import { Sequelize } from "sequelize";
import pg from "pg";
import * as fs from "fs";
import path from "path";
if (!process.env.DATABASE_URL) {
  throw Error("Database URI not provided");
}
const logStream = fs.createWriteStream(
  path.join(process.cwd(), "database.log"),
  {
    flags: "a",
  },
);

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
  logging:
    process.env.NODE_ENV === "development"
      ? true
      : (msg) => logStream.write(`${new Date().toISOString()} - ${msg}\n`),
});
export default sequelize;
