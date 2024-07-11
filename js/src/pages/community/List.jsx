import Button from "@components/Button";
import Pagination from "@components/Pagenation";
import Search from "@components/Search";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "../../modules/api";

function List() {
  const PAGE_LIMIT = 10;
  const navigate = useNavigate();
  const { type } = useParams();
  const [queryParams] = useSearchParams(location.search);
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    limit: PAGE_LIMIT,
    page: queryParams.page || 1,
    total: 0,
    totalPages: 1,
  });

  const getPosts = async (type) => {
    setIsLoading(true);
    const params = {
      type: type,
      limit: pageInfo.limit,
      sort: JSON.stringify({ createdAt: 1 }),
    };

    if (queryParams.get("keyword")) {
      params.keyword = queryParams.get("keyword");
    }
    if (queryParams.get("page")) {
      params.page = queryParams.get("page");
    }

    try {
      const reqURL = "/posts?" + new URLSearchParams(params);

      const response = await api.get(reqURL);

      setPosts([...response.item]);
      setPageInfo({ ...response.pagination });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
    return;
  };

  const titleByType = {
    info: "정보 공유",
    free: "자유 게시판",
    qna: "질문 게시판",
  };

  useEffect(() => {
    getPosts(type);
  }, [queryParams, type]);

  return (
    <main className="min-w-80 p-10">
      <div className="text-center py-4">
        <h2 className="pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200">
          {titleByType[type]}
        </h2>
      </div>
      <div className="flex justify-end mr-4">
        {/* 검색 */}
        <Search />
        <Button onClick={() => navigate("./new")}>글작성</Button>
      </div>
      <section className="pt-10">
        <table className="border-collapse w-full table-fixed">
          <colgroup>
            <col className="w-[10%] sm:w-[10%]" />
            <col className="w-[60%] sm:w-[30%]" />
            <col className="w-[30%] sm:w-[15%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[10%]" />
            <col className="w-0 sm:w-[25%]" />
          </colgroup>
          <thead>
            <tr className="border-b border-solid border-gray-600">
              <th className="p-2 whitespace-nowrap font-semibold">번호</th>
              <th className="p-2 whitespace-nowrap font-semibold">제목</th>
              <th className="p-2 whitespace-nowrap font-semibold">글쓴이</th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                조회수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                댓글수
              </th>
              <th className="p-2 whitespace-nowrap font-semibold hidden sm:table-cell">
                작성일
              </th>
            </tr>
          </thead>
          <tbody>
            {/* 로딩 상태 표시 */}
            {isLoading ? (
              <tr>
                <td colSpan="6" className="py-20 text-center">
                  로딩중...
                </td>
              </tr>
            ) : (
              <>
                {/* 에러메시지 출력 */}
                {posts.length === 0 && (
                  <tr>
                    <td colSpan="6" className="py-20 text-center">
                      게시글이 없습니다.
                    </td>
                  </tr>
                )}
                {/* 본문 출력 */}
                {posts.map((item) => (
                  <tr
                    key={`post-${item._id}`}
                    className="border-b border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300 ease-in-out"
                  >
                    <td className="p-2 text-center">{item._id}</td>
                    <td
                      className="p-2 truncate indent-4 cursor-pointer"
                      onClick={() => navigate(`./${item._id}`)}
                    >
                      {item.title}
                    </td>
                    <td className="p-2 text-center truncate">
                      {item.user.name}
                    </td>
                    <td className="p-2 text-center hidden sm:table-cell">
                      {item.views}
                    </td>
                    <td className="p-2 text-center hidden sm:table-cell">
                      {item.repliesCount}
                    </td>
                    <td className="p-2 truncate text-center hidden sm:table-cell">
                      {item.createdAt}
                    </td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </table>
        <hr />
        {/* 페이지네이션 */}
        <Pagination totalPage={pageInfo.totalPages || 1} />
      </section>
    </main>
  );
}

export default List;
