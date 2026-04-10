import { Sequelize } from "sequelize";
import pg from "pg";
if (!process.env.DATABASE_URL) {
  throw Error("Database URI not provided");
}
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectModule: pg,
});
export default sequelize;
