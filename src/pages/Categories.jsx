import { useEffect, useState } from "react";
import api from "../api/api";
import Card from "../components/card/Card";
import Paragraph from "../components/card/Paragraph";
import Title from "../components/card/Title";
function Categories() {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    let ignore = false;
    api
      .get("/categories")
      .then((result) => {
        if (!ignore) {
          setCategories(result.data);
        }
      })
      .catch(console.log);

    return () => {
      ignore = true;
    };
  }, []);
  return (
    <>
      <h1>Categories</h1>
      <ul style={{ listStyle: "none" }}>
        {categories.map((category) => {
          return (
            <li key={category.id}>
              <Card>
                <Title>{category.title}</Title>
                <div className="content">
                  <Paragraph text={category.description} />
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Categories;
