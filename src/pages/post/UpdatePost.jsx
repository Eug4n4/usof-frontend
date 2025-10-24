import { useParams } from "react-router-dom";
import PostService from "../../api/services/PostService";
import { useEffect, useRef, useState } from "react";
import Editor from "../../components/editor/Editor";
import Form from "../../components/form/Form";
import TextInput from "../../components/input/TextInput";
import CategoryInput from "../../components/input/CategoryInput";
import Button from "../../components/button/Button";

import s from "../../components/form/form.module.css";

function UpdatePost() {
  const { id } = useParams();
  const [post, setPost] = useState({ title: "", content: "", categories: [] });
  const [categories, setCategories] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const quillRef = useRef();

  useEffect(() => {
    let ignore = false;
    PostService.getById(id).then((response) => {
      if (!ignore && response.data) {
        const result = response.data;
        const titles = result.categories.map((c) => c.title).join();
        setPost({
          title: result.title,
          content: result.content,
          categories: titles,
        });
        setCategories(titles);
      }
    });
    return () => {
      ignore = true;
    };
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const { title } = Object.fromEntries(new FormData(e.target));
    const htmlContent = quillRef.current?.root.innerHTML;
    console.log(post.categories);
    console.log(title);
    console.log(htmlContent);
    PostService.updatePost({
      id,
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
      <h2>Update post</h2>
      <fieldset>
        <label htmlFor="title">Title: </label>
        <TextInput
          name="title"
          id="title"
          placeholder="Title..."
          value={post.title}
          onChange={(e) =>
            setPost((prev) => ({ ...prev, title: e.target.value }))
          }
          maxLength={100}
        />
      </fieldset>

      <Editor ref={quillRef} value={post.content} />
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

export default UpdatePost;
