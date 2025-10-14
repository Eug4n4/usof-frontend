import api from "../../api/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function DeleteCategory() {
  const params = useParams();
  const endpoint = `categories/${params.id}`;
  const [title, setTitle] = useState("");
  useEffect(() => {
    let ignore = false;
    api.get(endpoint).then((result) => {
      if (!ignore && result.data) {
        setTitle(result.data.title);
      }
    });
    return () => {
      ignore = true;
    };
  }, [params.id]);
  function handleSubmit(e) {
    e.preventDefault();
    api.delete(endpoint).then(console.log).catch(console.log);
  }
  return (
    <form onSubmit={handleSubmit}>
      <p>{`Are you sure you want to delete category with the title: ${title} ?`}</p>
      <fieldset>
        <button type="submit">Delete</button>
        <button>Cancel</button>
      </fieldset>
    </form>
  );
}

export default DeleteCategory;
