import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useEffect, useRef } from "react";
import Button from "../../components/button/Button";

function CreatePost() {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    const editorDiv = document.createElement("div");
    editorRef.current.appendChild(editorDiv);

    const toolbarOptions = [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ];

    quillRef.current = new Quill(editorDiv, {
      placeholder: "Write your post...",
      theme: "snow",
      modules: { toolbar: toolbarOptions },
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const html = quillRef.current?.root.innerHTML;
    console.log("Post content:", html);
  };

  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <label htmlFor="title">Title: </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title..."
          maxLength={100}
        />
      </fieldset>
      <div id="editor_wrapper" ref={editorRef} />
      <fieldset>
        <label htmlFor="categories">
          Select at least 1 category for your post
        </label>
        <select name="categories" id="categories" multiple="multiple">
          <option value="First">First</option>
          <option value="Second">Second</option>
          <option value="Third">Third</option>
        </select>
      </fieldset>

      <Button type="submit">Publish</Button>
    </form>
  );
}
export default CreatePost;
