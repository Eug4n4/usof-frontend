import { useRef, useState } from "react";
import Button from "../../components/button/Button";
import Form from "../../components/form/Form";
import TextInput from "../../components/input/TextInput";
import Editor from "../../components/editor/Editor";
import CategoryInput from "../../components/input/CategoryInput";
import PostService from "../../api/services/PostService";

import s from "../../components/form/form.module.css";

function CreatePost() {
  const [categories, setCategories] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const quillRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const { title } = Object.fromEntries(new FormData(e.target));
    const htmlContent = quillRef.current?.root.innerHTML;
    console.log(categories);
    PostService.createPost({
      title,
      content: htmlContent,
      categories: categories
        .split(",")
        .map((c) => c.trim())
        .filter(Boolean),
    })
      .then(() => {
        setError("");
        setSuccess(true);
      })
      .catch(() =>
        setError(
          "There is an error. Some category may not exists or content length is less than 50 characters"
        )
      )
      .finally(() => setSubmitting(false));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2>New post</h2>
      <fieldset>
        <label htmlFor="title">Title: </label>
        <TextInput
          name="title"
          id="title"
          placeholder="Title..."
          maxLength={100}
        />
      </fieldset>

      <Editor ref={quillRef} />
      <fieldset>
        <label
          htmlFor="categories"
          style={{ display: "flex", flexDirection: "column" }}
        >
          Categories
        </label>
        <CategoryInput
          name="categories"
          value={categories}
          onChange={(categories) => setCategories(categories)}
        />
      </fieldset>

      <Button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Publish"}
      </Button>
      <div className={error !== "" ? s.errors : s.success}>
        {error !== "" && <p>{error}</p>}
        {success && <p>Successfully created a post!</p>}
      </div>
    </Form>
  );
}

export default CreatePost;
