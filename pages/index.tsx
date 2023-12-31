import { AuthCard } from "@components/card";
import { FormButton, FormInput, FormPasswordInput } from "@components/widgets";
import { joiResolver } from "@hookform/resolvers/joi";
import { useLogin } from "@hooks/useAuth/useLogin";
import { LoginForm } from "@hooks/utils/form";
import { LoginSchema } from "@hooks/utils/validation";
import { UserPayload } from "@utils/default";
import { NextPage } from "next";
import Link from "next/link";
import { useForm } from "react-hook-form";

const Login: NextPage = () => {
  const { loading, login } = useLogin();

  const formHook = useForm<UserPayload>({
    mode: "onChange",
    resolver: joiResolver(LoginSchema),
  });
  return (
    <>
      <div className={"h-screen flex justify-center items-center container"}>
        <div className={"w-[90%] sm:w-[90%] md:w-[50%] lg:w-[35%]"}>
          <AuthCard title={"Login"}>
            <div>
              <p>Please enter your details to sign in.</p>
              <div>
                <form
                  onSubmit={(...args) =>
                    void formHook.handleSubmit(login)(...args)
                  }
                >
                  <FormInput
                    title={LoginForm.EMAIL}
                    handler={formHook}
                    label={"Email"}
                    placeholder={"williams@gmail.com"}
                    className={"w-full mt-4"}
                  />
                  <FormPasswordInput
                    title={LoginForm.PASSWORD}
                    handler={formHook}
                    label={"Password"}
                    placeholder={"*******"}
                    className={"w-full mt-4"}
                  />
                  <FormButton loading={loading} className={"mt-4"}>
                    Login
                  </FormButton>
                </form>
              </div>
              <p className={"mt-4 text-[14px]"}>
                Don&apos;t have an account?{" "}
                <span className={"text-blue-700 underline"}>
                  <Link href={"/register"}>Register</Link>
                </span>
              </p>
            </div>
          </AuthCard>
        </div>
      </div>
    </>
  );
};

export default Login;
