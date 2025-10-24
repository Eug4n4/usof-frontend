import { useEffect, useState } from "react";
import Input from "./Input";

function CategoryInput({ name = "categories", value = "", onChange }) {
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  function handleChange(e) {
    console.log(e.target.value);
    const newText = e.target.value;
    setText(newText);

    onChange?.(newText);
  }

  return (
    <Input
      type="text"
      id="categories"
      name={name}
      autoComplete="off"
      value={text}
      onChange={handleChange}
      placeholder="e.g. Java, Python ..."
    />
  );
}

export default CategoryInput;
