import Button from "@components/Button";
import Submit from "@components/Submit";
import { defaultPost } from "./Detail";
import api from "../../modules/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function Edit() {
  const { _id } = useParams();
  const { handleSubmit, register, errors } = useForm();
  const [post, setPost] = useState(defaultPost);

  const getPost = async () => {
    try {
      const response = await api.get(`/posts/${_id}`);
      console.log(response);
      setPost({ ...response.item });
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const editPost = async (data) => {
    try {
      const body = {
        ...data,
      };
      const response = await api.patch(`/posts/${_id}`, JSON.stringify(body));

      if (response.ok !== 1) {
        throw new Error(response.message);
      } else {
        alert("수정되었습니다.");
        setPost({ ...response.item });
        history.back();
      }
    } catch (error) {
      console.error(error);
    }
    return;
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <main className="min-w-[320px] p-4">
      <div className="text-center py-4">
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
          게시글 수정
        </h2>
      </div>
      <section className="mb-8 p-4">
        <form onSubmit={handleSubmit(editPost)}>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="title">
              제목
            </label>
            <input
              type="text"
              placeholder="제목을 입력하세요."
              className="w-full py-2 px-4 border rounded-md dark:bg-gray-700 border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              name="title"
              defaultValue={post.title}
              {...register("title", {
                required: "제목을 입력하세요.",
              })}
            />
            {/* 입력값 검증 에러 출력 */}
            {errors?.title && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {errors?.title.message}
              </p>
            )}
          </div>
          <div className="my-4">
            <label className="block text-lg content-center" htmlFor="content">
              내용
            </label>
            <textarea
              rows="15"
              placeholder="내용을 입력하세요."
              className="w-full p-4 text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              name="content"
              defaultValue={post.content}
              {...register("content", {
                required: "내용을 입력하세요.",
              })}
            ></textarea>
            {/* 입력값 검증 에러 출력 */}
            {errors?.content && (
              <p className="ml-2 mt-1 text-sm text-red-500 dark:text-red-400">
                {errors?.content.message}
              </p>
            )}
          </div>
          <hr />
          <div className="flex justify-end my-6">
            <Submit>수정</Submit>
            <Button type="reset" bgColor="gray" onClick={() => history.back()}>
              취소
            </Button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Edit;
