import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Optional,
} from "sequelize";
import sequelize from "../sequelize";

class Board extends Model<
  InferAttributes<Board>,
  InferCreationAttributes<Board>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare owner: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Board.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    owner: { type: DataTypes.STRING, allowNull: false },
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
    tableName: "board",
    sequelize: sequelize,
  },
);
/*const Board = sequelize.define(
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
);*/

export default Board;
