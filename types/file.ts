import type { Optional } from "sequelize";

export interface FileAttributes {
  id: number;
  filename: string | null;
  filepath: string;
  mimetype: string | null;
  size: number;
  userId: number;
}

export interface FileCreationAttributes
  extends Optional<FileAttributes, "id"> {}
