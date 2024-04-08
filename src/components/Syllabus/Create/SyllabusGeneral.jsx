import React, { useContext } from "react";
import {
  Box,
  Grid,
  MenuItem,
  Select,
  Typography,
  styled,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import RichText from "../Detail/RichText";
import { KeyboardArrowDown } from "@mui/icons-material";
import FormHelperText from "@mui/material/FormHelperText";
import TimeAllocation from "../../shared/TimeAllocation";
import { SyllabusContext } from "../../../context/SyllabusContext";

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
export default function SyllabusGeneral() {
  const { general, setGeneral, error, handleFieldValidation } =
    useContext(SyllabusContext);
  const theme = useTheme();
  const isDownLg = useMediaQuery(theme.breakpoints.down("lg"));
  // const {level, message, attendee, error} = props
  const handleGeneral = (event, field) => {
    const copy = { ...general };
    if (field === "trainingAudience") {
      copy.trainingAudience = Number(event.target.value);
    } else {
      copy[event.target.name] = event.target.value;
    }
    handleFieldValidation(event.target.name, event.target.value);
    setGeneral(copy);
  };

  function isQuillEmpty(value) {
    if (
      value.replace(/<(.|\n)*?>/g, "").trim().length === 0 &&
      !value.includes("<img")
    ) {
      return "";
    }
    return "false";
  }
  const handleTechs = (content) => {
    setGeneral(() => ({
      ...general,
      technicalRequirement: content,
    }));
    handleFieldValidation("technicalRequirement", isQuillEmpty(content));
  };
  const handleCours = (content) => {
    setGeneral(() => ({
      ...general,
      courseObjective: content,
    }));
    handleFieldValidation("courseObjective", isQuillEmpty(content));
  };
  return (
    <>
      <Grid
        item
        container
        direction="row"
        spacing={2}
        xs={12}
        sm={12}
        md={12}
        sx={{ padding: "10px 16px 10px 16px" }}
      >
        <Grid
          item
          // lg={8}
          md={12}
          sm={12}
          xs={12}
          lg={8}
          // xs={} md={} lg={}
        >
          <Stack direction="column" gap="10px">
            <Box sx={{ display: "flex", gap: "5px" }}>
              <Typography fontWeight="bold" variant={"h6"}>
                Level
              </Typography>
              <Select
                required
                helpertext={error?.level ? "required" : ""}
                IconComponent={() => <KeyboardArrowDown />}
                displayEmpty
                sx={{
                  width: "270px",
                  height: "30px",
                  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  ".MuiSelect-select": { padding: 0, marginLeft: "15px" },
                }}
                name="level"
                error={error?.level}
                value={general?.level ? general.level : ""}
                onChange={handleGeneral}
              >
                <MenuItem disabled sx={{ display: "none" }} value="">
                  <p>Auto detect</p>
                </MenuItem>
                <MenuItem value={"Beginner"}>Beginner</MenuItem>
                <MenuItem value={"Advance"}>Advance</MenuItem>
              </Select>
              {error?.level ? (
                <FormHelperText error sx={{ fontSize: "0.75rem" }}>
                  required
                </FormHelperText>
              ) : (
                ""
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                width: "80%",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Typography fontWeight="bold" variant={"h6"}>
                Attendee number
              </Typography>
              <TextField
                required
                helperText={error?.trainingAudience ? "required" : ""}
                type="number"
                sx={{
                  borderRadius: "6px",
                  minHeight: "36px",
                  minWidth: "173px",
                }}
                InputProps={{ inputProps: { min: 1 } }}
                onKeyDown={(event) => {
                  if (event?.key === "-" || event?.key === "+") {
                    event.preventDefault();
                  }
                }}
                inputProps={{
                  maxlength: 2,
                }}
                name="trainingAudience"
                error={error?.trainingAudience}
                value={
                  general?.trainingAudience ? general.trainingAudience : ""
                }
                variant="outlined"
                onChange={(e) => handleGeneral(e, "trainingAudience")}
              />
            </Box>
            <Box>
              <Typography fontWeight="bold" variant={"h6"}>
                Technical Requirement(s)
              </Typography>
              <Box>
                <RichText
                  techs
                  error={error?.technicalRequirement}
                  value={general?.technicalRequirement}
                  onChange={handleTechs}
                />
                {error?.technicalRequirement ? (
                  <FormHelperText error sx={{ fontSize: "0.75rem" }}>
                    required
                  </FormHelperText>
                ) : (
                  ""
                )}
              </Box>
              <Typography fontWeight="bold" variant={"h6"}>
                Course Objectives
              </Typography>
              <Box sx={{}}>
                <RichText
                  error={error?.courseObjective}
                  value={general?.courseObjective}
                  onChange={handleCours}
                />
                {error?.courseObjective ? (
                  <FormHelperText error sx={{ fontSize: "0.75rem" }}>
                    required
                  </FormHelperText>
                ) : (
                  ""
                )}
              </Box>
            </Box>
          </Stack>
        </Grid>
        <Grid item container lg={2} justifyContent="flex-start">
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
                sx={
                  isDownLg
                    ? {
                        height: "209px",
                        margin: "35px 0px 20px 0px",
                        width: { xs: "100%", sm: "80%", md: "80%" },
                      }
                    : { height: "409px", width: { lg: "100%" } }
                }
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
