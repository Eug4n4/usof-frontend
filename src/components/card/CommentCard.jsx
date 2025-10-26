import { useContext, useState } from "react";
import Button from "../button/Button";
import Card from "./Card";
import Paragraph from "./Paragraph";
import b from "../button/button.module.css";
import AuthContext from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Reactions from "../button/Reactions";
import CommentService from "../../api/services/CommentService";

import s from "./card.module.css";
import Avatar from "../avatar/Avatar";
import getUserAvatar from "../../features/avatars";

function CommentCard({ id, author, photo, content, publishDate, status }) {
  const { user } = useContext(AuthContext);
  const [currentStatus, setStatus] = useState(status);
  function handleClick(newStatus) {
    CommentService.updateStatus(id, newStatus)
      .then(() => setStatus(newStatus))
      .catch(console.log);
  }
  return (
    <Card aria-disabled={currentStatus === 0 ? "true" : "false"}>
      <div className={s.card_header}>
        {user?.login === author && (
          <div className={s.card_options}>
            <Link to={`/comment/${id}/delete`}>
              <svg
                display="block"
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="#242424"
              >
                <path d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z" />
              </svg>
            </Link>
            {currentStatus === 1 && (
              <svg
                onClick={() => handleClick(0)}
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="#242424"
              >
                <path d="M240-640h360v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85h-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640Zm0 480h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM240-160v-400 400Z" />
              </svg>
            )}
            {currentStatus === 0 && (
              <svg
                onClick={() => handleClick(1)}
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="#242424"
              >
                <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
              </svg>
            )}
          </div>
        )}
      </div>

      <div
        className="ql-editor"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      <div className={s.reactions}>
        <Reactions id={id} purpose={"comments"} status={currentStatus} />
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

export default CommentCard;
