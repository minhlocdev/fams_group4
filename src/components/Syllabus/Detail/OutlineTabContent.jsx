import React, { useContext } from "react";
import {
  Box,
  Collapse,
  Grid,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { ArrowDownCircle } from "../../../assets/scss/icon";
import Syllabusdetail from "../Detail/syllabusDetail";
import TrainingMaterialModal from "./TrainingMaterialModal";
import TimeAllocation from "../../shared/TimeAllocation";
import { useTheme } from "@emotion/react";
import { SyllabusContext } from "../../../context/SyllabusContext";
import { useGetSyllabusOutline } from "../../../services/queries/syllabusQuery";
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
export default function OutlineTabContent({ SyllabusID, timeallocation }) {
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
  const { openState, openTraining, handlePress, handleUnitClick, setUnitId } =
    useContext(SyllabusContext);
  const theme = useTheme();
  const isSM = useMediaQuery(theme.breakpoints.up("sm"));
  const isLG = useMediaQuery(theme.breakpoints.up("lg"));
  const { data } = useGetSyllabusOutline(SyllabusID);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} lg={10}>
        <Box style={{ overflow: "auto" }}>
          {data?.map((day, dayIndex) => (
            <Box key={dayIndex} sx={days}>
              <Box style={dropdown} onClick={() => handlePress(dayIndex)}>
                Day {day?.dayNumber}
              </Box>
              <Collapse in={Boolean(openState[dayIndex])} unmountOnExit>
                {day?.trainingUnits?.map((unit, unitIndex) => (
                  <Box
                    key={unitIndex}
                    onClick={() => {
                      handleUnitClick(dayIndex, unitIndex, day?.dayNumber);
                      setUnitId(unit?.unitCode);
                    }}
                    sx={{
                      width: "100%", // Default width for xs screens
                    }}
                  >
                    <Box
                      sx={
                        unitIndex === 0 ? dropdowncontentzero : dropdowncontent
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
                            width: "90%",
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
                            {"Unit " + unit?.unitCode}
                          </Box>
                          <Box>{unit?.unitName}</Box>
                        </Box>
                        <Box>
                          <ArrowDownCircle />
                        </Box>
                      </Box>
                      <Collapse in={Boolean(openState[dayIndex]?.[unitIndex])}>
                        <Box
                          sx={{ paddingLeft: { xs: "0", lg: "145px" } }}
                          onClick={(e) => e.stopPropagation()}
                        >
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
      <Grid item xs={12} lg={2} justifyContent="flex-start">
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
                <TimeAllocation
                  control
                  SyllabusID={SyllabusID}
                  timeallocation={timeallocation}
                />
              ) : (
                <TimeAllocation
                  SyllabusID={SyllabusID}
                  timeallocation={timeallocation}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
