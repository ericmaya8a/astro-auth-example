import type { APIRoute } from "astro";
import { strings } from "../../../constants";
import { deleteCookies } from "../../../utils";

export const GET: APIRoute = async ({ cookies, redirect }) => {
  deleteCookies(cookies, [
    strings.cookies.access.name,
    strings.cookies.refresh.name,
  ]);
  return redirect(strings.routes.HOME);
};
