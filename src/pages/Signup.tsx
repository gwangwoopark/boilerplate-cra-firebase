import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, NavLink } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Title from "../components/Title";
import Input from "../components/Input";

const schema = Yup.object()
  .shape({
    email: Yup.string()
      .required("이메일을 입력해 주세요.")
      .email("유효하지 않은 이메일입니다."),
    displayName: Yup.string()
      .required("이름 입력은 필수입니다.")
      .matches(
        /^[a-zA-Z가-힣]{2,10}$/,
        "이름은 2-10자이며, 한글과 영문을 사용할 수 있습니다."
      ),
    password: Yup.string()
      .required("비밀번호를 입력해 주세요.")
      .matches(/^.{8,20}$/, "비밀번호는 8~20자입니다."),
    passwordConfirm: Yup.string()
      .required("비밀번호 확인을 입력해 주세요.")
      .oneOf([Yup.ref("password")], "비밀번호가 일치하지 않습니다."),
  })
  .required();

type FormData = Yup.InferType<typeof schema>;

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  const onValid = async (data: FormData) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        setError(
          "email",
          {
            type: "custom",
            message: error.message,
          },
          { shouldFocus: true }
        );
      });
  };

  return (
    <>
      <Title subTitle={"가입"} />

      <div className="flex flex-col min-h-screen justify-start sm:justify-center px-8 bg-white sm:bg-sd-gray-light">
        <div className="mt-16 sm:mt-0 sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-xl sm:text-3xl font-bold tracking-tight text-gray-900 sm:pt-4">
            회원 가입
          </h2>
        </div>

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
                title="이름"
                fieldError={errors.displayName}
                registeredData={register("displayName")}
              />

              <Input
                title="비밀번호"
                type="password"
                fieldError={errors.password}
                registeredData={register("password")}
              />

              <Input
                title="비밀번호 확인"
                type="password"
                fieldError={errors.passwordConfirm}
                registeredData={register("passwordConfirm")}
              />

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-6 sm:mt-8"
                >
                  가입 완료
                </button>
              </div>
            </form>
            <div className="mt-4 flex justify-center text-xs sm:text-sm text-gray-400 font-medium">
              이미 회원이신가요?
              <NavLink
                to="/signin"
                className="ml-1 underline underline-offset-2 text-gray-500 font-bold"
              >
                로그인
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
