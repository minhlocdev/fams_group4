import React, { useContext, useEffect, useState } from "react";
import { Box, Grid, IconButton, Stack, Typography } from "@mui/material";
import SearchTranningProgram from "./SearchTranningProgram";
import ClassContext from "../../context/ClassContext";
import dayjs from "dayjs";
import {
  EditOutlined,
  SupervisedUserCircleOutlined,
} from "@mui/icons-material";
import theme from "../../assets/theme";
import { useGetAllTrainingProgramQuery } from "../../services/queries/trainingQuery";
export default function SyllabusCardOfClass() {
  const [program, setProgram] = useState([]);
  const { search, handleSearch } = useContext(ClassContext);
  const { data, isSuccess, isLoading } = useGetAllTrainingProgramQuery();
  useEffect(() => {
    setProgram(data);
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
          {!search ? (
            <>
              <Typography variant="h5" gutterBottom>
                Training Program Name
              </Typography>
              <SearchTranningProgram program={program} loading={isLoading} />
            </>
          ) : (
            <>
              <Typography
                variant="h4"
                gutterBottom
                sx={{ letterSpacing: "5px" }}
              >
                {search.programName}
              </Typography>
              <IconButton color="inherit" onClick={() => handleSearch(null)}>
                <EditOutlined />
              </IconButton>
            </>
          )}
        </Stack>
        {search && (
          <Stack
            direction={"row"}
            spacing={2}
            justifyContent={"flex-start"}
            alignItems={"center"}
            sx={{ paddingLeft: 2 }}
          >
            <Typography variant="body1" sx={{ color: "#FFFFFF" }}>
              Duration: {search?.duration} days ({search?.hours} hours)
            </Typography>
            <div
              style={{ borderRight: "1px solid #fff", height: "20px" }}
            ></div>
            <Typography variant="body1" sx={{ color: "#FFFFFF" }}>
              Modified on {dayjs(search?.createdOn).format("DD/MM/YYYY")} by{" "}
              {search?.createdBy}
            </Typography>
          </Stack>
        )}
      </Stack>

      {search &&
        search.syllabus.map((data) => (
          <Grid
            container
            sx={{
              filter: data.status ? "none" : "opacity(0.5)",
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
                padding: "10px 0",
              }}
              xs={2}
            >
              {data.trainers ? (
                <Stack direction={"row"} spacing={1}>
                  {data.trainers.map((t) => (
                    <img
                      src={t.trainerAvatar}
                      style={{
                        borderRadius: "50%",
                        width: "60px",
                        height: "60px",
                      }}
                      alt="trainer_image"
                    ></img>
                  ))}
                </Stack>
              ) : (
                <SupervisedUserCircleOutlined fontSize="large" color="action" />
              )}
            </Grid>
            <Grid
              item
              xs={10}
              sx={{
                backgroundColor: theme.primary,
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
                  alignItems={"flex-start"}
                  sx={{ color: theme.primary }}
                >
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ letterSpacing: "5px" }}
                  >
                    {data.name}
                  </Typography>
                  <Typography
                    variant={"span"}
                    sx={{
                      backgroundColor: data.status
                        ? theme.primary
                        : theme.unmodified,
                      color: "#fff",
                      borderRadius: "20px",
                      border: "1px solid #fff",
                      padding: "3px 10px",
                      marginLeft: "5px",
                    }}
                  >
                    {data.status ? "Active" : "Inactive"}
                  </Typography>
                </Stack>
                <Stack
                  direction={"row"}
                  spacing={2}
                  justifyContent={"flex-start"}
                  alignItems={"center"}
                  sx={{ color: theme.primary }}
                >
                  <Typography variant="body1" sx={{}}>
                    Duration: {data.duration}
                  </Typography>
                  <div
                    style={{ borderRight: "1px solid #fff", height: "20px" }}
                  ></div>
                  <Typography variant="body1" sx={{}}>
                    {data.modifiedBy}
                  </Typography>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        ))}
    </>
  );
}
