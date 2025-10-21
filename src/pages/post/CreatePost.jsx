import Quill from "quill";
import "quill/dist/quill.snow.css";
import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import Button from "../../components/button/Button";
import Form from "../../components/form/Form";
import TextInput from "../../components/input/TextInput";

function CreatePost() {
  const [lastChange, setLastChange] = useState();
  const quillRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    const html = quillRef.current?.root.innerHTML;
    console.log("Post content:", html);
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

      <Editor ref={quillRef} onTextChange={setLastChange} />
      <fieldset>
        <label
          htmlFor="categories"
          style={{ display: "flex", flexDirection: "column" }}
        >
          Select at least 1 category for your post
        </label>
        <select name="categories" id="categories" multiple="multiple">
          <option value="First">First</option>
          <option value="Second">Second</option>
          <option value="Third">Third</option>
        </select>
      </fieldset>

      <Button type="submit">Publish</Button>
    </Form>
  );
}

const Editor = forwardRef(({ onTextChange }, ref) => {
  const containerRef = useRef(null);
  const onTextChangeRef = useRef(onTextChange);
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ size: ["small", false, "large", "huge"] }],
  ];
  useLayoutEffect(() => {
    onTextChangeRef.current = onTextChange;
  });

  useEffect(() => {
    const container = containerRef.current;
    const editorContainer = container.appendChild(
      container.ownerDocument.createElement("div")
    );
    const quill = new Quill(editorContainer, {
      modules: { toolbar: toolbarOptions },
      theme: "snow",
    });

    ref.current = quill;

    quill.on(Quill.events.TEXT_CHANGE, (...args) => {
      onTextChangeRef.current?.(...args);
    });

    return () => {
      ref.current = null;
      container.innerHTML = "";
    };
  }, [ref]);

  return <div ref={containerRef}></div>;
});
export default CreatePost;
