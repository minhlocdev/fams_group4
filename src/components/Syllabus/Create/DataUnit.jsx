import React, { useContext, useState } from "react";
import { Box, Collapse, IconButton, Chip } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SyllabusNewContent from "./SyllabusNewContent";
import SnippetFolderIcon from "@mui/icons-material/SnippetFolder";
import TrainingMaterialModalCreate from "./TrainingMaterialModalCreate";
import SettingsInputAntennaOutlinedIcon from "@mui/icons-material/SettingsInputAntennaOutlined";
import SpellcheckOutlinedIcon from "@mui/icons-material/SpellcheckOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import AssignmentIcon from "@mui/icons-material/Assignment";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import { PanToolOutlined } from "@mui/icons-material";
import { SyllabusContext } from "../../../context/SyllabusContext";

export default function DataUnit({
  unit,
  day,
  dayIndex,
  unitIndex,
  openState,
}) {
  const {
    outline,
    setOutline,
    error,
    handleFieldValidation,
    handleTimeAllocation,
  } = useContext(SyllabusContext);
  const [openTraining, setOpenTraining] = useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const AddDataUnit = (obj, dayIndex, unitIndex) => {
    const tempData = [...outline];
    const tempContent = tempData[dayIndex].content;
    const tempUnit = tempContent[unitIndex].dataUnit;
    tempUnit.push(obj);
    handleTimeAllocation(obj.DeliveryType);
    setOutline(tempData);
  };
  const updateTraining = (
    newTrainingArray,
    dayIndex,
    unitIndex,
    dataUnitIndex
  ) => {
    const updatedButtonData = [...outline];
    const tempContent = updatedButtonData[dayIndex].content;
    const tempUnit = tempContent[unitIndex].dataUnit;
    tempUnit[dataUnitIndex].TrainingMaterial = newTrainingArray;
    setOutline(updatedButtonData);

    // onChange(outline, "outline");
  };

  function handleIconDelivery(deliveryData) {
    let IconType;
    switch (deliveryData) {
      case "Assignment/Lab":
        IconType = <AssignmentIcon />;
        break;
      case "Concept/Lecture":
        IconType = <RecordVoiceOverIcon />;
        break;
      case "Guide/Review":
        IconType = <PanToolOutlined />;
        break;
      case "Test/Quiz":
        IconType = <FactCheckOutlinedIcon />;
        break;
      case "Exam":
        IconType = <SpellcheckOutlinedIcon />;
        break;
      case "Seminar/Workshop":
        IconType = <SettingsInputAntennaOutlinedIcon />;
        break;
      default:
        break;
    }
    return IconType;
  }

  return (
    <>
      {unit.dataUnit.length !== 0 &&
        unit.dataUnit.map((dataUnit, dataUnitIndex) => (
          <Collapse
            // in={isShowUnit === unitIndex}
            in={openState[dayIndex][unitIndex] ? false : true}
            timeout="auto"
            unmountOnExit
            key={dataUnitIndex}
            sx={{
              marginLeft: { xs: "", lg: "5%" },
              // width: { xs: "95%", lg: "90%" },
            }}
          >
            <Box
              sx={{
                backgroundColor: "#DFDEDE",
                padding: "5px 20px",
                display: "flex",
                alignItems: {
                  xs: "",
                  sm: "center",
                  md: "center",
                  lg: "center",
                },
                justifyContent: {
                  xs: "",
                  sm: "space-between",
                  md: "space-between",
                  lg: "space-between",
                },
                ".MuiChip-filled": {
                  backgroundColor: "#2D3748",
                  color: "white",
                },
                // alignItems: "center",
                borderRadius: "10px",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                  md: "row",
                  lg: "row",
                },

                // width: "900px",
              }}
            >
              <Box
                sx={{
                  fontSize: "14px",
                }}
              >
                {dataUnit.Name}
              </Box>
              <Box
                sx={{
                  gap: { xs: "5px", sm: "15px", md: "15px", lg: "15px" },
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Chip
                  sx={{
                    backgroundColor: "#2D3748",
                    color: "white",
                    height: "27px",
                  }}
                  label={dataUnit.OutputStandard[0]}
                ></Chip>
                {dataUnit.TrainingTime}ms
                <Chip
                  label={dataUnit.Method}
                  sx={{ height: "27px" }}
                  color={dataUnit.Method === "Online" ? "warning" : "default"}
                  variant={dataUnit.Method === "Online" ? "outlined" : "filled"}
                ></Chip>
                <Box
                  sx={{
                    width: { sm: "24px" },
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {handleIconDelivery(dataUnit.DeliveryType)}
                </Box>
                <Box>
                  <IconButton>
                    <SnippetFolderIcon
                      onClick={() =>
                        setOpenTraining({
                          openTraining: dataUnitIndex,
                          dataUnitIndex: dataUnitIndex,
                        })
                      }
                    />
                  </IconButton>
                  {openTraining !== null && (
                    <TrainingMaterialModalCreate
                      openTraining={openTraining.openTraining === dataUnitIndex}
                      handleClose={() =>
                        setOpenTraining({
                          openTraining: false,
                          dataUnitIndex: dataUnitIndex,
                        })
                      }
                      dataUnitIndex={openTraining.dataUnitIndex}
                      dayIndex={dayIndex}
                      unitIndex={unitIndex}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Collapse>
        ))}
      {unit.title !== null && (
        <IconButton
          sx={{ justifyContent: "left", width: "40px" }}
          onClick={(e) =>
            setOpenModal({
              openModal: openModal === unitIndex ? -1 : unitIndex,
              dayIndex: dayIndex,
              unitIndex: unitIndex,
            })
          }
        >
          <AddCircleIcon />
        </IconButton>
      )}
      {openModal && (
        <SyllabusNewContent
          unitIndex={unitIndex}
          handleCloseModal={() => setOpenModal(false)}
          openModal={openModal}
          AddData={(obj) =>
            AddDataUnit(obj, openModal.dayIndex, openModal.unitIndex)
          }
        />
      )}
    </>
  );
}
