import React, { useState } from "react";
import {
  FormControlLabel,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { textFields, textBox } from "../UserModal.style";

export default function DropDown({
  handleChange,
  formData,
  errors,
  defaultValue,
}) {
  const [hideLabel, setHideLabel] = useState(false);
  const Type = ["Super Admin", "Class Admin", "Trainer"];
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
            }}
            labelId="select-one-label"
            value={formData.rolename}
            onChange={(e) => {
              setHideLabel(e.target.value !== "");
              handleChange("rolename", e.target.value);
            }}
            error={Boolean(errors.rolename)}
            defaultValue={defaultValue ? defaultValue : ""}
          >
            {Type.map((value, index) => (
              <MenuItem key={index} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText sx={{ color: "#db2f2f" }}>
            {errors.rolename}
          </FormHelperText>
        </FormControl>
      }
      label="User Type"
      labelPlacement="start"
    />
  );
}
