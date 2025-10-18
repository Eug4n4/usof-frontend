import { useEffect, useRef, useState } from "react";
import api from "../api/api.js";
import PostCard from "../components/card/PostCard.jsx";
import Sorting from "../components/sorting/Sorting.jsx";
import Pagination from "../components/pagination/Pagination.jsx";
import PageSize from "../components/pagination/PageSize.jsx";

import "../assets/css/posts/sorting.css";
import "../assets/css/posts/pagination.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
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
    let ignore = false;
    api
      .get("/posts")
      .then((result) => {
        if (!ignore) {
          if (result.data?.data) {
            setPosts(result.data.data);
          }
        }
      })
      .catch(console.log)
      .finally(() => {
        if (!ignore) {
          setLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, []);

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
      <div className="pagination_container">
        <Pagination />
        <PageSize />
      </div>
    </>
  );
}

export default Home;
