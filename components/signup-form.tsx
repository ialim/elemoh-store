import { FormControl, Input } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import ReactSelect from "react-select";
import { auth } from "../lib/mutations";
import { RevampInput } from "./revamp-input";

interface Role {
  name: string;
  code: string;
}

interface IFormInput {
  username: string;
  email: string;
  phoneNumber: string;
  role: Role;
  password: string;
  confirmPassword: string;
}

const options: Role[] = [
  { code: "customer", name: "Customer" },
  { code: "staff", name: "Staff" },
  { code: "delivery", name: "Dispatch" },
];

export const SignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, watch } = useForm<IFormInput>();
  const password = useRef({});
  const router = useRouter();
  password.current = watch("password", "");

  const onSubmit = async (data: IFormInput) => {
    setIsLoading(true);
    const revData = {
      role: data.role.code,
      username: data.username,
      phoneNumber: data.phoneNumber,
      email: data.email,
      password: data.password,
    };

    const result = await auth("signup", revData);
    setIsLoading(false);
    if (result?.error) {
      alert(JSON.stringify(result.error));
      return;
    }
    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl mb="5">
        <Controller
          render={({ field }) => (
            <RevampInput field={field} name="Username *" type="text" />
          )}
          name="username"
          control={control}
          defaultValue=""
          rules={{ required: true }}
        />
      </FormControl>

      <FormControl mb="5">
        <Controller
          render={({ field }) => (
            <RevampInput field={field} name="Email *" type="email" />
          )}
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: true }}
        />
      </FormControl>

      <FormControl mb="5">
        <Controller
          render={({ field }) => (
            <RevampInput field={field} name="Phone Number *" type="tel" />
          )}
          name="phoneNumber"
          control={control}
          defaultValue=""
          rules={{ required: true }}
        />
      </FormControl>

      <FormControl mb="5">
        <Controller
          render={({ field }) => (
            <ReactSelect
              value={field.value}
              onChange={field.onChange}
              ref={field.ref}
              options={options}
              getOptionLabel={(role: Role) => role.name}
              getOptionValue={(role: Role) => role.code}
              placeholder="Select Role *"
            />
          )}
          name="role"
          control={control}
          defaultValue={options[0]}
          rules={{ required: true }}
        />
      </FormControl>

      <FormControl mb="3">
        <Controller
          render={({ field }) => (
            <RevampInput field={field} name="Password *" type="password" />
          )}
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          }}
        />
      </FormControl>

      <FormControl mb="3">
        <Controller
          render={({ field }) => (
            <RevampInput
              field={field}
              name="Confirm Password *"
              type="password"
            />
          )}
          name="confirmPassword"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            validate: (value) =>
              value === password.current || "Password does not match",
          }}
        />
      </FormControl>

      <Input
        mt="5"
        color="white"
        type="submit"
        bg="purple.500"
        border="none"
        isDisabled={isLoading}
      />
    </form>
  );
};
