import React, { useEffect, useState, useContext } from "react";
import { Box, Typography, styled } from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import RichText from "../../Syllabus/RichText";
import TimeAllocation from "../../shared/TimeAllocation";
import { SyllabusContext } from "../../../context/SyllabusContext";

const Other = {
  scheme1: [
    {
      id: "quiz",
      title: "Quiz *",
      name: "quiz",
      value: "15",
    },
    {
      id: "assignment",
      title: "Assignment *",
      name: "assignment",
      value: "15",
    },
    {
      id: "final",
      title: "Final *",
      name: "final",
      value: "70",
    },
  ],
  scheme2: [
    {
      id: "final-theory",
      title: "Final Theory*",
      name: "finalTheory",
      value: "40",
    },
    {
      id: "final-practice",
      title: "Final Practice*",
      name: "finalPractice",
      value: "60",
    },
  ],
  gpa: [
    {
      id: "gpa",
      name: "gpa",
      title: "GPA *",
      value: "70",
    },
  ],
};
export default function SyllabusOther() {
  const { other, setOther, error, handleFieldValidation } =
    useContext(SyllabusContext);

  const Title = styled(Typography)({
    height: "34px",
    fontWeight: "bold",
    background: "#2D3748",
    color: "white",
    borderRadius: "10px 10px 0 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
  const BoxTitle = {
    borderRadius: "10px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.16)",
  };
  const TextFieldStyle = {
    width: "47px",
    height: "27px",
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
      display: "none",
    },
    "& input[type=number]": {
      MozAppearance: "textfield",
    },
    ".MuiFormHelperText-root": {
      margin: 0,
    },
    ".MuiInputBase-input": {
      width: "27px",
      height: "27px",
      padding: 0,
      textAlign: "center",
      fontStyle: "italic",
    },
    ".MuiOutlinedInput-root": {
      paddingRight: 0,
      marginRight: "5px",
      border: "1px solid grey",
      borderRadius: "10px",
    },
  };
  const handleOtherChange = (event) => {
    const copy = { ...other };
    copy[event.target.name] = event.target.value;
    setOther(copy);
    handleFieldValidation(event.target.name, event.target.value);
  };
  function isQuillEmpty(value) {
    if (
      value.replace(/<(.|\n)*?>/g, "").trim().length === 0 &&
      !value.includes("<img")
    ) {
      return "";
    }
    return "false";
  }

  const handleRichText = (content) => {
    const copy = { ...other };
    copy.richtext = content;
    handleFieldValidation("richtext", isQuillEmpty(content));
    setOther(copy);
  };

  return (
    <>
      <Box sx={{ paddingTop: "10px", paddingLeft: "20px", width: "80%" }}>
        <Stack
          spacing={2}
          useFlexGap
          direction="row"
          sx={{
            height: "310px",
            marginBottom: "10px",
          }}
        >
          <Box sx={BoxTitle} width="50%">
            <Title>Time Allocation</Title>
            <Box sx={{ height: "209px", margin: "35px 0px 20px 0px" }}>
              <TimeAllocation control />
            </Box>
          </Box>
          <Box
            sx={{
              width: "70%",
              borderRadius: "10px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.16)",
            }}
          >
            <Title>Assessment scheme</Title>
            <Stack
              direction="column"
              spacing={2}
              sx={{
                padding: "10px 0 10px 0",
                margin: "0 16px 0 16px",
                borderBottom: "1px solid",
              }}
            >
              {Other.scheme1.map((item, index) => (
                <Box key={index} sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      display: "flex",
                      width: "172px",
                      justifyContent: "space-between",
                    }}
                  >
                    {item.title}
                    <TextField
                      error={error[item.name]}
                      required
                      id={item.id}
                      name={item.name}
                      value={other[item.name] ? other[item.name] : ""}
                      onChange={handleOtherChange}
                      helperText={error[item.name] ? `required` : ""}
                      sx={TextFieldStyle}
                      InputProps={{
                        endAdornment: "%",
                        inputProps: {
                          type: "number",
                          maxLength: 2,
                        },
                      }}
                      onKeyDown={(event) => {
                        if (
                          event?.key === "-" ||
                          event?.key === "+" ||
                          event?.key === "="
                        ) {
                          event.preventDefault();
                        }
                      }}
                    ></TextField>
                  </Box>
                </Box>
              ))}
            </Stack>
            <Box
              sx={{
                padding: "10px 0 10px 0",
                margin: "0 16px 0 16px",
                borderBottom: "1px solid",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {Other.scheme2.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    width: "172px",
                    justifyContent: "space-between",
                  }}
                >
                  {item.title}
                  <TextField
                    required
                    id={item.id}
                    error={error[item.name]}
                    name={item.name}
                    value={other[item.name] ? other[item.name] : ""}
                    type="number"
                    onChange={handleOtherChange}
                    helperText={error[item.name] ? `required` : ""}
                    sx={TextFieldStyle}
                    InputProps={{
                      endAdornment: "%",
                      inputProps: { maxLength: 2 },
                    }}
                    onKeyDown={(event) => {
                      if (
                        event?.key === "-" ||
                        event?.key === "+" ||
                        event?.key === "="
                      ) {
                        event.preventDefault();
                      }
                    }}
                  ></TextField>
                </Box>
              ))}
            </Box>
            <Box sx={{ padding: "10px 16px" }}>
              <Typography fontWeight="bold">Passing criteria</Typography>
              <Box sx={{ marginTop: "10px", display: "flex", gap: "18%" }}>
                {Other.gpa.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      width: "172px",
                      justifyContent: "space-between",
                    }}
                  >
                    {item.title}
                    <TextField
                      required
                      id={item.id}
                      error={error[item.name]}
                      name={item.name}
                      value={other[item.name] ? other[item.name] : ""}
                      type="number"
                      onChange={handleOtherChange}
                      helperText={error[item.name] ? `required` : ""}
                      sx={TextFieldStyle}
                      InputProps={{
                        endAdornment: "%",
                        inputProps: { maxLength: 2 },
                      }}
                      onKeyDown={(event) => {
                        if (
                          event?.key === "-" ||
                          event?.key === "+" ||
                          event?.key === "="
                        ) {
                          event.preventDefault();
                        }
                      }}
                    ></TextField>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Stack>
        <Box sx={BoxTitle}>
          <Title>Training delivery principle</Title>
        </Box>
        <RichText
          value={other.richtext ? other.richtext : ""}
          onChange={handleRichText}
        />
      </Box>
    </>
  );
}
