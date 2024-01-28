import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { strings } from "../../constants";
import { LoginSchema, type LoginSchemaT } from "../../schemas";
import { Input } from "./Input";

export function LoginForm() {
  const {
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
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
      return location.replace(strings.routes.DASHBOARD);
    }

    toast.error(result.message ?? "Server Error", {
      theme: "colored",
      position: "top-center",
    });
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Controller
        name="email"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            aria-label="Email"
            type="email"
            id="email"
            placeholder="Enter your Email"
            value={value}
            onChange={onChange}
            required
            errormessage={errors.email?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            aria-label="Password"
            type="password"
            id="password"
            placeholder="Enter your Password"
            value={value}
            onChange={onChange}
            required
            errormessage={errors.password?.message}
          />
        )}
      />
      <button
        className="btn btn-primary sm:w-fit"
        type="submit"
        disabled={isSubmitting}
      >
        Login
      </button>
    </form>
  );
}
