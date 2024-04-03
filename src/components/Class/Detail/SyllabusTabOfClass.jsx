import React, { useContext } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import SyllabusCardOfClass from "./SyllabusCardOfClass";
import Other from "./Other";
import Budget from "./Budget";
import AttendeeList from "./AttendeeList";
import ClassContext from "../../../context/ClassContext";
import { useLocation } from "react-router-dom";
import SyllabusClassCreate from "../Create&Edit/SyllabusClassCreate";

const SyllabusTabOfClass = () => {
  const location = useLocation();
  const isDetail = location.pathname.includes("detail");
  const isCreate = location.pathname.includes("create");
  const isEdit = location.pathname.includes("edit");
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
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          "& .MuiTabs-flexContainer": {
            gap: "2px",
          },
          maxWidth: { xs: "100%" },
        }}
      >
        {tabsInfo.map((t) => (
          <Tab
            wrapped
            key={t.value}
            value={t.value}
            label={t.name}
            sx={{
              borderRadius: "20px 20px 0px 0px",
              color: "white",
              width: { xs: "150px", md: "200px" },
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
      {activeTab === 0 && isDetail ? (
        <SyllabusCardOfClass />
      ) : (
        activeTab === 0 && (isCreate || isEdit) && <SyllabusClassCreate />
      )}
      {activeTab === 1 && <AttendeeList />}
      {activeTab === 2 && <Budget />}
      {activeTab === 3 && <Other />}
    </Box>
  );
};

export default SyllabusTabOfClass;
