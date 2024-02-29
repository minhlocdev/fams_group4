import React, { useContext, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { SyllabusContext } from "../../context/SyllabusContext";

const SyllabusTab = () => {
  const { activeTab, handleTabChange } = useContext(SyllabusContext);
  const handleChange = (event, newValue) => {
    handleTabChange(newValue);
  };

  // const changeTabs = tabsInfo.map((i) => {
  //   if(i.value == )
  // })

  const tabsInfo = [
    {
      value: "one",
      name: "General",
    },
    {
      value: "two",
      name: "Outline",
    },
    {
      value: "three",
      name: "Other",
    },
    {
      value: "four",
      name: "Other",
    },
  ];

  return (
    <Box
      sx={{
        ".css-1jnyrx4-MuiButtonBase-root-MuiTab-root.Mui-selected": {
          color: "white",
        },
      }}
    >
      <Tabs
        value={activeTab}
        onChange={handleChange}
        //Remove tabIndicator
        TabIndicatorProps={{
          hidden: true,
        }}
        textColor="inherit"
        sx={{
          "& button": {
            borderRadius: "20px 20px 0px 0px",
            color: "white",
            width: "200px",
            height: "30px",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            minHeight: "30px",
          },
          "& button: active": {
            height: "30px",
            flexShrink: "10px",
            alignSelf: "stretch",
          },
          "& button: focus": {
            backgroundColor: "#2D3748",
          },
          "& .css-rypos4-MuiButtonBase-root-MuiTab-root.Mui-selected": {
            // color: "white",
          },
          "& .MuiTabs-flexContainer": {
            width: "80%",
            gap: "2px",
            borderBottom: "1px solid",
          },
          minHeight: "auto",
        }}
      >
        {tabsInfo.map((t, index) => (
          <Tab
            key={index}
            value={index}
            label={t.name}
            sx={{
              display: index === 3 ? "none" : "",
              backgroundColor: activeTab === index ? "#2D3748" : "#6D7684",
              color: "red",
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default SyllabusTab;
