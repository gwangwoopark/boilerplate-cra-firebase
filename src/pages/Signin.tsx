import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import Title from "../components/Title";
import Input from "../components/Input";
import { useAuthStore } from "../store/AuthStore";

const schema = Yup.object()
  .shape({
    email: Yup.string()
      .required("이메일 입력은 필수입니다.")
      .email("유효하지 않은 이메일입니다."),
    password: Yup.string().required("비밀번호 입력은 필수입니다."),
  })
  .required();

type FormData = Yup.InferType<typeof schema>;

function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const { user, signin } = useAuthStore();
  const navigate = useNavigate();

  const onValid = async (data: FormData) => {
    signin(data.email, data.password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setError(
          "email",
          {
            type: "custom",
            message: "이메일 혹은 비밀번호가 일치하지 않습니다.",
          },
          { shouldFocus: true }
        );
        setError(
          "password",
          {
            type: "custom",
            message: "이메일 혹은 비밀번호가 일치하지 않습니다.",
          },
          { shouldFocus: true }
        );
      });
  };

  return (
    <>
      <Title subTitle={"로그인"} />

      <div className="flex flex-col min-h-screen justify-start sm:justify-center px-8 bg-white sm:bg-sd-gray-light">
        <div className="sm:mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="sm:bg-white px-4 py-4 sm:py-8 sm:shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-2 sm:space-y-4"
              onSubmit={handleSubmit(onValid)}
            >
              <Input
                title="이메일"
                type="email"
                fieldError={errors.email}
                registeredData={register("email")}
              />

              <Input
                title="비밀번호"
                type="password"
                fieldError={errors.password}
                registeredData={register("password")}
              />

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6 sm:mt-8"
                >
                  로그인
                </button>
              </div>
            </form>
            <div className="mt-4 flex justify-center text-xs sm:text-sm text-gray-400 font-medium">
              아직 회원이 아니신가요?
              <NavLink
                to="/signup"
                className="ml-1 underline underline-offset-2 text-gray-500 font-bold"
              >
                회원가입
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signin;
