import React, { useContext, useState } from "react";
import { Box, Button, IconButton, TextField } from "@mui/material";
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
export default function Unit({
  day,
  dayIndex,
  unitIndex,
  openState,
  setOpenState,
  setDeletedUnitIds,
  unit,
}) {
  const {
    outline,
    setOutline,
    error,
    handleFieldValidation,
    handleTimeAllocation,
  } = useContext(SyllabusContext);
  const [renamingUnit, setRenamingUnit] = useState(null);
  const [title, setTitle] = useState("");
  const [isShow, setIsShow] = useState(true);

  const handleCreateTitle = (e, unitIndex, unitid) => {
    e.preventDefault();
    const tempArray = [...outline];
    let tempContent = tempArray[dayIndex].trainingUnits;
    handleFieldValidation(`unitTitle`, title.trim());
    if (title !== "") {
      tempContent[unitIndex].unitName = title;
      setOutline(tempArray);
    }
  };

  const handleRenameTitle = (e, dayIndex, unitIndex) => {
    e.preventDefault();
    const tempArray = [...outline];
    tempArray[dayIndex].trainingUnits[unitIndex].unitName = e.target.value;
    handleFieldValidation("unitTitle", unit.unitName.trim());
    setOutline(tempArray);
  };
  const checkKeyDownRename = (e) => {
    if (e.key === "Enter") {
      setRenamingUnit(
        renamingUnit === unitIndex && !error[`unitTitle`] ? -1 : unitIndex
      );
      e.preventDefault();
    }
  };
  const handleUnitClick = (dayIndex, unitIndex) => {
    const dataUnitsExist =
      outline[dayIndex]?.trainingUnits[unitIndex]?.trainingContents?.length > 0;
    if (dataUnitsExist) {
      setOpenState((prevOpenState) => ({
        ...prevOpenState,
        [dayIndex]: {
          ...(prevOpenState[dayIndex] || {}),
          [unitIndex]: !prevOpenState[dayIndex][unitIndex],
        },
      }));
    } else {
      setOpenState((prevOpenState) => ({
        ...prevOpenState,
        [dayIndex]: {
          ...(prevOpenState[dayIndex] || {}),
          [unitIndex]: true,
        },
      }));
    }
  };
  function CountTotalTime(dataUnit) {
    let totalTime = 0;
    for (let index = 0; index < dataUnit.length; index++) {
      totalTime += parseInt(dataUnit[index].duration, 10);
    }
    return totalTime;
  }
  const handleDeleteUnit = (e, unit) => {
    e.preventDefault();
    const tempArray = [...outline];
    let tempContent = tempArray[dayIndex].trainingUnits;
    const deletedUnits = tempContent.find(
      (item) => item.unitCode === unit.unitCode
    );
    deletedUnits.trainingContents.forEach((dataUnit) => {
      handleTimeAllocation(dataUnit.deliveryType, "remove", dataUnit.duration);
    });
    let newUnit = tempContent.filter(
      (content) => content.unitCode !== unit.unitCode
    );
    setDeletedUnitIds((deletedUnitIds) => [
      ...deletedUnitIds,
      deletedUnits.unitCode,
    ]);
    tempArray[dayIndex].trainingUnits = newUnit;
    setOutline(tempArray);
  };

  return (
    <>
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
        onClick={() => handleUnitClick(dayIndex, unitIndex)}
      >
        <Box
          onClick={() => setIsShow(!isShow)}
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
              alignItems: unit.unitName === null ? "center" : "flex-start",
              gap: "5px",
              width: "100%",
              justifyContent: {
                xs: "flex-start",
                sm: "flex-start",
                md: "flex-start",
                lg: "flex-start",
              },
            }}
          >
            <Box sx={{ minWidth: "60px", justifyItems: "flex-start" }}>
              Unit {unit.unitCode}
            </Box>
            {unit.unitName === null ? (
              <>
                <TextField
                  required
                  error={error["unitTitle"]}
                  sx={textField}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  name="unitName"
                />
                <Button
                  type="submit"
                  sx={button}
                  onClick={(e) =>
                    handleCreateTitle(e, unitIndex, unit.unitCode)
                  }
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
                          error={error[`unitName${unitIndex}`]}
                          onKeyDown={(e) => checkKeyDownRename(e)}
                          value={unit.unitName}
                          onChange={(e) =>
                            handleRenameTitle(e, dayIndex, unitIndex)
                          }
                          name="unitName"
                        />
                      </>
                    ) : (
                      <Box>{unit.unitName}</Box>
                    )}
                    <IconButton
                      size="small"
                      onClick={(e) => {
                        setRenamingUnit(
                          renamingUnit === unitIndex && !error[`unitTitle`]
                            ? -1
                            : unitIndex
                        );
                        e.stopPropagation();
                      }}
                      sx={{ padding: 0 }}
                    >
                      <CreateIcon />
                    </IconButton>

                    <IconButton
                      size="small"
                      sx={{ padding: 0 }}
                      onClick={(e) => {
                        handleDeleteUnit(e, unit);
                        e.stopPropagation();
                      }}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </Box>
                  {/* //dataUnit */}
                  <Box sx={hoursStyle}>{`${(
                    CountTotalTime(unit.trainingContents) / 60
                  ).toFixed(1)}hrs`}</Box>
                </Box>
                <IconButton>
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
          onClick={(e) => e.stopPropagation()}
        >
          <DataUnit
            isShow={isShow}
            unit={unit}
            day={day}
            dayIndex={dayIndex}
            unitIndex={unitIndex}
            openState={openState}
            setOpenState={setOpenState}
          />
        </Box>
      </Box>
    </>
  );
}
