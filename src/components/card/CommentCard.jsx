import { useContext, useState } from "react";
import Button from "../button/Button";
import Card from "./Card";
import Paragraph from "./Paragraph";
import b from "../button/button.module.css";
import AuthContext from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Reactions from "../button/Reactions";

function CommentCard({ id, author, content, publishDate }) {
  return (
    <Card>
      <div className="credentials">
        <Paragraph text={`By: ${author}`} />
        <Paragraph text={`At: ${publishDate}`} />
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
