import { useEffect, useRef } from "react";
import PostCard from "../components/card/PostCard.jsx";
import Sorting from "../components/sorting/Sorting.jsx";
import PaginationContainer from "../components/pagination/PaginationContainer.jsx";
import Filter from "../components/filter/Filter.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  currentPage,
  getPosts,
  pageSize,
  query,
} from "../features/state/postSlice.js";

import { usePagination } from "../features/state/pagination.js";
import { INITIAL_PAGE_SIZE } from "../features/constants.js";
import { postSortingOptions } from "../features/sorting.options.js";
import formatDate from "../features/formatDate.js";

function Home() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);
  const pagination = usePagination({
    resource: "posts",
    fetchThunk: getPosts,
    actions: { currentPage, pageSize, query },
  });

  useEffect(() => {
    dispatch(currentPage(1));
    dispatch(pageSize(INITIAL_PAGE_SIZE));
    dispatch(getPosts());
  }, [dispatch]);

  function renderState() {
    if (loading) {
      return <p>Loading...</p>;
    }
    if (posts.length === 0) {
      return <p>{"No posts found :-("}</p>;
    }
    return posts.map((post) => {
      return (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          author={post.author}
          photo={post.photo}
          publishDate={formatDate(new Date(post.publish_date))}
          categories={post.categories}
          likes={post.likes}
          dislikes={post.dislikes}
        />
      );
    });
  }

  return (
    <>
      <div className="sorting">
        <Sorting
          getter={getPosts}
          queryChanger={query}
          pageChanger={currentPage}
          pageSizer={pageSize}
          filter={
            <Filter
              queryChanger={query}
              pageChanger={currentPage}
              pageSizer={pageSize}
              query={pagination.query}
              getter={getPosts}
            />
          }
          defaultSorting={"most-liked"}
          sortingOptions={postSortingOptions}
        />
      </div>
      <div className="posts container">{renderState()}</div>
      <PaginationContainer purpose={pagination} />
    </>
  );
}

export default Home;
