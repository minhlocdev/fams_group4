import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  styled,
  Typography,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import TimeAllocation from "../../shared/TimeAllocation";
import { SyllabusContext } from "../../../context/SyllabusContext";
import Day from "../Create/Day";

const button = {
  backgroundColor: "#2d3748",
  borderRadius: "8px",
  color: "white",
  padding: "5px 15px",
  cursor: "pointer",
  "&:hover": { backgroundColor: "rgb(72 147 222 / 81%)" },
  fontWeight: "bold",
};

export default function SyllabusOutline() {
  const Title = styled(Typography)({
    height: "34px",
    fontWeight: "bold",
    background: "#2D3748",
    color: "white",
    borderRadius: "10px 10px 0 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  });
  const { outline, setOutline } = useContext(SyllabusContext);
  const theme = useTheme();
  const [totalDay, setTotalDay] = useState(outline.length);

  const addDay = (e) => {
    setTotalDay(totalDay + 1);
    const tempojt = {
      dayNumber: totalDay + 1,
      trainingUnits: [],
    };
    const tempData = [...outline];
    tempData.push(tempojt);
    setOutline(tempData);
    e.stopPropagation();
  };
  const isDownLg = useMediaQuery(theme.breakpoints.down("lg"));
  return (
    <>
      <Grid
        container
        direction="row"
        spacing={2}
        sx={{ padding: "10px 16px 10px 16px" }}
      >
        <Grid item xs={12} lg={10}>
          {/* <Box sx={{ width: "80%" }} key={"Outline"}> */}
          {outline?.length !== 0 && (
            <Box
              sx={{
                boxShadow: "0px 20px 40px 0px rgba(0, 0, 0, 0.16)",
                maxHeight: "500px",
                overflowY: "auto",
                marginBottom: "10px",
              }}
            >
              {/* //Day */}
              <Day setTotalDay={setTotalDay} />
            </Box>
          )}
          <Button sx={button} onClick={(e) => addDay(e)}>
            Add day
          </Button>
          {/* </Box> */}
        </Grid>
        <Grid item xs={12} lg={2} justifyContent="flex-start">
          <Box sx={{ width: { xs: "100%", sm: "80%", md: "80%", lg: "100%" } }}>
            <Box
              sx={{
                height: "fit-content",
                borderRadius: "10px",
                border: "1px solid #cccc",
                marginLeft: "auto",
              }}
            >
              <Title>Time Allocation</Title>
              <Box
                sx={{
                  height: { xs: "209px", lg: "409px" },
                  margin: { xs: "35px 0px 20px 0px" },
                  width: { xs: "100%", sm: "80%", md: "80%", lg: "100%" },
                }}
              >
                {isDownLg ? <TimeAllocation control /> : <TimeAllocation />}
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
