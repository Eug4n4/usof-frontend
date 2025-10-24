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
import CommentForm from "../../components/form/CommentForm";
import formatDate from "../../features/formatDate";
import Reactions from "../../components/button/Reactions";

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
    actions: { currentPage, pageSize, query },
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
            <Reactions id={id} purpose={"posts"} />
          </div>
          <div
            className="top right ql-editor"
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
        <div>
          {comments.map((comment) => {
            return (
              <CommentCard
                key={comment.id}
                id={comment.id}
                author={comment.author}
                content={comment.content}
                publishDate={formatDate(new Date(comment.comment_date))}
              />
            );
          })}
        </div>
        <div>
          <CommentForm postId={post.id} />
        </div>

        <PaginationContainer purpose={pagination} />
      </>
    );
  }

  return renderState();
}

export default Post;
