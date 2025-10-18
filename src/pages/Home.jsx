import { useEffect, useRef, useState } from "react";
import api from "../api/api.js";
import PostCard from "../components/card/PostCard.jsx";
import Sorting from "../components/sorting/Sorting.jsx";
import Pagination from "../components/pagination/Pagination.jsx";
import PageSize from "../components/pagination/PageSize.jsx";
import { usePosts } from "../contexts/PostContext.jsx";

import "../assets/css/posts/sorting.css";
import "../assets/css/posts/pagination.css";

function Home() {
  const { state, dispatch } = usePosts();
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
    dispatch({ type: "load", data: true });
    let ignore = false;
    api
      .get("/posts")
      .then((result) => {
        if (!ignore) {
          if (result.data?.data) {
            dispatch({ type: "set", data: result.data.data });
          }
        }
      })
      .catch(console.log)
      .finally(() => {
        if (!ignore) {
          dispatch({ type: "load", data: false });
        }
      });

    return () => {
      ignore = true;
    };
  }, [dispatch]);

  function renderState() {
    if (state.loading) {
      return <p>Loading...</p>;
    }
    if (state.posts.length === 0) {
      return <p>{"No posts found :-("}</p>;
    }
    return state.posts.map((post) => {
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
      <div className="pagination_container">
        <Pagination />
        <PageSize />
      </div>
    </>
  );
}

export default Home;
