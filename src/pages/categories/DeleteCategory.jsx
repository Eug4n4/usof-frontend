import api from "../../api/api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Form from "../../components/form/Form";
import Button from "../../components/button/Button";
import ButtonLink from "../../components/button/ButtonLink";

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
    <Form onSubmit={handleSubmit}>
      <h2>Delete category</h2>
      <p>{`Are you sure you want to delete category with the title: ${title} ?`}</p>
      <fieldset>
        <Button type="submit">Delete</Button>
        <ButtonLink to="/">Cancel</ButtonLink>
      </fieldset>
    </Form>
  );
}

export default DeleteCategory;
