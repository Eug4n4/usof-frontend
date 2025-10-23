import { forwardRef, useEffect, useLayoutEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

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

export default Editor;
