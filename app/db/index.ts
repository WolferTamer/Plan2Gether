import sequelize from "./sequelize";
import {
  Association,
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
} from "sequelize";

class Board extends Model<
  InferAttributes<Board>,
  InferCreationAttributes<Board>
> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare ownerObject?: NonAttribute<User>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare owner: ForeignKey<User["clerkId"]>;
  declare collaborators?: NonAttribute<User[]>;

  declare static associations: {
    ownerObject: Association<User, Board>;
    mtm_collaborators: Association<Board, User>;
  };
}

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare clerkId: string;
  declare email: string;
  declare username: string;
  declare displayname: CreationOptional<string>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare boards?: NonAttribute<Board[]>;
  declare ownedBoards?: NonAttribute<Board[]>;

  declare static associations: {
    boards: Association<Board, User>;
    ownedBoards: Association<Board, User>;
  };
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

Board.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
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

User.hasMany(Board, {
  sourceKey: "clerkId",
  foreignKey: "owner",
  as: "ownedBoards",
});
Board.belongsTo(User, {
  targetKey: "clerkId",
  foreignKey: "owner",
  as: "ownerObject",
});

Board.belongsToMany(User, {
  through: "board_collaborators",
  foreignKey: "boardId",
  as: "collaborators",
});
User.belongsToMany(Board, {
  through: "board_collaborators",
  foreignKey: "clerkId",
  as: "boards",
});

export { Board, sequelize, User };
