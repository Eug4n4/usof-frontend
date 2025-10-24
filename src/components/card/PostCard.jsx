import { Link } from "react-router-dom";
import "../../assets/css/posts/card.css";
import Card from "./Card";
import Title from "./Title";
import Paragraph from "./Paragraph";
import getPreview from "../../features/getPreview";
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
  return (
    <Card>
      <Title>
        <Link to={`/post/${id}`}>{title}</Link>
      </Title>
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
