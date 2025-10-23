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
import Editor from "../../components/editor/Editor";

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

export default CreatePost;
