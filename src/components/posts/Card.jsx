import { Link } from "react-router-dom";
import "../../assets/css/posts/card.css";
function Card({ id, title, content, author, publishDate, categories }) {
  return (
    <section className="post">
      <div className="title">
        <h3>
          <Link to={`/post/${id}`}>{title}</Link>
        </h3>
      </div>
      <div className="content">
        <p>{content}</p>
      </div>
      <div className="credentials">
        <p className="author">By: {author}</p>
        <p className="date">Published at: {publishDate}</p>
      </div>
      <div className="categories">
        <ul>
          {categories.map((category) => {
            return <li key={category.id}>{category.title}</li>;
          })}
        </ul>
      </div>
    </section>
  );
}

export default Card;
