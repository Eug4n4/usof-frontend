import { Link } from "react-router-dom";
import Title from "./Title";
import Paragraph from "./Paragraph";
import Card from "./Card";
import getPreview from "../../features/getPreview";

function OwnPostCard({
  id,
  title,
  content,
  author,
  publishDate,
  categories,
  likes,
  dislikes,
}) {
  return (
    <Card>
      <div className="card_header">
        <Title>
          <Link to={`/post/${id}`}>{title}</Link>
        </Title>
        <div className="card_options">
          <Link to={`/post/${id}/edit`}>
            <svg
              display="block"
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 -960 960 960"
              width="30px"
              fill="#242424"
            >
              <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
            </svg>
          </Link>
          <Link to={`/post/${id}/delete`}>
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

export default OwnPostCard;
