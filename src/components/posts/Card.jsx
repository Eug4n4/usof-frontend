import { Link } from "react-router-dom";
import "../../assets/css/posts/card.css";
import Card from "../card/Card";
import Title from "../card/Title";
import Paragraph from "../card/Paragraph";
function PostCard({ id, title, content, author, publishDate, categories }) {
  return (
    <Card>
      <Title>
        <Link to={`/post/${id}`}>{title}</Link>
      </Title>
      <div className="content">
        <Paragraph text={content} />
      </div>
      <div className="credentials">
        <Paragraph className="author" text={`By: ${author}`} />
        <Paragraph className="date" text={`Published at ${publishDate}`} />
      </div>
      <div className="categories">
        <ul>
          {categories.map((category) => {
            return <li key={category.id}>{category.title}</li>;
          })}
        </ul>
      </div>
    </Card>
  );
}

export default PostCard;
