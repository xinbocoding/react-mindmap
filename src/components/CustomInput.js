import React, { useRef, useState } from "react";
import { node, append_rec } from "../utils/tools";

const CustomInput = ({ setNode }) => {
  const [textVal, setTextVal] = useState("");
  const textArea = useRef();

  const handleChange = (e) => {
    setTextVal(e.target.value);
    let root = node("root");
    textVal.toString().split("\n").reduce(append_rec, root);
    setNode(root.children);
  };

  const add = (e) => {
    if(e.keyCode === 9) {
      e.preventDefault();

      const {selectionStart, selectionEnd} = e.target;

      const newVal = textVal.substring(0, selectionStart) + "\t" + textVal.substring(selectionEnd);
      setTextVal(newVal);
      if(textArea.current) {
        textArea.current.value = newVal
        textArea.current.selectionStart = textArea.current.selectionEnd = selectionStart + 2
      }
    }
  }

  return (
    <div className="form-floating">
      <textarea
        ref={textArea}
        className="form-control"
        style={{ height: "700px", width: '100%' }}
        value={textVal}
        onKeyDown={add}
        onChange={handleChange}
      ></textarea>
    </div>
  );
};

export default CustomInput;
