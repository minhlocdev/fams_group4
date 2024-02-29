import React, { useContext, useRef, useState } from "react";
import {
  Box,
  Collapse,
  IconButton,
  styled,
  Typography,
  Chip,
} from "@mui/material";
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

export default function DataUnit({unit,day,dayIndex, unitIndex, openState, setOpenState}) {
  const { outline, setOutline, error, handleFieldValidation } =
  useContext(SyllabusContext);
  const [openTraining, setOpenTraining] = useState(false);
  const [openModal, setOpenModal] = React.useState(false)

  const AddDataUnit = (obj, dayIndex, unitIndex) => {
    const tempData = [...outline];
    const tempContent = tempData[dayIndex].content;
    const tempUnit = tempContent[unitIndex].dataUnit;
    tempUnit.push(obj);
    setOutline(tempData);
    // onChange(outline, "outline");
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
    }
    return IconType;
  }

  return (
    <>
      {unit.dataUnit.length !== 0 &&
        unit.dataUnit.map((dataUnit, dataUnitIndex) => (
          <Collapse
            // in={isShowUnit === unitIndex}
            in={openState[dayIndex]?.[unitIndex]}
            timeout="auto"
            unmountOnExit
            key={dataUnitIndex}
          >
            <Box
              sx={{
                backgroundColor: "#DFDEDE",
                height: "34px",
                padding: "5px 20px",
                display: "flex",
                justifyContent: "space-between",
                ".MuiChip-filled": {
                  backgroundColor: "#2D3748",
                  color: "white",
                },
                alignItems: "center",
                borderRadius: "10px",
                width: "900px",
              }}
            >
              <Box>{dataUnit.Name}</Box>
              <Box
                sx={{
                  gap: "20px",
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
                <Box>{handleIconDelivery(dataUnit.DeliveryType)}</Box>
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
                      modalData={day}
                      unit={unit}
                      unitData={unit.dataUnit}
                      dataTraining={dataUnit.TrainingMaterial}
                      dataUnitIndex={openTraining.dataUnitIndex}
                      updateTraining={(newTraining) =>
                        updateTraining(
                          newTraining,
                          dayIndex,
                          unitIndex,
                          dataUnitIndex
                        )
                      }
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Collapse>
        ))}
      <IconButton
        sx={{ justifyContent: "left" }}
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
