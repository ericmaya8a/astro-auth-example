import type { APIRoute } from "astro";
import { strings } from "../../../constants";
import { createCookie } from "../../../utils";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password)
    return new Response("Email and password are required", { status: 500 });

  // find user in DB
  const username = "eric@gmail.com";

  // create JWTs
  createCookie({
    cookies,
    expiresIn: strings.expiresIn.short,
    name: strings.cookies.access.name,
    secret: strings.cookies.access.secret,
    username,
  });
  createCookie({
    cookies,
    expiresIn: strings.expiresIn.long,
    name: strings.cookies.refresh.name,
    secret: strings.cookies.refresh.secret,
    username,
  });

  return redirect(strings.routes.DASHBOARD);
};
