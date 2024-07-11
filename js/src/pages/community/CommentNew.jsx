import Button from "@components/Button";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import api from "../../modules/api";

function CommentNew({ refreshPost }) {
  const { _id } = useParams();

  const { handleSubmit, register, reset, errors } = useForm();
  const onSubmit = async (data) => {
    try {
      const body = JSON.stringify({
        content: data.comment,
      });
      const response = await api.post(`/posts/${_id}/replies`, body);

      if (response.ok === 1) {
        reset();
        refreshPost();
        return;
      } else {
        alert(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg">
      <h4 className="mb-4">새로운 댓글을 추가하세요.</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <textarea
            rows="3"
            cols="40"
            className="block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            placeholder="내용을 입력하세요."
            name="comment"
            {...register("comment", {
              required: { value: true, message: "내용을 입력해 주세요." },
            })}
          ></textarea>
          {/* 에러 메세지 출력 */}
          {errors?.comment && (
            <p className="ml-2 mt-1 text-sm text-red-500">
              {errors.comment?.message}
            </p>
          )}
        </div>
        <Button type="submit" size="sm">
          댓글 등록
        </Button>
      </form>
    </div>
  );
}

export default CommentNew;
