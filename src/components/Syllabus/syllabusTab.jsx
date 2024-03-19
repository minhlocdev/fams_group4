import React, { useContext, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { SyllabusContext } from "../../context/SyllabusContext";
import { Grid, useMediaQuery, useTheme } from "@mui/material";

const SyllabusTab = () => {
  const { activeTab, handleTabChange } = useContext(SyllabusContext);
  const handleChange = (event, newValue) => {
    handleTabChange(newValue);
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  //Add useTheme and useMediaQuery
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
        width: "100%",
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
          "& button: focus": {
            backgroundColor: "#2D3748",
          },
          "& .MuiButtonBase-root": {
            borderRadius: "20px 20px 0px 0px",
            color: "white",
            width: { xs: "30%" },
            // height: "1%",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            minHeight: "5%",
          },
          "& .MuiTab-root": {
            width: "20%",
            height: "37px",
          },
          "& .MuiTabs-flexContainer": {
            gap: "2px",
            color: "white",
            alignItems: "center",
            cursor: "pointer",
          },
        }}
        className="Keno"
      >
        {tabsInfo.map((t, index) => (
          <Tab
            key={index}
            value={index}
            label={t.name}
            sx={{
              display: index === 3 ? "none" : "",
              backgroundColor: activeTab === index ? "#2D3748" : "#6D7684",
              color: "white",
            }}
            className="CEO"
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default SyllabusTab;
