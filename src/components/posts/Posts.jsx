import { useEffect, useState } from "react";
import api from "../../api/api.js";
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
    <div>
      {posts.length === 0 ? (
        <p>Loading...</p>
      ) : (
        posts.map((post) => {
          return (
            <div key={post.id}>
              <p>{post.title}</p>
              <p>{post.content}</p>
              <p>{post.publish_date}</p>
              <p>{post.author}</p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default Posts;
