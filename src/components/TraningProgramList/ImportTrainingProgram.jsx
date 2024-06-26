import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ModalContainer from "../shared/ModalContainer";
import styled from "@emotion/styled";
import { TRAINING_TEMPLATE } from "../../constants/FileLink";
import { useAuth } from "../../utils/authUtil";
import ToastEmitter from "../shared/lib/ToastEmitter";
import queryClient from "../../services/queries/queryClient";
import { QUERY_PROGRAM_KEY } from "../../constants/query";
import { usePostImportProgramMutation } from "../../services/queries/programQuery";
const style = {
  py: 0,
  width: "100%",
  borderColor: "divider",
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function ImportTrainingProgram({ isOpen, handleClose }) {
  const { loginUser } = useAuth();
  const [duplicateHandle, setDuplicateHandle] = React.useState("Allow");
  const [scanning, setScanning] = useState([]);
  const [file, setFile] = useState({});
  const handleDuplicateHandleChange = (event) => {
    setDuplicateHandle(event.target.value);
  };

  const handleChange = (e) => {
    e.preventDefault();
    const files = e.target.files;
    setFile(files);
  };

  const { mutate, isPending } = usePostImportProgramMutation();
  const handleFile = () => {
    mutate(
      {
        userId: loginUser.id,
        importType: duplicateHandle,
        scan: scanning.join(","),
        file: file[0],
      },
      {
        onSuccess: () => {
          ToastEmitter.update(
            "Import program successfully!!!",
            "loading",
            "success"
          );
          handleClose();
          queryClient.invalidateQueries({
            queryKey: [QUERY_PROGRAM_KEY],
          });
        },
        onError: () => {
          ToastEmitter.update(`Import program failed!!`, "loading", "error");
        },
      }
    );
  };
  if (isPending) {
    ToastEmitter.loading("...Loading", "loading");
  }
  const handleDownload = () => {
    window.open(TRAINING_TEMPLATE);
  };
  const handleCheck = (e) => {
    if (e.target.checked) {
      setScanning((prevScanning) => [...prevScanning, e.target.value]);
    } else {
      setScanning((prevScanning) =>
        prevScanning.filter((v) => v !== e.target.value)
      );
    }
  };
  return (
    <ModalContainer
      title={"Import Training Program"}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <Box sx={style}>
        <Grid container sx={{ paddingRight: 4, paddingLeft: 4 }}>
          <Grid
            item
            xs={12}
            sm={4}
            display="flex"
            justifyContent={{ xs: "center", sm: "flex-start" }}
          >
            <Typography sx={{ fontWeight: "bold" }}>Import setting</Typography>
          </Grid>
          <Grid item xs={8}>
            <Stack gap={2}>
              <Stack
                justifyContent={"space-between"}
                direction="row"
                spacing={2}
                sx={{ alignItems: "center" }}
              >
                <Typography>File (csv)*</Typography>
                <Button
                  sx={{
                    background: "#2D3748",
                    maxWidth: "100%",
                    wordWrap: "break-word",
                    wordBreak: "break-all",
                  }}
                  variant="contained"
                  size="small"
                  component="label"
                  role={undefined}
                  tabIndex={-1}
                >
                  {file[0]?.name || "Select"}
                  <VisuallyHiddenInput
                    type="file"
                    className="form-control"
                    id="file"
                    onChange={handleChange}
                  />
                </Button>
              </Stack>
              <Stack
                justifyContent={"space-between"}
                direction="row"
                spacing={2}
                sx={{ alignItems: "center" }}
              >
                <Typography>Encoding type</Typography>
                <Select
                  sx={{
                    height: 22,
                    maxWidth: 300,
                    minWidth: "auto",
                  }}
                  defaultValue={"Auto detect"}
                >
                  <MenuItem value={"Auto detect"}>Auto detect</MenuItem>
                  <MenuItem value={"UTF-8"}>UTF-8</MenuItem>
                </Select>
              </Stack>
              <Stack
                justifyContent={"space-between"}
                direction="row"
                spacing={2}
                sx={{ alignItems: "center" }}
              >
                <Typography>Column separator</Typography>{" "}
                <Select sx={{ height: 22 }} defaultValue={"Comma"}>
                  <MenuItem value={"Comma"}>Comma ,</MenuItem>
                  <MenuItem value={"Dot"}>Dot .</MenuItem>
                  <MenuItem value={"Semicolon"}>Semicolon ;</MenuItem>
                </Select>
              </Stack>
              <Stack
                justifyContent={"space-between"}
                direction="row"
                spacing={2}
                sx={{ alignItems: "center" }}
              >
                <Typography>Import template</Typography>{" "}
                <Button
                  onClick={handleDownload}
                  variant="contained"
                  color="primary"
                >
                  Download
                </Button>
              </Stack>
            </Stack>
          </Grid>
        </Grid>

        <Divider
          sx={{ background: "#ACACAC", marginTop: 3, marginBottom: 3 }}
          variant="middle"
          component="li"
        />

        <Grid container sx={{ paddingRight: 4, paddingLeft: 4 }}>
          <Grid
            item
            xs={12}
            sm={4}
            display="flex"
            justifyContent={{ xs: "center", sm: "flex-start" }}
          >
            <Typography sx={{ fontWeight: "bold" }}>
              Duplicate control
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Box>
              <Box>
                <Typography>Scanning program by</Typography>
                <FormGroup
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2D3748",
                          },
                        }}
                        // defaultChecked
                        checked={scanning.find((v) => v === "Code")}
                        value={"Code"}
                        onChange={handleCheck}
                      />
                    }
                    label="Code"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2D3748",
                          },
                        }}
                        value={"Name"}
                        checked={scanning.find((v) => v === "Name")}
                        onChange={handleCheck}
                      />
                    }
                    label="Name"
                  />
                </FormGroup>
              </Box>
              <Box>
                <Typography>Duplicate handle</Typography>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={duplicateHandle}
                  onChange={handleDuplicateHandleChange}
                >
                  <FormControlLabel
                    value="Allow"
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": {
                            color: "#2D3748",
                          },
                        }}
                      />
                    }
                    label="Allow"
                  />
                  <FormControlLabel
                    value="Replace"
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": {
                            color: "#2D3748",
                          },
                        }}
                      />
                    }
                    label="Replace"
                  />
                  <FormControlLabel
                    value="Skip"
                    control={
                      <Radio
                        sx={{
                          "&.Mui-checked": {
                            color: "#2D3748",
                          },
                        }}
                      />
                    }
                    label="Skip"
                  />
                </RadioGroup>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Divider
          sx={{ background: "#ACACAC", marginTop: 3, marginBottom: 3 }}
          variant="middle"
          component="li"
        />

        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: "flex-end", marginRight: 5 }}
        >
          <Button
            variant="text"
            sx={{
              color: "#E74A3B",
              textDecoration: "underline",
              maxHeight: 27,
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ maxHeight: 27, background: "#2D3748" }}
            onClick={() => handleFile()}
          >
            Import
          </Button>
        </Stack>
      </Box>
    </ModalContainer>
  );
}
