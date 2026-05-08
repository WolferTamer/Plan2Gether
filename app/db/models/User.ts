import {
  Association,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";
import sequelize from "../sequelize";
import Board from "./Board";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare clerkId: string;
  declare email: string;
  declare username: string;
  declare displayname: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  /*declare boards: NonAttribute<Board[]>;

  declare static associations: {
    boards: Association<User, Board>;
  };*/
}

User.init(
  {
    clerkId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    displayname: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  { freezeTableName: true, tableName: "user", sequelize: sequelize },
);
export default User;
