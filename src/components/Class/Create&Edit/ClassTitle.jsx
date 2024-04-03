import React, { useContext, useRef, useState } from "react";
import ClassContext from "../../../context/ClassContext";
import { Button, Stack, TextField, Typography } from "@mui/material";

export default function ClassTitle() {
  const { classTitle, setClassTitle, setActiveStep } = useContext(ClassContext);
  const [error, setError] = useState("");
  const inputRef = useRef("");
  const validateTitle = () => {
    if (String(inputRef.current.value).trim() === "") {
      setError("Please input class name");
      return false;
    }
    return true;
  };
  const handleSaveTitle = (value) => {
    validateTitle() && setClassTitle(value);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setActiveStep(1);
    }
  };
  return (
    <Stack direction={"row"} spacing={2} alignItems={"center"} p={2}>
      <Typography variant="p">Class</Typography>
      <TextField
        error={error ? true : false}
        required
        placeholder={!error ? "Name the class" : "Please input class name"}
        ref={inputRef}
        value={classTitle}
        sx={{
          width: "400px",
          "& .MuiInputBase-input": {
            padding: "10px 10px",
          },
        }}
        onKeyDown={handleKeyDown}
        onChange={(e) => handleSaveTitle(e.target.value)}
      />
      <Button
        sx={{
          color: "whitesmoke",
          backgroundColor: "#2D3748",
          padding: "5px 10px",
          borderRadius: "10px",
          fontWeight: "600",
          "&:hover": {
            backgroundColor: "rgba(25, 118, 210, 0.5)",
          },
        }}
        onClick={() => {
          setActiveStep(1);
        }}
      >
        Create
      </Button>
    </Stack>
  );
}
