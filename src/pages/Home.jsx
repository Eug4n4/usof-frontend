import { useEffect, useRef } from "react";
import PostCard from "../components/card/PostCard.jsx";
import Sorting from "../components/sorting/Sorting.jsx";
import PaginationContainer from "../components/pagination/PaginationContainer.jsx";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../features/state/postSlice.js";

import "../assets/css/posts/sorting.css";
import "../assets/css/posts/pagination.css";

function Home() {
  const dispatch = useDispatch();
  const { posts, loading } = useSelector((state) => state.posts);
  const dateTimeFormatter = useRef(
    Intl.DateTimeFormat("uk", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  useEffect(() => {
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
          publishDate={dateTimeFormatter.current.format(
            new Date(post.publish_date)
          )}
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
        <Sorting />
      </div>
      <div className="posts container">{renderState()}</div>
      <PaginationContainer purpose="posts" />
    </>
  );
}

export default Home;
