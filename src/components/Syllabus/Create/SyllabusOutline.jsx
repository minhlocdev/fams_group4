import React, { useContext, useRef, useState } from "react";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  TextField,
  Stack,
  styled,
  Typography,
  Chip,
  FormHelperText,
} from "@mui/material";
import { ArrowDownCircle } from "../../../assets/scss/icon";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CreateIcon from "@mui/icons-material/Create";
import TimeAllocation from "../../shared/TimeAllocation";
import DialogDelete from "./DialogDelete";
import {
  SyllabusDeleteWarningModal,
  SyllabusWarningModal,
} from "./SyllabusWarningModal";
import { SyllabusContext } from "../../../context/SyllabusContext";
import Day from "../Create/Day"

const button = {
  color: "white",
  width: "106px",
  borderRadius: "10px",
  height: "38px",
  backgroundColor: "#2D3748",
  "&:hover": { backgroundColor: "rgb(72 147 222 / 81%)" },
  fontWeight: "bold",
  margin: "10px",
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
export default function SyllabusOutline() {
  const { outline, setOutline, error, handleFieldValidation } =
    useContext(SyllabusContext);
    const [totalDay, setTotalDay] = useState(0);

  const addDay = (e) => {
    setTotalDay(totalDay + 1);
    const tempojt = {
      id: totalDay,
      content: [],
    };
    const tempData = [...outline];
    tempData.push(tempojt);
    setOutline(tempData);
    e.stopPropagation();
  };


  return (
    <>
      <Stack direction="row">
        <Box sx={{ width: "80%" }} key={"Outline"}>
          {outline?.length !== 0 && (
            <Box
              sx={{
                boxShadow: "0px 20px 40px 0px rgba(0, 0, 0, 0.16)",
                maxHeight: "500px",
                overflowY: "auto",
              }}
            >
              {/* //Day */}
              <Day setTotalDay={setTotalDay}/>
              </Box>
          )}
            
          <Button sx={button} onClick={(e) => addDay(e)}>
            Add day
          </Button>
        </Box>
        <Box
          sx={{
            width: "200px",
            height: "409px",
            borderRadius: "10px",
            border: "1px solid #cccc",
            marginLeft: "auto",
          }}
        >
          <Title>Time Allocation</Title>
          <Box sx={{ height: "409px" }}>
            <TimeAllocation />
          </Box>
        </Box>
      </Stack>
    </>
  );
}
