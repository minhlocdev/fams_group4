import React, { useState, useMemo } from "react";
import ReactQuill, { Quill, reactQuillRef } from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function RichText({ value, onChange, error }) {
  const handleOnChange = (newVal) => {
    // let checkError = false
    // if (newVal.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
    //     checkError = true
    // } else checkError = false
    onChange(newVal);
  };
  var myUndo = () => {
    let myEditor = reactQuillRef.getEditor();
    return myEditor.history.undo();
  };

  var myRedo = () => {
    let myEditor = reactQuillRef.getEditor();
    return myEditor.history.redo();
  };
  var icons = Quill.import("ui/icons");
  icons["undo"] =
    `<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none">
    <path d="M4 7H15C16.8692 7 17.8039 7 18.5 7.40193C18.9561 7.66523 19.3348 8.04394 19.5981 8.49999C20 9.19615 20 10.1308 20 12C20 13.8692 20 14.8038 19.5981 15.5C19.3348 15.9561 18.9561 16.3348 18.5 16.5981C17.8039 17 16.8692 17 15 17H8.00001M4 7L7 4M4 7L7 10" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  icons["redo"] =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
    <path d="M20 7H9.00001C7.13077 7 6.19615 7 5.5 7.40193C5.04395 7.66523 4.66524 8.04394 4.40193 8.49999C4 9.19615 4 10.1308 4 12C4 13.8692 4 14.8038 4.40192 15.5C4.66523 15.9561 5.04394 16.3348 5.5 16.5981C6.19615 17 7.13077 17 9 17H16M20 7L17 4M20 7L17 10" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;
  icons["color"] =
    `<svg viewBox ="0 0 18 18" style="background-color:black;border-radius:3px">
    <rect class="ql-color-label ql-stroke ql-transparent" height="18" width="18" style="stroke:none;opacity:1"></rect>
    </svg>`;

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["undo", "redo"],
          [{ header: [1, 2, false] }],
          [{ align: [] }],
          [{ color: [] }],
          ["bold", "italic", "underline", "strike", "code-block"],
          ["clean"],
          [{ list: "bullet" }, { list: "ordered" }],
          ["link", "image"],
          ["blockquote"],
        ],
        handlers: {
          undo: myUndo,
          redo: myRedo,
        },
      },
    }),
    [],
  );
  const formats = [
    "header",
    "align",
    "color",
    "bold",
    "italic",
    "underline",
    "strike",
    "code-block",
    "clean",
    "list",
    "image",
    "blockquote",
  ];
  return (
    <ReactQuill
      theme="snow"
      formats={formats}
      modules={modules}
      value={value}
      onChange={handleOnChange}
      placeholder="Content goes here..."
      ref={(el) => {
        reactQuillRef = el;
      }}
      style={{
        height: "fit-content",
        border: error ? "1px solid red" : "",
      }}
    />
  );
}
