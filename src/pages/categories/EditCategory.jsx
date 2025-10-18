import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/api";
import Button from "../../components/button/Button";
import Form from "../../components/form/Form";
import TextInput from "../../components/input/TextInput";
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
    <Form onSubmit={handleSubmit}>
      <h2>Edit category</h2>
      <fieldset>
        <TextInput
          name="title"
          id="title"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          id="description"
          name="description"
          value={description}
          placeholder="Description"
          style={{ resize: "vertical" }}
          onChange={(e) => setDescription(e.target.value)}
        />
      </fieldset>
      <Button type="submit">Edit</Button>
    </Form>
  );
}

export default EditCategory;
