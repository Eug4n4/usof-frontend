import { useEffect, useState } from "react";
import api from "../../api/api.js";
import Card from "./Card.jsx";
import Sorting from "../sorting/Sorting.jsx";
import "../../assets/css/posts/sorting.css";
import Pagination from "../pagination/Pagination.jsx";
import PageSize from "../pagination/PageSize.jsx";
import "../../assets/css/posts/pagination.css";

function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    let ignore = false;
    api
      .get("/posts")
      .then((result) => {
        if (!ignore) {
          console.log(result.data);
          setPosts(result.data.data);
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
              <Card
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                author={post.author}
                publishDate={post.publish_date}
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

export default Posts;
