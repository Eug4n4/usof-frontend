import { useEffect, useState } from "react";
import CommentService from "../../api/services/CommentService";
import { useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import ButtonLink from "../../components/button/ButtonLink";
import Form from "../../components/form/Form";
import NoMatch from "../404";

import s from "../../components/form/form.module.css";

function DeleteComment() {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    CommentService.getById(id)
      .then((response) => setContent(response.data.content))
      .catch(() => setNotFound(true));
  }, [id]);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    CommentService.deleteComment(id)
      .then(() => setSuccess(true))
      .catch(() =>
        setError(
          "There is an error when deleting this comment. Please try again later"
        )
      )
      .finally(() => setSubmitting(false));
  }

  function renderState() {
    if (notFound) {
      return <NoMatch />;
    }
    return (
      <Form onSubmit={handleSubmit}>
        <h2>Delete comment</h2>
        <p>{`Are you sure you want to delete this comment?`}</p>
        <div className="ql-container ql-snow">
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        </div>

        <fieldset>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Delete"}
          </Button>
          <ButtonLink to="/">Cancel</ButtonLink>
        </fieldset>
        <div className={error !== "" ? s.errors : s.success}>
          {error !== "" && <p>{error}</p>}
          {success && <p>Successfully deleted this comment!</p>}
        </div>
      </Form>
    );
  }

  return renderState();
}

export default DeleteComment;
