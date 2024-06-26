import { useTheme } from "@emotion/react";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Button, MobileStepper, Stack, Box, Typography } from "@mui/material";
import React, { useContext } from "react";
import ClassCreateHeader from "../Create&Edit/ClassCreateHeader";
import ClassCreateDetail from "../Create&Edit/ClassCreateDetail";
import AddTrainer from "../Create&Edit/AddTrainer.jsx/AddTrainer";
import ClassContext from "../../../context/ClassContext";
import ClassTitle from "../Create&Edit/ClassTitle";
import theme from "../../../assets/theme";
import { Link } from "react-router-dom";
const NotFoundClass = () => {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          background: theme.primary,
          padding: "10px 20px",
          color: "#fff",
        }}
      >
        {" "}
        <Typography
          variant={"h5"}
          sx={{
            wordSpacing: "5px",
            letterSpacing: "5px",
            textAlign: { xs: "center", md: "left" },
          }}
        >
          Class
        </Typography>
      </Box>
      <div style={{ minHeight: "50vh", alignContent: "center" }}>
        <h3 style={{ textAlign: "center" }}>Not Found Any Class</h3>
        <p style={{ textAlign: "center" }}>
          <Link to={"/class/create"}>Create a new class?</Link>
        </p>
      </div>
    </>
  );
};
export default function ClassStepper() {
  const theme = useTheme();
  const {
    activeStep,
    setActiveStep,
    fieldValidation,
    handleSave,
    handleCancel,
    handleDraft,
    isError,
  } = useContext(ClassContext);
  if (isError) {
    return <NotFoundClass />;
  }
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleValidateField = () => {
    for (const field of Object.values(fieldValidation)) {
      if (field === true) {
        return true;
      }
    }
    return false;
  };
  return (
    <>
      <div>
        {activeStep === 0 && <ClassTitle />}
        {activeStep === 1 && (
          <>
            <ClassCreateHeader />
            <ClassCreateDetail />
          </>
        )}
      </div>
      {activeStep === 2 && <AddTrainer />}
      <MobileStepper
        sx={{
          "& .MuiMobileStepper-dots": { display: "none" },
          marginTop: "10px",
        }}
        variant="dots"
        steps={3}
        position="static"
        activeStep={activeStep}
        nextButton={
          activeStep !== 0 && (
            <Stack direction={"row"} marginLeft={"auto"} spacing={1}>
              <Button
                size="small"
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
                onClick={handleDraft}
                size="small"
                sx={{
                  color: "white",
                  backgroundColor: "#474747",
                  "&:hover": { backgroundColor: "rgb(72 147 222 / 81%)" },
                  fontSize: { xs: "12px" },
                }}
              >
                Save as draft
              </Button>
              <Button
                size="small"
                onClick={() => {
                  activeStep !== 3 - 1 ? handleNext() : handleSave();
                }}
                disabled={handleValidateField() && activeStep === 2}
              >
                {activeStep === 2 ? "Save" : "Next"}
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            </Stack>
          )
        }
        backButton={
          activeStep !== 0 && (
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          )
        }
      />
    </>
  );
}
