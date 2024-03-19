import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  TextField,
  useMediaQuery,
} from "@mui/material";
import { ArrowDownCircle } from "../../../assets/scss/icon";
import CreateIcon from "@mui/icons-material/Create";
import { SyllabusContext } from "../../../context/SyllabusContext";
import DataUnit from "../Create/DataUnit";
import { DeleteOutline } from "@mui/icons-material";

const button = {
  backgroundColor: "#2d3748",
  borderRadius: "8px",
  color: "white",
  padding: "5px 15px",
  cursor: "pointer",
  "&:hover": { backgroundColor: "rgb(72 147 222 / 81%)" },
  fontWeight: "bold",
};
const textField = {
  width: { xs: "40%", sm: "20%", lg: "20%" },
  height: "36px",
  "& .MuiInputBase-root": {
    // width: "174px",
    height: "36px",
  },
};
const hoursStyle = {
  fontSize: "12px",
  fontStyle: "italic",
};
export default function Unit({ day, dayIndex, openState, setOpenState }) {
  const { outline, setOutline, error, handleFieldValidation } =
    useContext(SyllabusContext);
  const [title, setTitle] = useState({});
  const [renamingUnit, setRenamingUnit] = useState(null);

  const handleCreateTitle = (e, dayIndex, unitIndex) => {
    const tempArray = [...outline];
    let tempContent = tempArray[dayIndex].content;
    handleFieldValidation(`title${unitIndex}`, title[unitIndex]);
    if (error[`title${unitIndex}`]) {
      e.preventDefault();
    } else {
      tempContent[unitIndex].title = title[unitIndex];
      setOutline(tempArray);
    }
  };
  const handleTitle = (e, unitIndex) => {
    setTitle((prev) => ({
      ...prev,
      [unitIndex]: e.target.value,
    }));
    handleFieldValidation(`title${unitIndex}`, e.target.value);
  };
  const handleRenameTitle = (e, dayIndex, unitIndex) => {
    e.preventDefault();
    const tempArray = [...outline];
    tempArray[dayIndex].content[unitIndex].title = e.target.value;
    setOutline(tempArray);
  };

  const handleUnitClick = (dayIndex, unitIndex) => {
    setOpenState((prevOpenState) => ({
      ...prevOpenState,
      [dayIndex]: {
        ...(prevOpenState[dayIndex] || {}),
        [unitIndex]: !prevOpenState[dayIndex][unitIndex],
      },
    }));
  };
  function CountTotalTime(dataUnit) {
    let totalTime = 0;
    for (let index = 0; index < dataUnit.length; index++) {
      totalTime += parseInt(dataUnit[index].TrainingTime, 10);
    }
    return totalTime;
  }

  const handleDeleteUnit = (e, unit) => {
    e.preventDefault();
    const tempArray = [...outline];
    let tempContent = tempArray[dayIndex].content;
    let deletedUnit = tempContent.filter((content) => content.id !== unit.id);
    tempContent = deletedUnit;
    tempArray[dayIndex].content = tempContent;
    setOutline(tempArray);
  };

  return (
    <>
      {outline[dayIndex]?.content?.map((unit, unitIndex) => (
        <Box
          key={unitIndex}
          sx={{
            display: "flex",
            padding: "10px 16px",
            gap: "10px",
            alignItems: "flex-start",
            justifyContent: "space-between",
            borderBottom: "1px solid",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              gap: "34px",
              alignItems: "baseline",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: unit.title === null ? "center" : "flex-start",
                gap: "5px",
                width: "100%",
                justifyContent: {
                  xs: "space-between",
                  sm: "space-between",
                  md: "space-around",
                  lg: "flex-start",
                },
              }}
            >
              <Box sx={{ minWidth: "50px" }}>Unit {unit.id + 1}</Box>
              {unit.title === null ? (
                <>
                  <TextField
                    required
                    error={error[`title${unitIndex}`]}
                    sx={textField}
                    value={title[unitIndex]}
                    onChange={(e) => handleTitle(e, unitIndex)}
                    name="title"
                    helperText={
                      error[`title${unitIndex}`] ? "This field is required" : ""
                    }
                  ></TextField>
                  <Button
                    type="submit"
                    sx={button}
                    onClick={(e) => handleCreateTitle(e, dayIndex, unitIndex)}
                  >
                    Create
                  </Button>
                </>
              ) : (
                <>
                  <Box
                    sx={{
                      display: "flex",
                      width: { xs: "74%", lg: "100%" },
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        alignItems: "center",
                      }}
                    >
                      {renamingUnit === unitIndex ? (
                        <>
                          <TextField
                            sx={textField}
                            value={unit.title}
                            onChange={(e) =>
                              handleRenameTitle(e, dayIndex, unitIndex)
                            }
                            // inputRef={titleRef}
                            name="title"
                          />
                        </>
                      ) : (
                        <Box>{unit.title}</Box>
                      )}
                      <IconButton
                        size="small"
                        onClick={(e) =>
                          setRenamingUnit(
                            renamingUnit === unitIndex ? -1 : unitIndex
                          )
                        }
                        sx={{ padding: 0 }}
                      >
                        <CreateIcon />
                      </IconButton>

                      <IconButton
                        size="small"
                        sx={{ padding: 0 }}
                        onClick={(e) => handleDeleteUnit(e, unit)}
                      >
                        <DeleteOutline />
                      </IconButton>
                    </Box>
                    {/* //dataUnit */}
                    <Box sx={hoursStyle}>{`${(
                      CountTotalTime(unit.dataUnit) / 60
                    ).toFixed(1)}hrs`}</Box>
                  </Box>
                  <IconButton
                    onClick={() => handleUnitClick(dayIndex, unitIndex)}
                  >
                    <ArrowDownCircle />
                  </IconButton>
                </>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
            }}
          >
            <DataUnit
              unit={unit}
              day={day}
              dayIndex={dayIndex}
              unitIndex={unitIndex}
              openState={openState}
              setOpenState={setOpenState}
            />
          </Box>
        </Box>
      ))}
    </>
  );
}
