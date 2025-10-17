import { useEffect, useState } from "react";
import api from "../api/api.js";
import PostCard from "../components/card/PostCard.jsx";
import Sorting from "../components/sorting/Sorting.jsx";
import Pagination from "../components/pagination/Pagination.jsx";
import PageSize from "../components/pagination/PageSize.jsx";

import "../assets/css/posts/sorting.css";
import "../assets/css/posts/pagination.css";

function Home() {
  const [posts, setPosts] = useState([]);
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
      .catch(console.log);

    return () => {
      ignore = true;
    };
  }, []);
  return (
    <>
      <div className="sorting">
        <Sorting />
      </div>
      <div className="posts container">
        {posts.length === 0 ? (
          <p>Loading...</p>
        ) : (
          posts.map((post) => {
            return (
              <PostCard
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                author={post.author}
                publishDate={Intl.DateTimeFormat("uk").format(
                  new Date(post.publish_date)
                )}
                categories={post.categories}
              />
            );
          })
        )}
      </div>
      <div className="pagination_container">
        <Pagination />
        <PageSize />
      </div>
    </>
  );
}

export default Home;
