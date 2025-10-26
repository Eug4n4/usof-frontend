import { Link } from "react-router-dom";
import "../../assets/css/posts/card.css";
import Card from "./Card";
import Title from "./Title";
import Paragraph from "./Paragraph";
import getPreview from "../../features/getPreview";
import PostService from "../../api/services/PostService";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../features/state/favoriteSlice";
function PostCard({
  id,
  title,
  content,
  author,
  publishDate,
  categories,
  likes,
  dislikes,
}) {
  const [isInFavorite, setInFavorite] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const signal = new AbortController();

    const getInFavorite = async () => {
      try {
        await PostService.getFavoriteById(id, signal.signal);
        if (!signal.signal.aborted) {
          setInFavorite(true);
        }
      } catch (e) {
        if (!signal.signal.aborted) {
          setInFavorite(false);
        }
      }
    };
    getInFavorite();
    return () => signal.abort();
  }, [id]);

  async function handleFavoriteClick(shouldAdd) {
    if (shouldAdd) {
      PostService.addToFavorites(id).then(() => setInFavorite(true));
    } else {
      PostService.deleteFromFavorites(id).then((response) => {
        setInFavorite(false);
        dispatch(actions.remove({ postId: response.data.post_id }));
      });
    }
  }

  return (
    <Card>
      <div className="card_header">
        <Title>
          <Link to={`/post/${id}`}>{title}</Link>
        </Title>
        <div className="card_options">
          {isInFavorite ? (
            <svg
              onClick={() => handleFavoriteClick(false)}
              display="block"
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#242424"
            >
              <path d="M852-212 732-332l56-56 120 120-56 56ZM708-692l-56-56 120-120 56 56-120 120Zm-456 0L132-812l56-56 120 120-56 56ZM108-212l-56-56 120-120 56 56-120 120Zm246-75 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-361Z" />
            </svg>
          ) : (
            <svg
              onClick={() => handleFavoriteClick(true)}
              display="block"
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#242424"
            >
              <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z" />
            </svg>
          )}
        </div>
      </div>
      <div className="content">
        <Paragraph text={getPreview(content)} />
      </div>
      <div className="credentials">
        <Paragraph className="author" text={`By: ${author}`} />
        <Paragraph className="date" text={`Published at ${publishDate}`} />
      </div>
      <div className="stats" style={{ display: "flex", gap: "10px" }}>
        <Paragraph className={"likes"} text={`Likes: ${likes}`} />
        <Paragraph className={"dislikes"} text={`Dislikes: ${dislikes}`} />
      </div>
      <div className="categories">
        <ul>
          {categories.map((category) => {
            if (category.id && category.title) {
              return <li key={category.id}>{category.title}</li>;
            }
          })}
        </ul>
      </div>
    </Card>
  );
}

export default PostCard;
