import { Link, useNavigate } from "react-router-dom";
import Card from "./Card";
import Title from "./Title";
import Paragraph from "./Paragraph";
import getPreview from "../../features/getPreview";
import PostService from "../../api/services/PostService";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../features/state/favoriteSlice";
import getUserAvatar from "../../features/avatars";
import Avatar from "../avatar/Avatar";
import AuthContext from "../../contexts/AuthContext";

import s from "./card.module.css";

function PostCard({
  id,
  title,
  content,
  author,
  photo,
  publishDate,
  categories,
  likes,
  dislikes,
}) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
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
    if (user) {
      if (shouldAdd) {
        PostService.addToFavorites(id).then(() => setInFavorite(true));
      } else {
        PostService.deleteFromFavorites(id).then((response) => {
          setInFavorite(false);
          dispatch(actions.remove({ postId: response.data.post_id }));
        });
      }
    } else {
      navigate("/signin", { replace: true });
    }
  }

  return (
    <Card>
      <div className={s.card_header}>
        <Title>
          <Link to={`/post/${id}`}>{title}</Link>
        </Title>
        <div className={s.card_options}>
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
      <div className={s.content}>
        <Paragraph text={getPreview(content)} />
      </div>
      <div className={s.stats}>
        <Paragraph className={"likes"} text={`Likes: ${likes}`} />
        <Paragraph className={"dislikes"} text={`Dislikes: ${dislikes}`} />
      </div>
      <div className={s.categories}>
        <ul>
          {categories.map((category) => {
            if (category.id && category.title) {
              return <li key={category.id}>{category.title}</li>;
            }
          })}
        </ul>
        <div className={s.credentials}>
          <div className="author_photo">
            <Avatar
              src={getUserAvatar(photo)}
              alt="user"
              width={24}
              height={24}
            />
          </div>
          <div>
            <Paragraph className="author" text={`${author}`} />
          </div>
          <time>
            <Paragraph className="date" text={`At ${publishDate}`} />
          </time>
        </div>
      </div>
    </Card>
  );
}

export default PostCard;
