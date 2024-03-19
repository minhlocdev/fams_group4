import React, { useContext } from "react";
import { Typography, Card, CardContent, Stack, Chip, Box } from "@mui/material";
import { SyllabusContext } from "../../context/SyllabusContext";
import SettingsInputAntennaOutlinedIcon from "@mui/icons-material/SettingsInputAntennaOutlined";
import SpellcheckOutlinedIcon from "@mui/icons-material/SpellcheckOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import AssignmentIcon from "@mui/icons-material/Assignment";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import SnippetFolderOutlinedIcon from "@mui/icons-material/SnippetFolderOutlined";
import { PanToolOutlined } from "@mui/icons-material";
const Syllabusdetail = ({ unit, day }) => {
  const {
    OpenTrainingMaterialModal,
    setSyllabusID,
    selectedDay,
    setSelectedDay,
    setModalData,
    unitId,
    setUnitId,
  } = useContext(SyllabusContext);

  const layoutOutput = {
    width: "fit-content",
    padding: { xs: "5px 5px", lg: "5px 15px" },
    justifyContent: "center",
    alignItems: "center",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "18px",
    color: "white",
    backgroundColor: "#2D3748",
  };

  const layoutMethodOffline = {
    width: "fit-content",
    padding: { xs: "5px 5px", lg: "5px 15px" },
    justifyContent: "center",
    alignItems: "center",
    fontSize: "10px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "18px",
    color: "white",
    backgroundColor: "#2D3748",
  };

  const layoutMethodOnline = {
    width: "fit-content",
    padding: { xs: "5px 5px", lg: "5px 15px" },
    justifyContent: "center",
    alignItems: "center",
    fontSize: "10px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "18px",
    color: "#D45B13",
    backgroundColor: "inherit",
    border: "1px solid #D45B13",
  };

  const layoutTime = {
    backgroundColor: "inherit",
    fontFamily: "Inter",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "400",
    color: "#000",
  };
  const handleProps = React.useCallback(
    (event, data, TrainingMaterial, dayID, unitid, unitTitle) => {
      const newdata = {
        day: dayID,
        title: data,
        unit: unitid,
        TrainingMaterial: TrainingMaterial,
        unitTitle: unitTitle,
      };
      setModalData(newdata);
      event.stopPropagation();
    },
    [selectedDay, unitId, setModalData]
  );
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
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      {unit.datasyllabus.map((e, index) => (
        <Card
          sx={{
            width: { xs: "95%", lg: "100%" },
            backgroundColor: "#DFDEDE",
            boxShadow: "none",
            padding: "5px",
          }}
          key={index}
        >
          <CardContent
            sx={{
              maxWidth: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
              maxHeight: "fit-content",
              display: "flex", // Thêm dòng này
              justifyContent: {
                xs: "none",
                sm: "space-between",
                md: "space-between",
                lg: "space-between",
              }, // Thêm dòng này
              alignItems: { xs: "flex-start", sm: "center" },
              "&.MuiCardContent-root": {
                padding: { xs: "5px 10px", md: "5px 18px", lg: "5px 20px" },
              },
              flexDirection: { xs: "column", sm: "row", md: "row", lg: "row" },
            }}
          >
            <Typography
              sx={{
                width: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "500",
              }}
            >
              {e.title}
            </Typography>
            <CardContent
              sx={{
                "&.MuiCardContent-root": {
                  padding: "0px",
                },
              }}
            >
              <Stack
                direction="row"
                spacing={{ xs: 0.5, sm: 1.5, md: 2, lg: 3 }}
              >
                <Chip label={e.output} sx={layoutOutput} />
                <Chip label={e.time} sx={layoutTime} />
                <Chip
                  label={e.method}
                  sx={
                    e.method === "Online"
                      ? layoutMethodOnline
                      : layoutMethodOffline
                  }
                />
                <Box
                  sx={{
                    width: { xs: "0px", sm: "24px" },
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {handleIconDelivery(e.deliveryType)}
                </Box>
                <Box
                  onClick={(event) => (
                    setSelectedDay(day.id),
                    setUnitId(unit.id),
                    OpenTrainingMaterialModal(event),
                    handleProps(
                      event,
                      e.title,
                      e.TrainingMaterial,
                      day.id,
                      unit.id,
                      unit.title
                    ),
                    setSyllabusID(e.id)
                  )}
                  sx={{
                    cursor: "pointer",
                    backgroundColor: "#dfdede",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <SnippetFolderOutlinedIcon />
                </Box>
              </Stack>
            </CardContent>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Syllabusdetail;
