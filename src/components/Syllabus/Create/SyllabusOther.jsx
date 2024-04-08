import React, { useContext } from "react";
import {
  Box,
  Grid,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import RichText from "../Detail/RichText";
import TimeAllocation from "../../shared/TimeAllocation";
import { SyllabusContext } from "../../../context/SyllabusContext";
import { useParams } from "react-router-dom";

const Other = {
  scheme1: [
    {
      title: "Quiz *",
      name: "quiz",
      value: "15",
    },
    {
      title: "Assignment *",
      name: "assignment",
      value: "15",
    },
    {
      title: "Final *",
      name: "final",
      value: "70",
    },
  ],
  scheme2: [
    {
      title: "Final Theory*",
      name: "finalTheory",
      value: "40",
    },
    {
      title: "Final Practice*",
      name: "finalPractice",
      value: "60",
    },
  ],
  gpa: [
    {
      name: "passing",
      title: "GPA *",
      value: "70",
    },
  ],
};
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
const BoxTitle = {
  borderRadius: "10px",
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.16)",
};
const TextFieldStyle = {
  width: "60%",
  height: "27px",
  textAlign: "center",
  display: "flex",
  flexDirection: "row",
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    display: "none",
  },
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  ".MuiFormHelperText-root": {
    margin: 0,
  },
  ".MuiInputBase-input": {
    width: "27px",
    height: "27px",
    padding: 0,
    textAlign: "center",
    fontStyle: "italic",
  },
  ".MuiOutlinedInput-root": {
    paddingRight: 0,
    marginRight: "5px",
    borderRadius: "10px",
  },
};

export default function SyllabusOther() {
  const { other, setOther, error, handleFieldValidation } =
    useContext(SyllabusContext);
  const theme = useTheme();
  const isDownLg = useMediaQuery(theme.breakpoints.down("lg"));
  const { code } = useParams();
  const handleOtherChange = (event, value) => {
    const copy = { ...other };
    copy[event.target.name] = value;
    setOther(copy);
    handleFieldValidation(event.target.name, value);
  };
  const handleRichText = (content) => {
    setOther(() => ({
      ...other,
      trainingPrinciple: content,
    }));
  };
  return (
    <>
      <Grid
        container
        direction="row"
        spacing={2}
        sx={{ padding: "10px 16px 10px 16px" }}
      >
        <Grid
          item
          sx={
            {
              // paddingTop: "10px",
              // paddingLeft: "20px",
            }
          }
          xs={12}
          sm={12}
          lg={5}
        >
          <Box
            sx={{
              height: "100%",
              borderRadius: "10px",
              border: "1px solid #cccc",
              marginLeft: "auto",
              width: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
            }}
          >
            <Title>Time Allocation</Title>
            <Box display="flex" justifyContent="center">
              <Box
                sx={
                  isDownLg
                    ? {
                        height: "100%",
                        margin: "35px 0px 20px 0px",
                        width: { xs: "100%", sm: "80%", md: "50%" },
                      }
                    : { height: "309px", width: { lg: "70%" } }
                }
              >
                <TimeAllocation control />
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          sx={{ paddingTop: "10px", paddingLeft: "20px" }}
          xs={12}
          lg={7}
        >
          <Box
            sx={{
              // width: "60%",
              minHeight: "100%",
              borderRadius: "10px",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.16)",
            }}
          >
            <Title>Assessment scheme</Title>
            <Stack
              direction="column"
              spacing={2}
              sx={{
                padding: "20px 0 20px 0",
                margin: "0 16px 0 16px",
                borderBottom: "1px solid",
              }}
            >
              {Other.scheme1.map((item, index) => (
                <Box key={index}>
                  <Box
                    sx={{
                      display: "flex",
                      width: {
                        xs: "100%",
                        sm: "62%",
                        md: "52%",
                        lg: "52%",
                      },
                      justifyContent: "space-between",
                    }}
                  >
                    {item.title}
                    <TextField
                      error={error[item.name]}
                      required
                      type="number"
                      pattern
                      name={item.name}
                      value={other[item.name] ? other[item.name] : ""}
                      onChange={(e) =>
                        handleOtherChange(e, Number(e.target.value))
                      }
                      helperText={error[item.name] ? `required` : ""}
                      sx={TextFieldStyle}
                      InputProps={{
                        endAdornment: "%",
                        inputProps: {
                          maxLength: 2,
                        },
                      }}
                      onKeyDown={(event) => {
                        if (
                          event?.key === "-" ||
                          event?.key === "+" ||
                          event?.key === "="
                        ) {
                          event.preventDefault();
                        }
                      }}
                    ></TextField>
                  </Box>
                </Box>
              ))}
            </Stack>
            <Box
              sx={{
                padding: "10px 0px 10px 0px",
                margin: "0 16px 0 16px",
                borderBottom: "1px solid",
                display: "flex",
              }}
            >
              {Other.scheme2.map((item, index) => (
                <Grid container alignItems="center" key={index}>
                  <Grid item xs={12} sm={6} md={5} lg={6}>
                    <Typography>{item.title}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <TextField
                      required
                      error={error[item.name]}
                      name={item.name}
                      value={other[item.name] ? other[item.name] : ""}
                      type="number"
                      onChange={(e) =>
                        handleOtherChange(e, Number(e.target.value))
                      }
                      helperText={error[item.name] ? "Required" : ""}
                      InputProps={{
                        endAdornment: "%",
                      }}
                      sx={TextFieldStyle}
                      inputProps={{
                        maxLength: 2,
                      }}
                      onKeyDown={(event) => {
                        if (
                          event?.key === "-" ||
                          event?.key === "+" ||
                          event?.key === "="
                        ) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Grid>
                </Grid>
              ))}
            </Box>
            <Box sx={{ padding: "10px 16px" }}>
              <Typography fontWeight="bold">Passing criteria</Typography>
              <Box sx={{ marginTop: "10px", display: "flex", gap: "18%" }}>
                {Other.gpa.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      width: "172px",
                      justifyContent: "space-between",
                    }}
                  >
                    {item.title}
                    <TextField
                      required
                      error={error[item.name]}
                      name={item.name}
                      value={other[item.name] ? other[item.name] : ""}
                      type="number"
                      onChange={(e) =>
                        handleOtherChange(e, Number(e.target.value))
                      }
                      helperText={error[item.name] ? `Required` : ""}
                      sx={TextFieldStyle}
                      InputProps={{
                        endAdornment: "%",
                        inputProps: { maxLength: 2 },
                      }}
                      onKeyDown={(event) => {
                        if (
                          event?.key === "-" ||
                          event?.key === "+" ||
                          event?.key === "="
                        ) {
                          event.preventDefault();
                        }
                      }}
                    ></TextField>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item sx={{ width: "100%" }} xs={12} lg={12}>
          <Box sx={{ width: "100%" }}>
            <Box sx={BoxTitle}>
              <Title>Training delivery principle</Title>
            </Box>
            <RichText
              value={code ? other?.trainingPrinciple : other?.trainingPrinciple}
              onChange={handleRichText}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
