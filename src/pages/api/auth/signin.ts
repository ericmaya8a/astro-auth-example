import type { APIRoute } from "astro";
import { strings } from "../../../constants";
import { getUserByEmail } from "../../../server/modules";
import { comparePassword, createCookie } from "../../../utils";

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();

  if (!email || !password)
    return new Response("Email and password are required", { status: 500 });

  // find user in DB
  const user = await getUserByEmail(email);
  if (!user) {
    return new Response("Invalid username", {
      status: 400,
    });
  }

  // validate password
  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return new Response("Invalid password", { status: 400 });
  }

  // create JWTs
  createCookie({
    cookies,
    expiresIn: strings.expiresIn.short,
    name: strings.cookies.access.name,
    secret: strings.cookies.access.secret,
    username: user.email,
  });
  createCookie({
    cookies,
    expiresIn: strings.expiresIn.long,
    name: strings.cookies.refresh.name,
    secret: strings.cookies.refresh.secret,
    username: user.email,
  });

  return redirect(strings.routes.DASHBOARD);
};
