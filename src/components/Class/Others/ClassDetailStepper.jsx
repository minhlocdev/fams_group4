import { useTheme } from "@emotion/react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Button, MobileStepper, Grid, Box } from "@mui/material";
import React, { useContext, useState } from "react";
import ClassHeader from "../Detail/ClassHeader";
import General from "../Detail/General";
import TimeFrame from "../Detail/TimeFrame";
import Attendee from "../Detail/Attendee";
import SyllabusTabOfClass from "../Detail/SyllabusTabOfClass";
import TrainerDetail from "../Detail/TrainerDetail/TrainerDetail";
import ClassContext from "../../../context/ClassContext";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  border: "unset",
  boxShadow: "unset",
}));
const NotFoundClass = () => {
  return (
    <Box sx={{ minHeight: "50vh", alignContent: "center" }}>
      <h3 style={{ textAlign: "center" }}>Not Found Any Class</h3>
    </Box>
  );
};
export default function ClassDetailStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const { isError } = useContext(ClassContext);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <>
      <div>
        {activeStep === 0 && (
          <>
            <ClassHeader />
            {isError ? (
              <NotFoundClass />
            ) : (
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    md={4}
                    lg={4}
                    sx={{
                      transition: "max-width 0.5s ease",
                    }}
                  >
                    <Item>
                      <General />
                    </Item>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={8}
                    lg={6}
                    sx={{
                      transition: "max-width 0.5s ease",
                    }}
                  >
                    <Item>
                      <TimeFrame />
                    </Item>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={12}
                    lg={4}
                    sx={{
                      transition: "max-width 0.5s ease",
                    }}
                  >
                    <Item>
                      <Attendee />
                    </Item>
                  </Grid>
                  <Grid item xs={12}>
                    <SyllabusTabOfClass />
                  </Grid>
                </Grid>
              </Box>
            )}
          </>
        )}
      </div>
      {activeStep === 1 && <TrainerDetail />}
      <MobileStepper
        sx={{
          "& .MuiMobileStepper-dots": { display: "none" },
        }}
        variant="dots"
        steps={3}
        position="static"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === 2 - 1 || isError}
          >
            {"Next"}
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </>
  );
}
