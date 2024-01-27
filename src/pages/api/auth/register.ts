import type { APIRoute } from "astro";
import { RegisterSchema, type RegisterSchemaT } from "../../../schemas";
import { createUser, getUserByEmail } from "../../../server/modules";
import { hashPassword } from "../../../utils";

export const POST: APIRoute = async ({ request }) => {
  try {
    const body: RegisterSchemaT = await request.json();
    const validation = RegisterSchema.safeParse(body);

    if (validation.success) {
      const { name, email, password } = body;
      const lowerCaseEmail = email.toLowerCase();
      // validate if user exists
      const user = await getUserByEmail(lowerCaseEmail);
      if (user) {
        return Response.json(
          {
            success: false,
            message: `User: ${lowerCaseEmail}.\nAlready exists.`,
          },
          { status: 400 }
        );
      }

      // create user
      const hashedPassword = await hashPassword(password);
      await createUser({
        name,
        email: lowerCaseEmail,
        password: hashedPassword,
      });

      return Response.json(
        {
          success: true,
          message: `${lowerCaseEmail} was successfully registered.`,
        },
        { status: 201 }
      );
    }

    return Response.json(
      { success: false, message: "Invalid data" },
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
