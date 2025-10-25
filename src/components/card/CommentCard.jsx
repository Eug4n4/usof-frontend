import { useContext, useState } from "react";
import Button from "../button/Button";
import Card from "./Card";
import Paragraph from "./Paragraph";
import b from "../button/button.module.css";
import AuthContext from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Reactions from "../button/Reactions";

function CommentCard({ id, author, content, publishDate }) {
  const { user } = useContext(AuthContext);
  return (
    <Card>
      <div className="card_header">
        <div className="credentials">
          <Paragraph text={`By: ${author}`} />
          <Paragraph text={`At: ${publishDate}`} />
        </div>
        {user?.login === author && (
          <div className="card_options">
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
          </div>
        )}
      </div>

      <div
        className="ql-editor"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
      <div className="reactions">
        <Reactions id={id} purpose={"comments"} />
      </div>
    </Card>
  );
}

export default CommentCard;
