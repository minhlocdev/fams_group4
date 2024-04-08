import React, { useContext, useState } from "react";
import { Box, Button, Collapse, Grid, IconButton } from "@mui/material";
import { SyllabusContext } from "../../../context/SyllabusContext";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { SyllabusDeleteWarningModal } from "./SyllabusWarningModal";
import Unit from "../Create/Unit";

const button = {
  backgroundColor: "#2d3748",
  borderRadius: "8px",
  color: "white",
  padding: "5px 15px",
  cursor: "pointer",
  "&:hover": { backgroundColor: "rgb(72 147 222 / 81%)" },
  fontWeight: "bold",
  "&.Mui-disabled": { backgroundColor: "#ddd" },
};
export default function Day({ setTotalDay }) {
  const {
    outline,
    setOutline,
    handleTimeAllocation,
    error,
    handleFieldValidation,
  } = useContext(SyllabusContext);
  const [isConfirmDelete, setConfirmDelete] = useState(true);
  const [deletedUnitIds, setDeletedUnitIds] = useState([]);
  const [openState, setOpenState] = useState({});

  const handlePress = (dayIndex) => {
    setOpenState((prevOpenState) => ({
      ...prevOpenState,
      [dayIndex]: !prevOpenState[dayIndex],
    }));
  };
  const handleClickConfirmDelete = (event, id) => {
    setConfirmDelete(isConfirmDelete === id ? -1 : id);
  };
  const handleClose = () => {
    setConfirmDelete(false);
  };
  const removeDay = (dayid, dayIndex) => {
    const deletedDay = outline.find((day) => day.dayNumber === dayid);
    handleFieldValidation("unitTitle", "ngu");
    deletedDay.trainingUnits.forEach((unit) => {
      unit.trainingContents.forEach((dataUnit) => {
        handleTimeAllocation(
          dataUnit.deliveryType,
          "remove",
          dataUnit.duration
        );
      });
    });
    const deletedUnitIds = deletedDay.trainingUnits.map(
      (unit) => unit.unitCode
    );
    setDeletedUnitIds((prevDeletedUnits) => [
      ...prevDeletedUnits,
      ...deletedUnitIds,
    ]);
    const tempDay = outline.filter((item) => item.dayNumber !== dayid);
    const updateData = tempDay.map((item, i) => ({
      ...item,
      dayNumber: i + 1,
    }));
    setOutline(updateData);
    setTotalDay(updateData.length);

    handleClose();
  };
  const getTotalUnitCount = () => {
    return outline.reduce((total, day) => total + day.trainingUnits.length, 0);
  };
  const addUnit = (index) => {
    const tempArray = [...outline];
    let unitIds;
    handleFieldValidation("unitTitle", "");
    if (deletedUnitIds.length > 0) {
      let deletedUnitId = deletedUnitIds.sort((a, b) => a - b);
      unitIds = deletedUnitId.shift();
      const newUnit = {
        unitCode: unitIds,
        unitName: null,
        trainingContents: [],
      };
      tempArray[index].trainingUnits.push(newUnit);
      setOutline(tempArray);
      setDeletedUnitIds(deletedUnitIds);
    } else {
      unitIds = getTotalUnitCount();
      const newUnit = {
        unitCode: unitIds + 1,
        unitName: null,
        trainingContents: [],
      };
      tempArray[index].trainingUnits.push(newUnit);
      setOutline(tempArray);
    }
  };
  return (
    <Box
      sx={{
        boxShadow: "0px 20px 40px 0px rgba(0, 0, 0, 0.16)",
        maxHeight: "500px",
        overflowY: "auto",
      }}
    >
      {/* //Day */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {outline?.map((day, dayIndex) => (
            <div key={dayIndex}>
              <Box
                sx={{
                  display: "flex",
                  gap: "5px",
                  padding: "10px",
                  height: "44px",
                  backgroundColor: "#2D3748",
                  color: "white",
                  borderBottom: "1px solid white",
                }}
                onClick={() =>
                  // setExpand(expand === dayIndex ? -1 : dayIndex)
                  handlePress(dayIndex)
                }
              >
                Day {day.dayNumber}
                <IconButton
                  onClick={(e) => handleClickConfirmDelete(e, dayIndex)}
                >
                  <RemoveCircleOutlineIcon sx={{ color: "red" }} />
                </IconButton>
              </Box>
              <SyllabusDeleteWarningModal
                isConfirm={isConfirmDelete}
                setConfirm={setConfirmDelete}
                ConfirmDelete={() => removeDay(day.dayNumber, dayIndex)}
                id={dayIndex}
              />
              {outline[dayIndex]?.trainingUnits?.length !== 0 && (
                <Collapse
                  in={Boolean(openState[dayIndex])}
                  sx={{}}
                  timeout="auto"
                  unmountOnExit
                >
                  {outline[dayIndex].trainingUnits.map((item, index) => (
                    <Unit
                      key={index}
                      day={day}
                      unitIndex={index}
                      dayIndex={dayIndex}
                      openState={openState}
                      setOpenState={setOpenState}
                      setDeletedUnitIds={setDeletedUnitIds}
                      unit={item}
                    />
                  ))}
                  {/* //Unit */}
                </Collapse>
              )}
              <Collapse
                in={Boolean(openState[dayIndex])}
                unmountOnExit
                sx={{ padding: "10px" }}
              >
                <Button
                  sx={button}
                  onClick={() => addUnit(dayIndex)}
                  disabled={error["unitTitle"]}
                >
                  Add Unit
                </Button>
              </Collapse>
            </div>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
}
