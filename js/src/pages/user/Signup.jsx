import Button from "@components/Button";
import Submit from "@components/Submit";
import { useState } from "react";
import { useForm } from "react-hook-form";
import api from "../../modules/api";

function Signup() {
  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm();
  const [isEmailChecked, setIsEmailChecked] = useState(false);

  // 이메일 중복 체크
  const checkEmail = async (email) => {
    const queryString = new URLSearchParams({ email }).toString();
    const reqUrl = `/users/email?${queryString}`;

    const result = await api.get(reqUrl);
    if (result.ok === 1) {
      console.log("email OK");
      setIsEmailChecked(true);
      return true;
    } else {
      console.log("email NOT OK");
      setError(
        "email",
        { type: "value", message: "이미 사용중인 이메일입니다." },
        { shouldFocus: true }
      );
      return false;
    }
  };

  // 프로필 이미지 파일 업로드
  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("attach", imageFile);

    try {
      const result = await api.post("/files", formData);
      if (result.ok === 1) {
        return result.item[0];
      } else {
        alert(result.message);
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 회원가입
  const signUp = async (body) => {
    console.log("signUp");
    console.log(body);
    try {
      const result = await api.post("/users", JSON.stringify(body), {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (result.ok === 1) {
        alert(`${result.item.name}님, 회원가입이 완료되었습니다.`);
        return result.item;
      } else {
        alert(result.message);
        return false;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (data) => {
    console.log("submit");
    console.log(data);

    const bodyData = {
      email: data.email,
      password: data.password,
      name: data.name,
      type: "user",
      profileImage: null,
    };

    // 이메일 중복확인 안됐을 경우
    if (!isEmailChecked) {
      console.log("중복 확인 안됨, 이메일 중복확인 실행");
      const checked = checkEmail(data.email);
      if (!checked) {
        return;
      }
    }

    if (data.image.length > 0) {
      bodyData.profileImage = await uploadImage(data.image[0]);
    }

    await signUp(bodyData);
    history.back();
  };

  const regExEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-z]{2,8}$/;
  const regExPassword =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z\d!@#$%^&*(),.?":{}|<>]{8,16}$/;

  return (
    <main className="min-w-80 flex-grow flex items-center justify-center">
      <div className="p-8  border border-gray-200 rounded-lg w-full max-w-md dark:bg-gray-600 dark:border-0">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
            회원 가입
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="name"
            >
              이름
            </label>
            <input
              {...register("name", {
                required: "이름을 입력해 주세요.",
                maxLength: 20,
              })}
              type="text"
              id="name"
              placeholder="이름을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="name"
            />
            {/* 입력값 검증 에러 출력 */}
            {errors.name && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {errors.name?.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="email"
            >
              이메일
            </label>
            <input
              {...register("email", {
                required: "이메일을 입력해 주세요.",
                pattern: {
                  value: regExEmail,
                  message: "이메일 형식이 잘못되었습니다.",
                },
                validate: (value) => checkEmail(value),
              })}
              onChange={() => {
                setIsEmailChecked(false);
              }}
              type="email"
              id="email"
              placeholder="이메일을 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="email"
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
              {...register("password", {
                required: "비밀번호를 입력해 주세요.",
                pattern: {
                  value: regExPassword,
                  message:
                    "비밀번호는 영문자, 숫자, 특수문자를 포함한 최소 8글자여야 합니다.",
                },
              })}
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-orange-400 dark:bg-gray-700"
              name="password"
            />
            {/* 입력값 검증 에러 출력 */}
            {errors.password && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {errors.password?.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 dark:text-gray-200 mb-2"
              htmlFor="profileImage"
            >
              프로필 이미지
            </label>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              placeholder="이미지를 선택하세요"
              className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700"
              name="profileImage"
              {...register("image")}
            />
          </div>

          <div className="mt-10 flex justify-center items-center">
            <Submit>회원가입</Submit>
            <Button type="reset" bgColor="gray" onClick={() => history.back()}>
              취소
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Signup;
