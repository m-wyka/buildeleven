import bcrypt from "bcryptjs";
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../utils/db.instance";
import type { UserAttributes, UserCreationAttributes } from "~/types/user";

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare nickname: string;
  declare email: string;
  declare password: string;
  declare emailVerified: boolean;
  declare createdAt: string;
  declare updatedAt: string;
  declare imageId: number | null;

  public validatePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nickname: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    imageId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
  }
);

export { User };
