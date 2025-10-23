import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import NoMatch from "../404";
import Button from "../../components/button/Button";
import Sorting from "../../components/sorting/Sorting";
import CommentCard from "../../components/card/CommentCard";
import { commentSortingOptions } from "../../features/sorting.options";
import { usePagination } from "../../features/state/pagination";
import {
  currentPage,
  getPost,
  getPostComments,
  pageSize,
  query,
} from "../../features/state/commentSlice";
import { useDispatch, useSelector } from "react-redux";
import { INITIAL_PAGE_SIZE } from "../../features/constants";
import PaginationContainer from "../../components/pagination/PaginationContainer";
import s from "../../components/details/detail.module.css";

function Post() {
  const { id } = useParams();
  const [notFound, setNotFound] = useState(false);
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.postComments.comments);
  const post = useSelector((state) => state.postComments.post);
  const postLoading = useSelector((state) => state.postComments.postLoading);

  const pagination = usePagination({
    resource: "postComments",
    fetchThunk: getPostComments,
    actions: { currentPage, pageSize },
  });

  useEffect(() => {
    dispatch(getPost(id))
      .unwrap()
      .catch(() => setNotFound(true));
    dispatch(currentPage(1));
    dispatch(pageSize(INITIAL_PAGE_SIZE));
    dispatch(getPostComments(Number(id)));
  }, [dispatch, id]);

  function renderState() {
    if (postLoading) {
      return <p>Loading...</p>;
    }
    if (notFound) {
      return <NoMatch />;
    }

    return (
      <>
        <h2 className={`${s.details} heading`}>{post.title}</h2>
        <section className={`${s.details} ${s.controls}`}></section>
        <section className={`${s.details} ${s.top}`}>
          <div className="top left">
            <Button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#242424"
              >
                <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" />
              </svg>
              {post.likes}
            </Button>
            <Button>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#242424"
              >
                <path d="M240-840h440v520L400-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14Zm360 80H240L120-480v80h360l-54 220 174-174v-406Zm0 406v-406 406Zm80 34v-80h120v-360H680v-80h200v520H680Z" />
              </svg>
              {post.dislikes}
            </Button>
          </div>
          <div
            className="top right"
            dangerouslySetInnerHTML={{ __html: post.content }}
          ></div>
        </section>
        <section className={`${s.details} ${s.anchors}`}>
          <Button>Comments</Button>
        </section>

        <Sorting
          getter={getPostComments}
          queryChanger={query}
          pageChanger={currentPage}
          pageSizer={pageSize}
          defaultSorting={"least-liked"}
          sortingOptions={commentSortingOptions}
        />
        {comments.map((comment) => {
          return (
            <CommentCard
              key={comment.id}
              author={comment.author}
              content={comment.content}
              publishDate={comment.comment_date}
              likes={comment.likes}
              dislikes={comment.dislikes}
            />
          );
        })}
        <PaginationContainer purpose={pagination} />
      </>
    );
  }

  return renderState();
}

export default Post;
