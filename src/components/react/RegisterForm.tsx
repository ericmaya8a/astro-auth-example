import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { RegisterSchema, type RegisterSchemaT } from "../../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./Input";
import { strings } from "../../constants";
import { toast, type ToastOptions } from "react-toastify";

const toastOptions: ToastOptions = {
  theme: "colored",
  position: "top-center",
};

export function RegisterForm() {
  const {
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
  } = useForm<RegisterSchemaT>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<RegisterSchemaT> = async (data) => {
    const response = await fetch(strings.api.REGISTER, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result: { success: boolean; message: string } = await response.json();

    if (result.success) {
      toast.success(result.message, toastOptions);
      return setTimeout(() => {
        location.replace(strings.routes.SIGN_IN);
      }, 3000);
    }

    toast.error(result.message, toastOptions);
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <Controller
        name="name"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Input
            aria-label="Name"
            type="text"
            id="name"
            placeholder="Enter your name"
            value={value}
            onChange={onChange}
            required
            errormessage={errors.name?.message}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field: { value, onChange } }) => (
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
        render={({ field: { value, onChange } }) => (
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
        Register
      </button>
    </form>
  );
}
