import fs from "fs";
import path from "path";
import formidable from "formidable";
import auth from "~/server/utils/auth";
import { UsersFiles } from "~/server/models/users/userFiles.model";
import { User } from "~/server/models/users/user.model";
import { CustomError } from "~/types/api";

export default defineEventHandler({
  onRequest: [auth],
  handler: async (event) => {
    const { userId } = event.context;

    const form = formidable({
      multiples: false,
      uploadDir: "./public/uploads",
      keepExtensions: true,
    });

    return new Promise((resolve, reject) => {
      form.parse(event.node.req, async (err, fields, files) => {
        if (err) {
          reject(
            createError({
              statusCode: 500,
              message: "Błąd podczas przesyłania pliku.",
            })
          );
          return;
        }

        const uploadedFile = Array.isArray(files.file)
          ? files.file[0]
          : files.file;

        if (!uploadedFile) {
          reject(
            createError({
              statusCode: 400,
              statusMessage: "Nie znaleziono pliku w żądaniu.",
            })
          );
          return;
        }

        if (!userId) {
          throw createError({
            statusCode: 400,
            statusMessage: "Brak identyfikatora użytkownika w żądaniu.",
          });
        }

        try {
          const existingFile = await UsersFiles.findOne({ where: { userId } });

          if (existingFile) {
            await User.update({ imageId: null }, { where: { id: userId } });
            await existingFile.destroy();
          }

          const file = uploadedFile as formidable.File;

          const savedFile = await UsersFiles.create({
            filename: file.originalFilename,
            filepath: file.filepath,
            mimetype: file.mimetype,
            size: file.size,
            userId: userId,
          });

          await User.update(
            { imageId: savedFile.id },
            { where: { id: userId } }
          );

          resolve({
            statusCode: 200,
            message: "Plik przesłany pomyślnie.",
          });
        } catch (error) {
          const err = error as CustomError;
          reject(
            createError({
              statusCode: err.statusCode || 500,
              message: err.message,
            })
          );
        }
      });
    });
  },
});
