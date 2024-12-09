import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../config/database";
import bcrypt from "bcryptjs";
import { UserAttributes, UserCreationAttributes } from "~/server/types/user";

class User extends Model<UserAttributes, UserCreationAttributes> {
  declare id: number;
  declare nickname: string;
  declare email: string;
  declare password: string;
  declare emailVerified: boolean;
  declare createdAt: string;
  declare updatedAt: string;

  // Metoda do porównywania hasła
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
  },
  {
    sequelize,
    tableName: "users",
  }
);

User.addHook("beforeSave", (user: User) => {
  if (user.changed("password")) {
    user.password = bcrypt.hashSync(user.password, 10);
  }
});

const getUsersModel = async () => {
  try {
    const users = await User.findAll({ offset: 0, limit: 10 });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export { User, getUsersModel };
