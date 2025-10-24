import { useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import Form from "../../components/form/Form";
import { useEffect, useState } from "react";
import PostService from "../../api/services/PostService";
import ButtonLink from "../../components/button/ButtonLink";

import s from "../../components/form/form.module.css";
import NoMatch from "../404";

function DeletePost() {
  const params = useParams();
  const [title, setTitle] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);
  useEffect(() => {
    let ignore = false;
    PostService.getById(params.id)
      .then((result) => {
        if (!ignore && result.data) {
          setTitle(result.data.title);
        }
      })
      .catch(() => setNotFound(true));
    return () => {
      ignore = true;
    };
  }, [params.id]);
  function handleSubmit(e) {
    e.preventDefault();
    PostService.deletePost(params.id)
      .then(() => setSuccess(true))
      .catch(() =>
        setError("Error occured while deleting this post. Try again")
      );
  }

  function renderState() {
    if (notFound) {
      return <NoMatch />;
    }
    return (
      <Form onSubmit={handleSubmit}>
        <h2>Delete post</h2>
        <p>{`Are you sure you want to delete post with the title: ${title} ?`}</p>
        <fieldset>
          <Button type="submit">Delete</Button>
          <ButtonLink to="/">Cancel</ButtonLink>
        </fieldset>
        <div className={error !== "" ? s.errors : s.success}>
          {error !== "" && <p>{error}</p>}
          {success && <p>Successfully deleted this post!</p>}
        </div>
      </Form>
    );
  }

  return renderState();
}

export default DeletePost;
