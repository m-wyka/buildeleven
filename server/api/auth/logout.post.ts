import { defineEventHandler } from "h3";
import Cookies from "~/enums/cookies";

export default defineEventHandler((event) => {
  event.node.res.setHeader(
    "Set-Cookie",
    `${Cookies.BEARER_TOKEN}=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Strict`
  );

  return;
});
