import { useEffect, useState } from "react";
import api from "../../api/api.js";
import Card from "./Card.jsx";
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
  );
}

export default Posts;
