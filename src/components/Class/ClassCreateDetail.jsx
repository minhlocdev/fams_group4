import React, { useContext, useRef, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SyllabusTabOfClass from "./SyllabusTabOfClass";
import ClassContext from "../../context/ClassContext";
import { Button, Stack, TextField, Typography } from "@mui/material";
import CreateGeneral from "./CreateGeneral";
import CreateAttendee from "./CreateAttendee";
import CreateTimeFrame from "./CreateTimeFrame";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  border: "unset",
  boxShadow: "unset",
}));
export default function ClassCreateDetail() {
  const { classTitle, setClassTitle, handleCancel } = useContext(ClassContext);
  const [error, setError] = useState("");
  const inputRef = useRef("");
  const validateTitle = () => {
    if (String(inputRef.current.value).trim() === "") {
      setError("Please input class name");
      return false;
    }
    return true;
  };
  const handleSaveTitle = () => {
    validateTitle() && setClassTitle(inputRef.current.value);
  };
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        {classTitle === "" ? (
          <Stack direction={"row"} spacing={2} alignItems={"center"} p={2}>
            <Typography variant="p">Class</Typography>
            <TextField
              error={error ? true : false}
              required
              placeholder={
                !error ? "Name the class" : "Please input class name"
              }
              inputRef={inputRef}
              sx={{
                width: "400px",
                "& .MuiInputBase-input": {
                  padding: "10px 10px",
                },
              }}
            />
            <Button
              sx={{
                color: "whitesmoke",
                backgroundColor: "#2D3748",
                padding: "5px 10px",
                borderRadius: "10px",
                fontWeight: "600",
                "&:hover": {
                  backgroundColor: "rgba(25, 118, 210, 0.5)",
                },
              }}
              onClick={() => handleSaveTitle()}
            >
              Create
            </Button>
          </Stack>
        ) : (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12} lg={4}>
                <Item>
                  <CreateGeneral />
                </Item>
              </Grid>
              <Grid item xs={12} md={12} lg={6}>
                <Item>
                  <CreateTimeFrame />
                </Item>
              </Grid>
              <Grid item xs={12} md={12} lg={4}>
                <Item>
                  <CreateAttendee />
                </Item>
              </Grid>
              <Grid item xs={12}>
                <SyllabusTabOfClass />
              </Grid>
            </Grid>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              py={3}
            >
              <Button
                onClick={() => setClassTitle("")}
                sx={{
                  color: "white",
                  backgroundColor: "#2D3748",
                  "&:hover": { backgroundColor: "rgb(72 147 222 / 81%)" },
                }}
              >
                Back
              </Button>
              <Stack direction={"row"} marginLeft={"auto"} spacing={1}>
                <Button
                  sx={{
                    color: "red",
                    textDecoration: "underline",
                    fontWeight: "bold",
                  }}
                  onClick={() => handleCancel()}
                >
                  Cancel
                </Button>
                <Button
                  //   onClick={handleDraftButton}
                  sx={{
                    color: "white",
                    backgroundColor: "#474747",
                    "&:hover": { backgroundColor: "rgb(72 147 222 / 81%)" },
                  }}
                >
                  Save as draft
                </Button>

                <Button
                  // type="submit"
                  // onClick={() => handleSave()}
                  sx={{
                    color: "white",
                    backgroundColor: "#2D3748",
                    "&:hover": { backgroundColor: "rgb(72 147 222 / 81%)" },
                  }}
                >
                  Next
                </Button>
              </Stack>
            </Stack>
          </>
        )}
      </Box>
    </>
  );
}
