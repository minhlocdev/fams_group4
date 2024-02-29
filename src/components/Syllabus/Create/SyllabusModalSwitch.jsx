import React from "react";
import { Box } from "@mui/material";

const switchStyles = {
  position: "relative",
  width: "315px",
  height: "34px",
  display: "flex",
  justifyContent: "flex-start",
};

const sliderStyles = {
  position: "absolute",
  width: "100px",
  cursor: "pointer",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  backgroundColor: "#D45B13",
  borderRadius: "50px",
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  transition: " 0.2s",
};

const sliderStyles2 = {
  position: "absolute",
  width: "100px",
  cursor: "pointer",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  backgroundColor: "#2D3748",
  borderRadius: "50px",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  transition: " 0.2s",
};

const thumbStyles = {
  position: "absolute",
  content: '""',
  height: "26px",
  width: "26px",
  right: "4px",
  top: "4px",
  backgroundColor: "#2D3748",
  borderRadius: "50px",
  transition: "linear 0.3s",
};

const thumbStyles2 = {
  position: "absolute",
  content: '""',
  height: "26px",
  width: "26px",
  right: "4px",
  top: "4px",
  backgroundColor: "#D45B13",
  borderRadius: "50px",
  transition: "linear 0.3s",
};

const activeTextStyle = {
  color: "#fff",
  fontSize: "14px",
  paddingLeft: "13px",
  transition: " 0.2s",
};
const activeTextStyle2 = {
  color: "#fff",
  fontSize: "14px",
  paddingRight: "5px",
  transition: " 0.2s",
};
export default function Switch({
  isactive,
  setActive,
  handleChange,
  formData,
}) {
  return (
    <Box sx={switchStyles}>
      <div
        className="slider"
        style={isactive ? sliderStyles2 : sliderStyles}
        onClick={() => {
          setActive(!isactive);
          handleChange("Method", !isactive ? "Offline" : "Online");
        }}
      >
        {isactive ? (
          <div style={activeTextStyle2}>Offline</div>
        ) : (
          <div style={activeTextStyle}>Online</div>
        )}
        <div
          value={formData.Method}
          className="thumb"
          style={
            isactive
              ? { ...thumbStyles2, transform: "translateX(-66px)" }
              : thumbStyles
          }
          onClick={() => {
            setActive(!isactive);
            handleChange("Method", !isactive ? "Offline" : "Online");
          }}
        ></div>
      </div>
    </Box>
  );
}
