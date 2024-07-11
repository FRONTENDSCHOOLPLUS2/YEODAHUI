import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import api from "@modules/api";
import Submit from "@components/Submit";
import { login } from "@store/slices/userSlice";
import { LoginForm } from "#types/form";
import { User } from "#types/user";
import { APIResponse } from "#types/api";

function Login() {
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginForm>();

  const onSubmit: SubmitHandler<LoginForm> = async (data: LoginForm) => {
    try {
      const result = await api.post<APIResponse & { item: User }>(
        "/users/login",
        JSON.stringify(data)
      );

      if (result.ok === 1) {
        // 성공: 로그인
        dispatch(login(result.item));
        history.back();
        return result.item;
      } else {
        throw result.message;
      }
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8 border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
            로그인
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              {...register("email", {
                required: { value: true, message: "이메일을 입력해 주세요." },
              })}
            />
            {/* 입력값 검증 에러 출력 */}
            {errors.email && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="password"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              {...register("password", {
                required: { value: true, message: "비밀번호를 입력해 주세요." },
              })}
            />
            {/* 입력값 검증 에러 출력 */}
            {errors.password && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {errors.password?.message}
              </p>
            )}
            <Link
              to="#"
              className="block mt-6 ml-auto text-gray-500 text-sm dark:text-gray-300 hover:underline"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </div>
          <div className="mt-10 flex justify-center items-center">
            <Submit>로그인</Submit>
            <Link
              to="/user/signup"
              className="ml-8 text-gray-800 hover:underline"
            >
              회원가입
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Login;
