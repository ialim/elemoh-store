import { FormControl, Input } from "@chakra-ui/react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import { auth } from "../lib/mutations";
import { RevampInput } from "./revamp-input";

interface IFormInput {
  username: string;
  password: string;
}

const SigninForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit } = useForm<IFormInput>();
  const router = useRouter();

  const onSubmit = async (data: IFormInput) => {
    setIsLoading(true);
    const result = await auth("signin", data);
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
            <RevampInput field={field} name="Username" type="text" />
          )}
          name="username"
          control={control}
          defaultValue=""
          rules={{ required: true }}
        />
      </FormControl>
      <FormControl mb="3">
        <Controller
          render={({ field }) => (
            <RevampInput field={field} name="Password" type="password" />
          )}
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: true }}
        />
      </FormControl>

      <Input
        mt="3"
        color="white"
        type="submit"
        bg="purple.500"
        border="none"
        isDisabled={isLoading}
      />
    </form>
  );
};

export default SigninForm;
