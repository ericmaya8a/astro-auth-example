import type { APIRoute } from "astro";
import { strings } from "../../../constants";
import { LoginSchema, type LoginSchemaT } from "../../../schemas";
import { getUserByEmail } from "../../../server/modules";
import { comparePassword, createCookie } from "../../../utils";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const body: LoginSchemaT = await request.json();
    const result = LoginSchema.safeParse(body);

    if (result.success) {
      const { email, password } = body;
      const lowerCaseEmail = email.toLowerCase();
      // find user in DB
      const user = await getUserByEmail(lowerCaseEmail);
      if (!user) {
        return Response.json(
          {
            success: false,
            message: "Invalid username or password",
          },
          { status: 400 }
        );
      }
      // validate password
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return Response.json(
          {
            success: false,
            message: "Invalid username or password",
          },
          { status: 400 }
        );
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

      return Response.json({
        success: true,
      });
    }

    return Response.json(
      {
        success: false,
        message: "Invalid data",
      },
      { status: 400 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "An error occurred. Please try again later",
      },
      { status: 500 }
    );
  }
};
