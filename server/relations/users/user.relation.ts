import { User, UsersFiles } from "~/server/models/users/index";

const initUserRelations = () => {
  User.hasOne(UsersFiles, {
    foreignKey: "userId",
    as: "image",
  });

  UsersFiles.belongsTo(User, {
    foreignKey: "userId",
    as: "user",
  });
};

export { initUserRelations };
