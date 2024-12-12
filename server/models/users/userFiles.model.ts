import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../utils/db.instance";
import type { FileAttributes, FileCreationAttributes } from "~/types/file";

class UsersFiles extends Model<FileAttributes, FileCreationAttributes> {
  declare id: number;
  declare filename: string | null;
  declare filepath: string;
  declare mimetype: string;
  declare size: number;
  declare userId: number;
}

UsersFiles.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    filename: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    filepath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mimetype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "UsersFiles",
    tableName: "users_images",
    timestamps: false,
  }
);

export { UsersFiles };
