import type HttpStatusCode from "~/enums/httpStatusCode";

export interface CustomError {
  statusCode?: number;
  message?: string;
}

export interface ErrorHandler {
  message: string;
  stack: string;
  statusCode: HttpStatusCode;
  statusMessage: string;
  url: string;
}
