import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@components/Button";
import Theme from "@components/Theme";
import authCheck from "@modules/authCheck";
import { logout } from "@store/slices/userSlice";

function Header() {
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(authCheck());
  }, []);

  return (
    <header className="px-8 min-w-80 bg-slate-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 transition-color duration-500 ease-in-out">
      <nav className="flex flex-wrap justify-center items-center p-4 md:flex-nowrap md:justify-between">
        <div className="w-1/2 order-1 md:w-auto">
          <Link to="/" className="flex items-center gap-2">
            <img
              className="mr-3 h-6 sm:h-9"
              src="/images/favicon.svg"
              alt="로고 이미지"
            />
            <span className="text-lg font-bold">멋사컴</span>
          </Link>
        </div>
        <div className="w-auto order-2 text-base mt-4 md:mt-0">
          <ul className="flex items-center gap-6 uppercase">
            <li className="hover:text-amber-500 hover:font-semibold">
              <Link to="/info">정보공유</Link>
            </li>
            <li className="hover:text-amber-500 hover:font-semibold">
              <Link to="/free">자유게시판</Link>
            </li>
            <li className="hover:text-amber-500 a:font-semibold">
              <Link to="/qna">질문게시판</Link>
            </li>
          </ul>
        </div>

        <div className="w-1/2 order-1 flex justify-end items-center md:order-2 md:w-auto">
          {/* 로그인 후 */}
          {loggedIn && user.email ? (
            <p className="flex items-center">
              <img
                className="w-8 rounded-full mr-2"
                src={
                  user.profileImage?.path
                    ? `${import.meta.env.VITE_BASE_URL}${
                        user.profileImage.path
                      }`
                    : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                }
              />
              {user?.name}님 :)
              <Button
                size="md"
                bgColor="gray"
                onClick={() => {
                  if (confirm("로그아웃 하시겠습니까?")) {
                    dispatch(logout());
                    navigate("/");
                  }
                }}
              >
                로그아웃
              </Button>
            </p>
          ) : (
            <div className="flex justify-end">
              <Button size="sm" onClick={() => navigate("/user/login")}>
                로그인
              </Button>
              <Button
                size="sm"
                bgColor="gray"
                onClick={() => navigate("/user/signup")}
              >
                회원가입
              </Button>
            </div>
          )}
          {/* 라이트/다크 모드 전환 */}
          <Theme />
        </div>
      </nav>
    </header>
  );
}

export default Header;
