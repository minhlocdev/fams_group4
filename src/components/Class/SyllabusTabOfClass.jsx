import React, { useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SyllabusCardOfClass from "./SyllabusCardOfClass"; // Import SyllabusCardOfClass
import Other from "./Other";
import Budget from "./Budget";
import AttendeeList from "./AttendeeList";
import ClassContext from "../../context/ClassContext";

const SyllabusTabOfClass = () => {
  const tabsInfo = [
    {
      value: 0,
      name: "Training Program",
    },
    {
      value: 1,
      name: "Attendee List",
    },
    {
      value: 2,
      name: "Budget",
    },
    {
      value: 3,
      name: "Other",
    },
  ];
  const { activeTab, handleTabChange } = useContext(ClassContext);
  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        TabIndicatorProps={{
          style: { display: "none" },
        }}
        textColor="inherit"
        sx={{
          "& .MuiTabs-flexContainer": {
            gap: "2px",
          },
        }}
      >
        {tabsInfo.map((t) => (
          <Tab
            key={t.value}
            value={t.value}
            label={t.name}
            sx={{
              borderRadius: "20px 20px 0px 0px",
              color: "white",
              width: "200px",
              height: "30px",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              minHeight: "30px",
              backgroundColor: activeTab === t.value ? "#2D3748" : "#6D7684",
              "&:hover": {
                backgroundColor: "#2D3748",
              },
              "& .MuiTab-wrapper": {
                fontSize: "14px",
              },
            }}
          />
        ))}
      </Tabs>
      {activeTab === 0 && <SyllabusCardOfClass />}
      {activeTab === 1 && <AttendeeList />}
      {activeTab === 2 && <Budget />}
      {activeTab === 3 && <Other />}
    </Box>
  );
};

export default SyllabusTabOfClass;
