import { DataTypes } from "sequelize";
import sequelize from "../sequelize";

const Board = sequelize.define(
  "board",
  {
    title: { type: DataTypes.STRING, allowNull: false },
    owner: { type: DataTypes.STRING, allowNull: false },
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  { freezeTableName: true },
);

export default Board;
