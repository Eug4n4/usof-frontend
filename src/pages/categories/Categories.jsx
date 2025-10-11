import { useContext, useEffect, useState } from "react";
import api from "../../api/api.js";
import Card from "../../components/card/Card.jsx";
import Paragraph from "../../components/card/Paragraph.jsx";
import Title from "../../components/card/Title.jsx";
import Pagination from "../../components/pagination/Pagination.jsx";
import PageSize from "../../components/pagination/PageSize.jsx";
import AuthContext from "../../contexts/AuthContext.jsx";
import { Link } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([]);
  const { user } = useContext(AuthContext);
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
                <div
                  className="card_header"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Title>{category.title}</Title>
                  {user && user.role === "admin" ? (
                    <Link to={`/categories/${category.id}`}>
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
                  ) : null}
                </div>
                <div className="content">
                  <Paragraph text={category.description} />
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
      <div className="pagination_container">
        <Pagination />
        <PageSize />
      </div>
    </>
  );
}

export default Categories;
