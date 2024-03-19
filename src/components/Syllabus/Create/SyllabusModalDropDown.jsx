import React, { useState } from "react";
import {
  FormControlLabel,
  Select,
  MenuItem,
  ListItemIcon,
  ListItemText,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import {
  QuizIcon,
  ConceptIcon,
  AssignmentIcon,
  GuideIcon,
  ExamIcon,
  WorkShopIcon,
} from "../../../assets/scss/icon";
const textBox = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  "& .MuiFormControlLabel-label": {
    fontSize: "16px",
    fontWeight: "500",
    color: "rgb(0, 0, 0)",
  },
  flexDirection: { xs: "column-reverse", lg: "row-reverse" },
  alignItems: { xs: "flex-start", lg: "" },
};
const textFields = {
  display: "flex",
  width: { xs: "90%", lg: "315px" },
  flexDirection: "row-reseve",
  "& .MuiInputBase-input": {
    padding: "10px",
  },
  "& .MuiInputBase-input::placeholder": {
    fontStyle: "italic",
    fontWeight: "bolder",
    color: "rgb(0, 0, 0)",
  },
};

export default function DropDown({
  handleChange,
  formData,
  errors,
  defaultValue,
}) {
  const [hideLabel, setHideLabel] = useState(false);
  const Type = [
    {
      type: "Assignment/Lab",
      icon: <AssignmentIcon />,
    },
    {
      type: "Concept/Lecture",
      icon: <ConceptIcon />,
    },
    {
      type: "Guide/Review",
      icon: <GuideIcon />,
    },
    {
      type: "Test/Quiz",
      icon: <QuizIcon />,
    },
    {
      type: "Exam",
      icon: <ExamIcon />,
    },
    {
      type: "Seminar/Workshop",
      icon: <WorkShopIcon />,
    },
  ];
  return (
    <FormControlLabel
      sx={textBox}
      control={
        <FormControl sx={textFields}>
          <InputLabel
            sx={{
              fontStyle: "italic",
              marginTop: "-5px",

              display: hideLabel ? "none" : "block",
            }}
            id="select-one-label"
          >
            Select One
          </InputLabel>
          <Select
            sx={{
              borderRadius: "5px",
              backgroundColor: "#FFFFFF",
              boxShadow:
                "0px 1px 3px 0px rgba(0, 0, 0, 0.30), 0px 4px 8px 3px rgba(0, 0, 0, 0.15)",
              "& .MuiInputBase-input": {
                display: "flex",
              },
            }}
            labelId="select-one-label"
            value={formData.DeliveryType}
            onChange={(e) => {
              setHideLabel(e.target.value !== "");
              handleChange("DeliveryType", e.target.value);
            }}
            error={Boolean(errors.DeliveryType)}
            defaultValue={defaultValue ? defaultValue : ""}
          >
            {Type.map((value, index) => (
              <MenuItem key={index} value={value.type}>
                <ListItemIcon>{value.icon}</ListItemIcon>
                <ListItemText>{value.type}</ListItemText>
              </MenuItem>
            ))}
          </Select>
          <FormHelperText sx={{ color: "#db2f2f" }}>
            {errors.DeliveryType}
          </FormHelperText>
        </FormControl>
      }
      label="Delivery Type"
      labelPlacement="start"
    />
  );
}
