import { useContext, useRef, useState } from "react";
import Form from "./Form";
import Editor from "../editor/Editor";
import Button from "../button/Button";
import AuthContext from "../../contexts/AuthContext";
import PostService from "../../api/services/PostService";
import s from "./comment.form.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addComment } from "../../features/state/commentSlice";
function CommentForm({ postId }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const quillRef = useRef();
  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    if (!user) {
      return navigate("/signin", { replace: true });
    }
    const html = quillRef.current?.root.innerHTML;
    quillRef.current?.setContents([]);
    PostService.createComment(postId, { content: html })
      .then((response) => {
        setSuccess(true);
        dispatch(addComment(response.data.data));
      })
      .finally(() => setSubmitting(false));
  }
  return (
    <Form className={s.comment_form} onSubmit={handleSubmit}>
      <h3>Your comment</h3>
      <Editor ref={quillRef} />
      <Button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit"}
      </Button>
      <div>{success && <p>Success!</p>}</div>
    </Form>
  );
}

export default CommentForm;
