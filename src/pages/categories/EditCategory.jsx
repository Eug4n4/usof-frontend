import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";

function EditCategory() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const params = useParams();
  const endpoint = `categories/${params.id}`;
  useEffect(() => {
    let ignore = false;
    api.get(endpoint).then((result) => {
      if (!ignore && result.data) {
        setTitle(result.data.title);
        setDescription(result.data.description);
      }
    });
    return () => {
      ignore = true;
    };
  }, [params.id]);

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    await api
      .patch(endpoint, Object.fromEntries(formData))
      .then(console.log)
      .catch(console.log);
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </fieldset>
      <button type="submit">Edit</button>
    </form>
  );
}

export default EditCategory;
