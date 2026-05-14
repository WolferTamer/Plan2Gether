import sequelize from "./sequelize";
import {
  Association,
  BelongsToManyAddAssociationMixin,
  BelongsToSetAssociationMixin,
  CreationOptional,
  DataTypes,
  ForeignKey,
  HasManyAddAssociationMixin,
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
  declare pages?: NonAttribute<Page[]>;
  declare addCollaborator: BelongsToManyAddAssociationMixin<User, string>;
  declare addPage: HasManyAddAssociationMixin<Page, number>;

  declare static associations: {
    ownerObject: Association<User, Board>;
    mtm_collaborators: Association<Board, User>;
    pages: Association<Board, Page>;
  };
}

class Page extends Model<InferAttributes<Page>, InferCreationAttributes<Page>> {
  declare id: CreationOptional<number>;
  declare boardId: ForeignKey<Board["id"]>;
  declare name: string;
  declare board: NonAttribute<Board>;
  declare plans?: NonAttribute<Plan[]>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare setBoard: BelongsToSetAssociationMixin<Board, number>;
  declare addPlan: HasManyAddAssociationMixin<Plan, number>;

  declare static associations: {
    board: Association<Page, Board>;
    plans: Association<Page, Plan>;
  };
}

class Plan extends Model<InferAttributes<Plan>, InferCreationAttributes<Plan>> {
  declare id: CreationOptional<number>;
  declare pageId: ForeignKey<Page["id"]>;
  declare title: string;
  declare description: string;
  declare url?: string;
  declare cost?: string;
  declare time?: Date;
  declare deleted: CreationOptional<boolean>;
  declare page: NonAttribute<Page>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare static associations: {
    page: Association<Plan, Page>;
  };
}

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare clerkId: string;
  declare email: string;
  declare username: string;
  declare displayname?: CreationOptional<string>;
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

Page.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
    tableName: "page",
    sequelize: sequelize,
  },
);

Plan.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cost: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    tableName: "plan",
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

Board.hasMany(Page, {
  foreignKey: "boardId",
  as: "pages",
});

Page.belongsTo(Board, {
  foreignKey: "boardId",
  as: "board",
});

Page.hasMany(Plan, {
  foreignKey: "pageId",
  as: "plans",
});

Plan.belongsTo(Page, {
  foreignKey: "pageId",
  as: "page",
});

export { Board, sequelize, User, Page, Plan };
