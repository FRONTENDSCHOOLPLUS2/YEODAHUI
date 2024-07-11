import { useNavigate, useParams } from "react-router-dom";
import Button from "@components/Button";
import CommentList from "./CommentList";
import api from "../../modules/api";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const defaultPost = {
  _id: null,
  type: "",
  product_id: null,
  seller_id: null,
  user: {
    _id: null,
    name: "",
  },
  title: "",
  content: "",
  replies: [],
  createdAt: "",
  updatedAt: "",
};

function Detail() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(defaultPost);
  const user = useSelector((state) => state.user.value);
  console.log(user);

  const getPost = async () => {
    try {
      const response = await api.get(`/posts/${_id}`);

      setPost({ ...response.item });
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const deletePost = async (postId) => {
    try {
      const response = await api.delete(`/posts/${postId}`);
      if (response.ok === 1) {
        alert("게시글이 삭제되었습니다.");
      } else {
        alert(response.message);
      }
      return;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <main className="container mx-auto mt-4 px-4">
      <section className="mb-8 p-4">
        <div className="font-semibold text-xl">{post.title}</div>
        <div className="text-right text-gray-400">
          작성자 : {post.user.name}
        </div>
        <div className="mb-4">
          <div>
            <pre className="font-roboto w-full p-2 whitespace-pre-wrap">
              {post.content &&
                post.content
                  .split("\n")
                  .map((line, index) => <p key={`line-${index}`}>{line}</p>)}
            </pre>
          </div>
          <hr />
        </div>
        <div className="flex justify-end my-4">
          <Button onClick={() => navigate(-1)}>목록</Button>
          {user._id === post.user._id && (
            <>
              <Button bgColor="gray" onClick={() => navigate("./edit")}>
                수정
              </Button>
              <Button
                bgColor="red"
                onClick={() => {
                  if (confirm("게시글을 삭제하시겠습니까?")) {
                    deletePost(_id);
                    navigate("..", { relative: "path" });
                  }
                }}
              >
                삭제
              </Button>
            </>
          )}
        </div>
      </section>

      {/* 댓글 목록 */}
      <CommentList refreshPost={getPost} comments={post.replies} />
    </main>
  );
}

export default Detail;
