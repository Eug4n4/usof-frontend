import { useEffect, useState } from "react";
import Input from "./Input";

function CategoryInput({ name = "categories", value = [], onChange }) {
  const [text, setText] = useState(value.join(", "));

  useEffect(() => {
    if (value.length === 0) {
      setText("");
    }
  }, [value]);

  function handleChange(e) {
    const newText = e.target.value;
    setText(newText);

    const categories = newText
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

    onChange?.(categories);
  }

  return (
    <Input
      type="text"
      id="categories"
      name={name}
      autoComplete="off"
      value={text}
      onChange={handleChange}
      placeholder="e.g. Java, Python, Rust"
    />
  );
}

export default CategoryInput;
