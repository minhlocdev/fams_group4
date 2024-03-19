import React, { useContext, useState } from "react";
import {
  Box,
  Collapse,
  Grid,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { ArrowDownCircle } from "../../assets/scss/icon";
import Syllabusdetail from "../../components/Syllabus/syllabusDetail";
import TrainingMaterialModal from "./TrainingMaterialModal";
import TimeAllocation from "../shared/TimeAllocation";
import { useTheme } from "@emotion/react";
import { SyllabusContext } from "../../context/SyllabusContext";
const dropdown = {
  backgroundColor: "#2D3748",
  width: { xs: "100%", lg: "100%" },
  color: "white",
  textAlign: "left",
  padding: "10px",
};
const days = {
  display: "flex",
  flexDirection: "column",
  marginBottom: "2px",
  width: { xs: "100%", lg: "100%" },
};
const dropdowncontentzero = {
  display: "flex",
  width: { xs: "100%", md: "100%", lg: "100%" },
  backgroundColor: "#fff",
  border: "1px solid",
  padding: "15px",
  justifyContent: "space-between",
  flexDirection: "column",
};
const dropdowncontent = {
  display: "flex",
  width: { xs: "100%", md: "100%", lg: "100%" },
  backgroundColor: "#fff",
  border: "1px solid",
  padding: "15px",
  borderRadius: "0px 0px 10px 10px",
  justifyContent: "space-between",
  flexDirection: "column",
  marginBottom: "25px",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
};
export default function OutlineTabContent() {
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
  const {
    buttonData,
    setButtonData,
    openState,
    setOpenState,
    openTraining,
    handlePress,
    handleUnitClick,
    unitId,
    setUnitId,
  } = useContext(SyllabusContext);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const isSM = useMediaQuery(theme.breakpoints.up("sm"));
  const isLG = useMediaQuery(theme.breakpoints.up("lg"));
  React.useEffect(() => {
    setButtonData([
      {
        id: "1",
        content: [
          {
            id: "1",
            title: ".Netfunction",
            datasyllabus: [
              {
                id: "1",
                title: ".NET Introduction",
                output: "H4SD",
                time: "30mins",
                method: "Online",
                deliveryType: "Concept/Lecture",
                TrainingMaterial: [
                  {
                    title: ".Net Introduction Overview.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net Introduction patterm in lorem.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: "What is future.youtube",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net History.pdf",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                ],
              },

              {
                id: "2",
                title: "Declaration & Assignment",
                output: "H4SD",
                time: "30mins",
                method: "Offline",
                deliveryType: "Assignment/Lab",
                TrainingMaterial: [
                  {
                    title: ".Net Introduction Overview.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net Introduction patterm in lorem.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                ],
              },

              {
                id: "3",
                title: ".NET Pratical",
                output: "H4SD",
                time: "30mins",
                method: "Online",
                deliveryType: "Guide/Review",
                TrainingMaterial: [
                  {
                    title: "What is future.youtube",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net History.pdf",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                ],
              },
            ],
          },
          {
            id: "2",
            title: "Operator",
            datasyllabus: [
              {
                id: "1",
                title: ".NET Introduction",
                output: "H4SD",
                time: "30mins",
                method: "Online",
                deliveryType: "Concept/Lecture",
                TrainingMaterial: [
                  {
                    title: ".Net Introduction Overview.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net Introduction patterm in lorem.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: "What is future.youtube",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net History.pdf",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                ],
              },

              {
                id: "2",
                title: "Declaration & Assignment",
                output: "H4SD",
                time: "30mins",
                method: "Offline",
                deliveryType: "Assignment/Lab",
                TrainingMaterial: [
                  {
                    title: ".Net Introduction Overview.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net Introduction patterm in lorem.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: "What is future.youtube",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net History.pdf",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                ],
              },

              {
                id: "3",
                title: ".NET Introduction",
                output: "H4SD",
                time: "30mins",
                method: "Online",
                deliveryType: "Guide/Review",
                TrainingMaterial: [
                  {
                    title: ".Net Introduction Overview.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net Introduction patterm in lorem.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: "What is future.youtube",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net History.pdf",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "2",
        content: [
          {
            id: "3",
            title: "FlowConTrol",
            datasyllabus: [
              {
                id: "1",
                title: ".NET Introduction",
                output: "H4SD",
                time: "30mins",
                method: "Online",
                deliveryType: "Concept/Lecture",
                TrainingMaterial: [
                  {
                    title: ".Net Introduction Overview.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net Introduction patterm in lorem.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: "What is future.youtube",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net History.pdf",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                ],
              },

              {
                id: "2",
                title: "Declaration & Assignment",
                output: "H4SD",
                time: "30mins",
                method: "Offline",
                deliveryType: "Assignment/Lab",
                TrainingMaterial: [
                  {
                    title: ".Net Introduction Overview.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net Introduction patterm in lorem.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: "What is future.youtube",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net History.pdf",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                ],
              },

              {
                id: "3",
                title: ".NET Introduction",
                output: "H4SD",
                time: "30mins",
                method: "Online",
                deliveryType: "Guide/Review",
                TrainingMaterial: [
                  {
                    title: ".Net Introduction Overview.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net Introduction patterm in lorem.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: "What is future.youtube",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net History.pdf",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                ],
              },
            ],
          },
          {
            id: "4",
            title: "Basic OOP",
            datasyllabus: [
              {
                id: "1",
                title: ".NET Introduction",
                output: "H4SD",
                time: "30mins",
                method: "Online",
                deliveryType: "Concept/Lecture",
                TrainingMaterial: [
                  {
                    title: ".Net Introduction Overview.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net Introduction patterm in lorem.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: "What is future.youtube",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net History.pdf",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                ],
              },

              {
                id: "2",
                title: "Declaration & Assignment",
                output: "H4SD",
                time: "30mins",
                method: "Offline",
                deliveryType: "Assignment/Lab",
                TrainingMaterial: [
                  {
                    title: ".Net Introduction Overview.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net Introduction patterm in lorem.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: "What is future.youtube",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net History.pdf",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                ],
              },

              {
                id: "3",
                title: ".NET Introduction",
                output: "H4SD",
                time: "30mins",
                method: "Online",
                deliveryType: "Guide/Review",
                TrainingMaterial: [
                  {
                    title: ".Net Introduction Overview.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net Introduction patterm in lorem.pdf",
                    author: "Joseph",
                    date: "13/02/2024",
                  },
                  {
                    title: "What is future.youtube",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                  {
                    title: ".Net History.pdf",
                    author: "Warrior Tran",
                    date: "13/02/2024",
                  },
                ],
              },
            ],
          },
        ],
      },
    ]);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap-reverse",
        width: { xs: "85%", sm: "90%", lg: "100%" },
      }}
    >
      <Grid container direction={isMobile ? "column-reverse" : "row"}>
        <Grid item lg={10}>
          <Box style={{ height: "590px", overflow: "auto" }}>
            {buttonData.map((day, dayIndex) => (
              <Box key={dayIndex} sx={days}>
                <Box style={dropdown} onClick={() => handlePress(dayIndex)}>
                  Day {dayIndex + 1}
                </Box>
                <Collapse in={Boolean(openState[dayIndex])} unmountOnExit>
                  {day.content.map((unit, unitIndex) => (
                    <Box
                      key={unitIndex}
                      onClick={() => (
                        handleUnitClick(dayIndex, unitIndex, day.id),
                        setUnitId(unit.id)
                      )}
                      sx={{
                        width: "100%", // Default width for xs screens
                      }}
                    >
                      <Box
                        sx={
                          unitIndex === 0
                            ? dropdowncontentzero
                            : dropdowncontent
                        }
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            width: { xs: "100%", md: "100%", lg: "100%" },
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              width: "20%",
                              gap: {
                                xs: "none",
                                sm: "100px",
                                md: "100px",
                                lg: "100px",
                              },
                              flexDirection: { xs: "column", sm: "row" },
                            }}
                          >
                            <Box sx={{ textWrap: "nowrap" }}>
                              {"Unit " + unit.id}
                            </Box>
                            <Box>{unit.title}</Box>
                          </Box>
                          <Box>
                            <ArrowDownCircle />
                          </Box>
                        </Box>
                        <Collapse
                          in={Boolean(openState[dayIndex]?.[unitIndex])}
                        >
                          <Box sx={{ paddingLeft: { xs: "0", lg: "145px" } }}>
                            <Syllabusdetail unit={unit} day={day} />
                          </Box>
                        </Collapse>
                      </Box>
                    </Box>
                  ))}
                </Collapse>
              </Box>
            ))}
            {/* The modal */}
            {openTraining && <TrainingMaterialModal />}
          </Box>
        </Grid>
        <Grid item container lg={2} justifyContent="flex-start">
          <Box sx={{ width: { xs: "100%", lg: "100%" } }}>
            <Box
              sx={{
                width: "100%",
                height: "fit-content",
                borderRadius: "10px",
                border: "1px solid #cccc",
                marginLeft: "auto",
              }}
            >
              <Title>Time Allocation</Title>
              <Box
                sx={{
                  height: { xs: "409px", sm: "209px", lg: "409px" },
                  margin: "35px 0px 20px 0px",
                  width: { xs: "100%" },
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {isSM && !isLG ? (
                  <TimeAllocation control />
                ) : (
                  <TimeAllocation />
                )}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
