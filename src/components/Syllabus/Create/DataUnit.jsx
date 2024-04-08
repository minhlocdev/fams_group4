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
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
export default function DataUnit({ unit, dayIndex, unitIndex, openState }) {
  const { outline, setOutline, handleTimeAllocation } =
    useContext(SyllabusContext);
  const [openTraining, setOpenTraining] = useState(null);
  const [openModal, setOpenModal] = React.useState(false);

  const AddDataUnit = (obj, dayIndex, unitIndex) => {
    const tempData = [...outline];
    const tempContent = tempData[dayIndex].trainingUnits;
    const tempUnit = tempContent[unitIndex].trainingContents;
    tempUnit.push(obj);
    handleTimeAllocation(obj.deliveryType, "add", obj.duration);
    setOutline(tempData);
  };
  // console.log(unit);
  function handleIconDelivery(deliveryData) {
    let IconType;
    switch (deliveryData) {
      case 1:
        IconType = <AssignmentIcon />;
        break;
      case 2:
        IconType = <RecordVoiceOverIcon />;
        break;
      case 3:
        IconType = <PanToolOutlined />;
        break;
      case 4:
        IconType = <FactCheckOutlinedIcon />;
        break;
      case 5:
        IconType = <SpellcheckOutlinedIcon />;
        break;
      case 6:
        IconType = <SettingsInputAntennaOutlinedIcon />;
        break;
      default:
        break;
    }
    return IconType;
  }

  const handleDeleteDataUnit = (e, dataUnitId) => {
    const tempArray = [...outline];
    const tempContent = tempArray[dayIndex].trainingUnits;
    const tempUnit = tempContent[unitIndex];

    // Find the data unit to be deleted
    const deletedDataUnit = tempUnit.trainingContents.find(
      (dataUnit) => dataUnit.id === dataUnitId
    );
    // console.log(deletedDataUnit);
    // Calculate time allocation based on the delivery type of the deleted data unit
    handleTimeAllocation(
      deletedDataUnit.deliveryType,
      "remove",
      deletedDataUnit.duration
    );

    // Filter out the deleted data unit
    tempUnit.trainingContents = tempUnit.trainingContents.filter(
      (item) => item.id !== dataUnitId
    );
    tempContent[unitIndex] = tempUnit;
    tempArray[dayIndex].trainingUnits = tempContent;
    setOutline(tempArray);
  };
  return (
    <>
      {unit.trainingContents.length !== 0 &&
        unit.trainingContents.map((dataUnit, dataUnitIndex) => (
          <Collapse
            // in={isShowUnit === unitIndex}
            in={Boolean(openState[dayIndex][unitIndex])}
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
              onClick={(e) => e.stopPropagation()}
            >
              <Box
                sx={{
                  fontSize: "14px",
                }}
              >
                {dataUnit.contentName}
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
                  label={dataUnit.learningObjectiveCode}
                ></Chip>
                {dataUnit.duration}ms
                <Chip
                  label={dataUnit.trainingFormat}
                  sx={{ height: "27px" }}
                  color={
                    dataUnit.trainingFormat === "Online" ? "warning" : "default"
                  }
                  variant={
                    dataUnit.trainingFormat === "Online" ? "outlined" : "filled"
                  }
                ></Chip>
                <Box
                  sx={{
                    // width: { sm: "24px" },
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {handleIconDelivery(dataUnit.deliveryType)}
                </Box>
                <Box>
                  <IconButton
                    onClick={() =>
                      setOpenTraining({
                        openTraining: dataUnitIndex,
                        dataUnitIndex: dataUnitIndex,
                      })
                    }
                  >
                    <SnippetFolderIcon />
                  </IconButton>
                  {openTraining !== null && (
                    <TrainingMaterialModalCreate
                      dataUnitId={dataUnit.id}
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
                <IconButton
                  onClick={(e) => handleDeleteDataUnit(e, dataUnit.id)}
                >
                  <CancelOutlinedIcon color="error" />
                </IconButton>
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
