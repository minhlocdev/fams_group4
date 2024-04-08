import { Box, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import ClassContext from "../../../../context/ClassContext";
import theme from "../../../../assets/theme";
import { PublishStatusEnum } from "../../../../constants/PublishStatusEnum";
import SyllabusCardItem from "../../Others/SyllabusCardItem";
export default function AddTrainer() {
  const { classTitle, search, initialDays, trainingProgramDetail } =
    useContext(ClassContext);
  return (
    <Box
      sx={{
        width: "100%",
        background: "#fff",
        padding: "10px 20px",
        color: "#000",
      }}
    >
      {" "}
      <Typography
        variant={"h5"}
        sx={{
          wordSpacing: "5px",
          letterSpacing: "5px",
        }}
      >
        Training program of {classTitle}
      </Typography>
      <Stack direction={"row"} alignItems={"flex-start"}>
        <Typography
          variant={"h4"}
          sx={{
            wordSpacing: "5px",
            letterSpacing: "5px",
            fontWeight: "600",
          }}
        >
          {trainingProgramDetail.name}
        </Typography>
        <Typography
          variant={"span"}
          sx={{
            backgroundColor: theme.unmodified,
            borderRadius: "20px",
            border: "1px solid #fff",
            padding: "3px 10px",
            marginLeft: "5px",
          }}
        >
          {PublishStatusEnum[1]}
        </Typography>
      </Stack>
      <div
        style={{
          borderBottom: "1px solid #000",
          width: "100%",
          margin: "10px 0",
        }}
      ></div>
      <Stack direction={"row"} spacing={1} alignItems={"center"}>
        <Typography variant={"span"} sx={{ fontSize: "18px" }}>
          {initialDays.length || "--"}
        </Typography>
        <Typography
          variant={"span"}
          sx={{
            fontSize: "14px",
            fontWeight: "light",
            borderRight: "1px solid #fff",
            paddingRight: "10px",
          }}
        >
          {`days (${search?.durationByHour || "--"} hours)`}
        </Typography>
      </Stack>
      <Typography
        variant={"span"}
        sx={{
          fontSize: "14px",
          fontWeight: "light",
          borderRight: "1px solid #fff",
          paddingRight: "10px",
        }}
      >
        Modified on {search.modifiedDate} by {search.modifiedBy}
      </Typography>
      <div
        style={{
          borderBottom: "1px solid #000",
          width: "100%",
          margin: "10px 0",
        }}
      ></div>
      <Typography variant="span">Content</Typography>
      {trainingProgramDetail && (
        <>
          {trainingProgramDetail.outline.map((data) => (
            <SyllabusCardItem
              card={data}
              isDelete={true}
              isEdit={true}
              key={data.id}
            />
          ))}
        </>
      )}
    </Box>
  );
}
