import React from "react";
import {
  FolderSyllabusIcon,
  ConceptIcon,
  AssignmentIcon,
  GuideIcon,
} from "../../assets/scss/icon";
import { Typography, Card, CardContent, Stack, Chip } from "@mui/material";

const Syllabusdetail = ({
  Material,
  setModalData,
  selectedDay,
  unitId,
  unit,
  day,
  setSyllabusID,
  setUnitId,
  setSelectedDay,
  openTraining,
  training,
}) => {
  const dataSyllabus = [
    {
      id: "1",
      title: ".NET Introduction",
      output: "H4SD",
      time: "30mins",
      method: "Online",
      deliveryType: <ConceptIcon />,
    },

    {
      id: "2",
      title: "Declaration & Assignment",
      output: "H4SD",
      time: "30mins",
      method: "Offline",
      deliveryType: <AssignmentIcon />,
    },

    {
      id: "3",
      title: ".NET Introduction",
      output: "H4SD",
      time: "30mins",
      method: "Online",
      deliveryType: <GuideIcon />,
    },
  ];

  const layoutOutput = {
    width: "fit-content",
    padding: "5px 15px",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Inter",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "18px",
    color: "white",
    backgroundColor: "#2D3748",
  };

  const layoutMethodOffline = {
    width: "fit-content",
    padding: "5px 15px",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Inter",
    fontSize: "10px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "18px",
    color: "white",
    backgroundColor: "#2D3748",
  };

  const layoutMethodOnline = {
    width: "fit-content",
    padding: "5px 15px",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Inter",
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
    (event, data, TrainingMaterial, dayID, unitid) => {
      const newdata = {
        day: dayID,
        title: data,
        unit: unitid,
        TrainingMaterial: TrainingMaterial,
      };
      setModalData(newdata);
      event.stopPropagation();
    },
    [selectedDay, unitId, training, setModalData]
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      {unit.datasyllabus.map((e, index) => (
        <Card
          sx={{
            width: "831px",
            backgroundColor: "#DFDEDE",
            boxShadow: "none",
            padding: "5px",
          }}
          key={index}
        >
          <CardContent
            sx={{
              maxWidth: "831px",
              maxHeight: "34px",
              display: "flex", // Thêm dòng này
              justifyContent: "space-between", // Thêm dòng này
              alignItems: "center",
              "&.MuiCardContent-root": {
                padding: "5px 20px",
              },
            }}
          >
            <Typography
              sx={{
                fontFamily: "Inter",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: "500",
                lineHeight: "22px",
              }}
            >
              <div>{e.title}</div>
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
                spacing={3}
                sx={{ justifyContent: "space-between" }}
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
                <div style={{ width: "24px", height: "24px" }}>
                  {e.deliveryType}
                </div>
                <div
                  onClick={(event) => (
                    setSelectedDay(day.id),
                    setUnitId(unit.id),
                    Material(event),
                    handleProps(
                      event,
                      e.title,
                      e.TrainingMaterial,
                      day.id,
                      unit.id
                    ),
                    setSyllabusID(e.id)
                  )}
                >
                  <FolderSyllabusIcon />
                </div>
              </Stack>
            </CardContent>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Syllabusdetail;
