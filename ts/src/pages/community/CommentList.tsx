import Button from "@components/Button";
import CommentNew from "@pages/community/CommentNew";
import { Link, useParams } from "react-router-dom";
import api from "@modules/api";
import { useSelector } from "react-redux";

function CommentList({ refreshPost, comments = [] }) {
  const { _id } = useParams();
  // const me = useRecoilValue(userAtom);
  const me = useSelector((state) => state.user.value);

  const deleteComment = async (replyId) => {
    try {
      const response = await api.delete(`/posts/${_id}/replies/${replyId}`);
      if (response.ok === 1) {
        alert("댓글이 삭제되었습니다.");
        refreshPost();
      } else {
        alert(response.message);
      }
      return;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="mb-8">
      <h4 className="mt-8 mb-4 ml-2">댓글 {comments.length}개</h4>

      {/* 댓글 */}
      {comments.length > 0 &&
        comments.map(({ _id, user, like, updatedAt, content }) => (
          <div key={`comment-${_id}`} className="shadow-md rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <img
                className="w-8 mr-2 rounded-full"
                src={
                  user.profile
                    ? import.meta.env.VITE_BASE_URL + user.profile.path
                    : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"
                }
                alt={""}
              />
              <Link to="" className="text-orange-400">
                {user.name}
              </Link>
              <time className="ml-auto text-gray-500" dateTime={updatedAt}>
                {updatedAt}
              </time>
            </div>
            <div className="flex justify-between items-center mb-2">
              <pre className="whitespace-pre-wrap text-sm">{content}</pre>
              {me._id === user._id && (
                <Button
                  bgColor="red"
                  size="sm"
                  onClick={() => {
                    if (confirm("댓글을 삭제하시겠습니까?")) {
                      deleteComment(_id);
                    }
                  }}
                >
                  삭제
                </Button>
              )}
            </div>
          </div>
        ))}

      {/* 댓글 입력 */}
      <CommentNew refreshPost={refreshPost} />
    </section>
  );
}

export default CommentList;
