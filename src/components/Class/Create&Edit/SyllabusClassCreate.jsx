import React, { useContext, useEffect, useState } from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import SearchTranningProgram from "./SearchTranningProgram";
import ClassContext from "../../../context/ClassContext";
import { EditOutlined, WarningAmber } from "@mui/icons-material";
import { useGetAllTrainingProgramQuery } from "../../../services/queries/trainingQuery";
import SyllabusCardItem from "../Others/SyllabusCardItem";
import { InfoTooltip } from "../../shared/lib/CustomMUI";
export default function SyllabusCardOfClass() {
  const [program, setProgram] = useState([]);
  const { handleSearch, trainingProgramDetail } = useContext(ClassContext);
  const { data, isSuccess, isLoading } = useGetAllTrainingProgramQuery();
  useEffect(() => {
    if (isSuccess) {
      const trainingList = [...data.list];
      const filteredTrainingList = trainingList.filter((t) => t.status === 1);
      setProgram(filteredTrainingList);
    }
  }, [data, isSuccess]);

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
          direction={"row"}
          spacing={2}
          alignItems={"center"}
          sx={{ paddingLeft: 2, paddingTop: 2, color: "#FFFFFF" }}
        >
          {!trainingProgramDetail ? (
            <>
              <Typography variant="h5" gutterBottom>
                Training Program Name
              </Typography>
              <InfoTooltip
                title={
                  <Typography variant="span">{"Required field"}</Typography>
                }
              >
                <WarningAmber color="error" />
              </InfoTooltip>
              <SearchTranningProgram program={program} loading={isLoading} />
            </>
          ) : (
            <>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ letterSpacing: "5px" }}
              >
                {trainingProgramDetail?.name}
              </Typography>
              <IconButton color="inherit" onClick={() => handleSearch(null)}>
                <EditOutlined />
              </IconButton>
            </>
          )}
        </Stack>
        {trainingProgramDetail && (
          <Stack
            direction={"row"}
            spacing={2}
            justifyContent={"flex-start"}
            alignItems={"center"}
            sx={{ paddingLeft: 2 }}
          >
            <Typography variant="body1" sx={{ color: "#FFFFFF" }}>
              Duration: {trainingProgramDetail?.durationByDay} days (
              {trainingProgramDetail?.durationByHour} hours)
            </Typography>
            <div
              style={{ borderRight: "1px solid #fff", height: "20px" }}
            ></div>
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
            <SyllabusCardItem card={data} key={data.id} />
          ))}
        </>
      )}
    </>
  );
}
