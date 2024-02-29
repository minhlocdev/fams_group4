import React, { useContext, useRef, useState } from "react";
import {
  Box,
  Button,
  Collapse,
  IconButton,
} from "@mui/material";
import { SyllabusContext } from "../../../context/SyllabusContext";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { SyllabusDeleteWarningModal } from "./SyllabusWarningModal";
import Unit from "../Create/Unit"

const button = {
  color: "white",
  width: "106px",
  borderRadius: "10px",
  height: "38px",
  backgroundColor: "#2D3748",
  "&:hover": { backgroundColor: "rgb(72 147 222 / 81%)" },
  fontWeight: "bold",
  margin: "10px",
};
export default function Day({setTotalDay}) {
  const { outline, setOutline, error, handleFieldValidation } =
  useContext(SyllabusContext);
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
    const deletedDay = outline.find((day) => day.id === dayid);
    const deletedUnitIds = deletedDay.content.map((unit) => unit.id);
    setDeletedUnitIds((prevDeletedUnits) => [
      ...prevDeletedUnits,
      ...deletedUnitIds,
    ]);
    const tempDay = outline.filter((item) => item.id !== dayid);
    const updateData = tempDay.map((item, i) => ({
      ...item,
      id: i,
    }));
    setOutline(updateData);
    setTotalDay(updateData.length);

    handleClose();
  };
  const getTotalUnitCount = () => {
    return outline.reduce((total, day) => total + day.content.length, 0);
  };

  const addUnit = (index) => {
    let unitId;
    if (deletedUnitIds.length > 0) {
      unitId = deletedUnitIds.shift();
      setDeletedUnitIds(deletedUnitIds);
    } else {
      unitId = getTotalUnitCount();
    }
    const newUnit = {
      id: unitId,
      title: null,
      dataUnit: [],
    };
    const tempArray = [...outline];

    tempArray[index].content.push(newUnit);
    setOutline(tempArray);
    // onChange(outline, "outline");
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
      {outline?.map((day, dayIndex) => (
        <>
          <Box
            key={dayIndex}
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
            Day {day.id + 1}
            <IconButton onClick={(e) => handleClickConfirmDelete(e, dayIndex)}>
              <RemoveCircleOutlineIcon sx={{ color: "red" }} />
            </IconButton>
          </Box>
          <SyllabusDeleteWarningModal
            isConfirm={isConfirmDelete}
            setConfirm={setConfirmDelete}
            ConfirmDelete={() => removeDay(day.id, dayIndex)}
            id={dayIndex}
          />
          {outline[dayIndex]?.content?.length !== 0 && (
            <Collapse
              in={openState[dayIndex]}
              sx={{}}
              timeout="auto"
              unmountOnExit
            >
              {/* //Unit */}
              <Unit day={day} dayIndex={dayIndex} openState={openState} setOpenState={setOpenState}/>
            </Collapse>
          )}
          <Collapse
            in={openState[dayIndex]}
            unmountOnExit
            sx={{ padding: "10px" }}
          >
            <Button sx={button} onClick={() => addUnit(day.id, dayIndex)}>
              Add Unit
            </Button>
          </Collapse>
        </>
      ))}
    </Box>
  );
}
