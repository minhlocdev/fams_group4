import React from "react";

import { Box, Collapse } from "@mui/material";
import { ArrowDownCircle } from "../../assets/scss/icon";
import Syllabusdetail from "../../components/Syllabus/Detail/syllabusDetail";
import TrainingMaterialModal from "../Syllabus/Detail/TrainingMaterialModal";
import { useGetSyllabusOutline } from "../../services/queries/syllabusQuery";
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
export default function SyllabusDay({ outlineID }) {
  // const [openState, setOpenState] = useState({});
  // const [openTraining, setOpenTraining] = useState(false); // state for open modal
  // const [selectedDay, setSelectedDay] = useState(null);
  // const [unitId, setUnitId] = useState(null);
  const { data } = useGetSyllabusOutline(outlineID); //State for the origin data
  const { openState, openTraining, handlePress, handleUnitClick, setUnitId } =
    React.useContext(SyllabusContext);

  return (
    <Box style={{ overflow: "auto" }}>
      {data?.map((day, dayIndex) => (
        <Box key={dayIndex} sx={days}>
          <Box style={dropdown} onClick={() => handlePress(dayIndex)}>
            Day {day.dayNumber}
          </Box>
          <Collapse in={Boolean(openState[dayIndex])} unmountOnExit>
            {day.trainingUnits?.map((unit, unitIndex) => (
              <Box
                key={unitIndex}
                onClick={() => {
                  handleUnitClick(dayIndex, unitIndex, day.dayNumber);
                  setUnitId(unit.unitCode);
                }}
                sx={{
                  width: "100%", // Default width for xs screens
                }}
              >
                <Box
                  sx={unitIndex === 0 ? dropdowncontentzero : dropdowncontent}
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
                        {"Unit " + unit.unitCode}
                      </Box>
                      <Box>{unit.unitName}</Box>
                    </Box>
                    <Box>
                      <ArrowDownCircle />
                    </Box>
                  </Box>
                  <Collapse in={Boolean(openState[dayIndex]?.[unitIndex])}>
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
  );
}
