import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { strings } from "../../constants";
import { LoginSchema, type LoginSchemaT } from "../../schemas";
import { Input } from "./Input";

export function LoginForm() {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<LoginSchemaT>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginSchemaT> = async (data) => {
    const response = await fetch(strings.api.SIGN_IN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const result: { success: boolean; message?: string } =
      await response.json();

    if (result.success) {
      location.replace(strings.routes.DASHBOARD);
    }
  };

  return (
    <div className="bg-white p-8 border rounded-lg shadow-lg w-11/12 sm:w-1/2 lg:w-1/3">
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Input
          aria-label="Email"
          type="email"
          id="email"
          placeholder="Enter your Email"
          required
          {...register("email")}
          errormessage={errors.email?.message}
        />
        <Input
          aria-label="Password"
          type="password"
          id="password"
          placeholder="Enter your Password"
          required
          {...register("password")}
          errormessage={errors.password?.message}
        />
        <button
          className="btn btn-primary sm:w-fit"
          type="submit"
          disabled={isSubmitting}
        >
          Login
        </button>
      </form>
    </div>
  );
}
