import { parse } from "cookie";
import axios from "axios";
import { API_HOST } from "../constants";

export const redirectHome = (ctx) => {
  ctx.res.statusCode = 302;
  ctx.res.setHeader("Location", "/"); // Replace <link> with your url link
  return { props: {} };
};

export async function isAuthenticated(ctx) {
  const cookies = parse(ctx.req.headers.cookie || "");

  if (!cookies.refresh_token_cookie) {
    return false;
  }

  if (!cookies.access_token_cookie) {
    try {
      const res = await axios.post(API_HOST + "/auth/refresh", null, {
        headers: { Cookie: ctx.req.headers.cookie },
      });
      ctx.res.setHeader("set-cookie", res.headers["set-cookie"]);
      return true;
    } catch (e) {
      return false;
    }
  }
  return true;
}
