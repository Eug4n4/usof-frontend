import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

function EditCategory() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const params = useParams();
  useEffect(() => {
    let ignore = false;
    api.get(`categories/${params.id}`).then((result) => {
      if (!ignore && result.data) {
        setTitle(result.data.title);
        setDescription(result.data.description);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  function handleTitle(e) {
    setTitle(e.target.value);
  }

  function handleDescription(e) {
    setDescription(e.target.value);
  }
  return (
    <form>
      <fieldset>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={handleTitle}
        />
        <textarea
          id="description"
          value={description}
          onChange={handleDescription}
        />
      </fieldset>
      <button type="submit">Edit</button>
    </form>
  );
}

export default EditCategory;
