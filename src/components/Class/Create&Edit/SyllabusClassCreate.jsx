import React, { useContext, useEffect, useState } from "react";
import { IconButton, Stack, Typography, Box } from "@mui/material";
import SearchTranningProgram from "./SearchTranningProgram";
import ClassContext from "../../../context/ClassContext";
import { EditOutlined, WarningAmber } from "@mui/icons-material";
import SyllabusCardItem from "../Others/SyllabusCardItem";
import { InfoTooltip } from "../../shared/lib/CustomMUI";
export default function SyllabusCardOfClass() {
  const [program, setProgram] = useState([]);
  const { handleSearch, trainingProgramDetail, allTraining } =
    useContext(ClassContext);
  useEffect(() => {
    if (allTraining) {
      const trainingList = [...allTraining];
      const filteredTrainingList = trainingList.filter((t) => t.status === 1);
      setProgram(filteredTrainingList);
    }
  }, [allTraining]);

  return (
    <>
      <Stack
        spacing={2}
        sx={{
          marginTop: "-16px",
          marginBottom: 1,
          border: "1px solid #2D3748",
          backgroundColor: "#2D3748",
          borderTopRightRadius: 20,
          paddingBottom: 2.5,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}
      >
        <Stack
          rowGap={1}
          columnGap={1}
          alignItems={"center"}
          sx={{
            flexDirection: { xs: "column", lg: "row" },
            padding: 2,
            color: "#FFFFFF",
          }}
        >
          {!trainingProgramDetail ? (
            <>
              <Typography variant="h5">Training Program Name</Typography>
              <InfoTooltip
                title={
                  <Typography variant="span">{"Required field"}</Typography>
                }
              >
                <WarningAmber color="error" />
              </InfoTooltip>
              <SearchTranningProgram program={program} loading={!allTraining} />
            </>
          ) : (
            <Stack direction={"row"} spacing={1}>
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  color: "#FFFFFF",
                  letterSpacing: "5px",
                }}
              >
                {trainingProgramDetail?.name}
              </Typography>
              <IconButton color="inherit" onClick={() => handleSearch(null)}>
                <EditOutlined />
              </IconButton>
            </Stack>
          )}
        </Stack>
        {trainingProgramDetail && (
          <Stack
            direction={"row"}
            spacing={2}
            justifyContent={"flex-start"}
            alignItems={"center"}
            sx={{
              flexDirection: { xs: "column", lg: "row" },
              flexWrap: "wrap",
              paddingLeft: 2,
            }}
          >
            <Typography variant="body1" sx={{ color: "#FFFFFF" }}>
              Duration: {trainingProgramDetail?.durationByDay} days (
              {trainingProgramDetail?.durationByHour} hours)
            </Typography>
            <Box
              sx={{
                borderRight: "1px solid #fff",
                height: { xs: "0px", lg: "20px" },
              }}
            ></Box>
            <Typography variant="body1" sx={{ color: "#FFFFFF" }}>
              Modified on {trainingProgramDetail?.createdDate} by{" "}
              {trainingProgramDetail?.createdBy}
            </Typography>
          </Stack>
        )}
      </Stack>
      {trainingProgramDetail && (
        <>
          {trainingProgramDetail.outline.map((data) => (
            <SyllabusCardItem card={data} key={data.id} isEdit={true} />
          ))}
        </>
      )}
    </>
  );
}
