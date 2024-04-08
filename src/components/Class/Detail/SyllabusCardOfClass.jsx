import React, { useContext } from "react";
import {
  Avatar,
  AvatarGroup,
  Box,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ClassContext from "../../../context/ClassContext";
import { SupervisedUserCircleOutlined } from "@mui/icons-material";
import theme from "../../../assets/theme";
import SyllabusCardSkeleton from "../ClassSkeleton/SyllabusCardSkeleton";
export default function SyllabusCardOfClass() {
  const { classData } = useContext(ClassContext);
  if (!classData) {
    return <SyllabusCardSkeleton />;
  }
  const getTrainers = (array) => {
    const unique = array.reduce((accumulator, current) => {
      if (!accumulator.some((x) => x.trainerId === current.trainerId)) {
        accumulator.push(current);
      }
      return accumulator;
    }, []);
    return unique;
  };
  const { trainingProgram, infoTrainers } = classData;
  const countBySyllabusId = getTrainers(infoTrainers).reduce(
    (count, trainer) => {
      count[trainer.syllabusId] = (count[trainer.syllabusId] || 0) + 1;
      return count;
    },
    {}
  );
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
          alignItems: { xs: "center", lg: "flex-start" },
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            paddingLeft: 2,
            paddingTop: 2,
            color: "#FFFFFF",
            letterSpacing: "5px",
          }}
        >
          {trainingProgram.trainingProgramName}
        </Typography>
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
            Duration: {trainingProgram.durationByDay} days (
            {trainingProgram.durationByHour} hours)
          </Typography>
          <Box
            sx={{
              borderRight: "1px solid #fff",
              height: { xs: "0px", lg: "20px" },
            }}
          ></Box>
          <Typography variant="body1" sx={{ color: "#FFFFFF" }}>
            Modified on {trainingProgram.modifiedDate} by{" "}
            {trainingProgram.modifiedBy}
          </Typography>
        </Stack>
      </Stack>

      {trainingProgram.syllabuses.map((data, index) => (
        <Grid
          key={index}
          container
          sx={{
            flexDirection: { xs: "column", lg: "row" },
            filter: data.publishStatus ? "none" : "opacity(0.5)",
            margin: "20px 0",
          }}
        >
          <Grid
            item
            sx={{
              backgroundColor: theme.primary,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderTopLeftRadius: "20px",
              borderBottomLeftRadius: "20px",
              borderBottomRightRadius: { xs: "20px", lg: "0" },
              borderTopRightRadius: { xs: "20px", lg: "0" },
              padding: "10px 0",
            }}
            xs={12}
            lg={2}
          >
            {classData.infoTrainers.length !== 0 ? (
              <Stack direction={"row"} spacing={1}>
                <AvatarGroup total={countBySyllabusId[data.id]} max={4}>
                  {classData.infoTrainers.map(
                    (t, index) =>
                      t.syllabusId === data.id && (
                        <Avatar
                          key={index}
                          src={t.avatarUrl}
                          sx={{ width: 50, height: 50 }}
                          alt="trainer_image"
                        />
                      )
                  )}
                </AvatarGroup>
              </Stack>
            ) : (
              <SupervisedUserCircleOutlined fontSize="large" color="action" />
            )}
          </Grid>
          <Grid
            item
            lg={10}
            xs={12}
            sx={{
              backgroundColor: { xs: "#fff", lg: theme.primary },
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
            }}
          >
            <Stack
              sx={{
                backgroundColor: "#fff",
                color: theme.primary,
                borderRadius: "20px",
                boxShadow: "rgba(100, 100, 111, 0.3) 2px 5px 4px 0px",
                padding: "10px 20px",
              }}
            >
              <Stack
                direction={"row"}
                sx={{
                  color: theme.primary,
                  flexDirection: {
                    xs: "column-reverse",
                    md: "row",
                  },
                  alignItems: { xs: "center", md: "flex-start" },
                }}
              >
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{
                    letterSpacing: { md: "5px" },
                    fontSize: { xs: "1.5rem", md: "2.125rem" },
                    textAlign: { xs: "center", md: "left" },
                    maxWidth: "90%",
                    whiteSpace: { xs: "normal", md: "nowrap" },
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {data.syllabusName}
                </Typography>
                <Typography
                  variant={"span"}
                  sx={{
                    backgroundColor: data.publishStatus
                      ? theme.primary
                      : theme.unmodified,
                    color: "#fff",
                    borderRadius: "20px",
                    border: "1px solid #fff",
                    padding: "3px 10px",
                    marginLeft: "5px",
                    width: { xs: "100%", md: "fit-content" },
                    textAlign: "center",
                  }}
                >
                  {data.publishStatus ? "Active" : "Inactive"}
                </Typography>
              </Stack>
              <Stack
                direction={"row"}
                spacing={2}
                justifyContent={"flex-start"}
                alignItems={"center"}
                sx={{
                  color: theme.primary,
                  flexDirection: { xs: "column", md: "row" },
                }}
              >
                <Typography variant="body1" sx={{}}>
                  Duration: {data.durationByDay} days ({data.durationByHour}{" "}
                  hours)
                </Typography>
                <Box
                  xs={{
                    borderRight: "1px solid #fff",
                    height: { xs: "0px", md: "20px" },
                  }}
                ></Box>
                <Typography variant="body1" sx={{}}>
                  Modified on {data.modifiedDate} by {data.modifiedBy}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      ))}
    </>
  );
}
