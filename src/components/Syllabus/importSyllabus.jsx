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
import * as XLSX from "xlsx";
import axios from "axios";
import { CSVLink } from "react-csv";
import ModalContainer from "../shared/ModalContainer";
import dayjs from "dayjs";
import styled from "@emotion/styled";
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

export function ImportSyllabus({ isOpen, handleClose }) {
  const [users, setUsers] = useState([]);
  const [checked, setChecked] = useState({});
  const [duplicateHandle, setDuplicateHandle] = React.useState("Allow");
  const [codeCheckboxChecked, setCodeCheckboxChecked] = useState(false);
  const [nameCheckboxChecked, setNameCheckboxChecked] = useState(false);
  const [file, setFile] = useState({});

  const [data, setData] = useState([]);
  console.log(data);
  const [cols, setCols] = useState([]);

  const handleDuplicateHandleChange = (event) => {
    setDuplicateHandle(event.target.value);
  };

  const makeCols = (refstr) => {
    let o = [],
      C = XLSX.utils.decode_range(refstr).e.c + 1;
    for (let i = 0; i < C; ++i)
      o[i] = { name: XLSX.utils.encode_col(i), key: i };
    return o;
  };

  const handleChange = (e) => {
    const files = e.target.files;
    if (files && files[0]) setFile(files[0]);
  };

  const handleFile = () => {
    try {
      const reader = new FileReader();
      const rABS = !!reader.readAsBinaryString;

      reader.onload = (e) => {
        const bstr = e.target.result;
        const wb = XLSX.read(bstr, {
          type: rABS ? "binary" : "array",
          bookVBA: true,
        });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const parsedData = XLSX.utils.sheet_to_json(ws);

        console.log(parsedData);

        setCols(makeCols(ws["!ref"]));
        setData(parsedData);

        const userData = parsedData.map((user) => ({
          id: user.id,
          syllabusName: user.syllabusName,
          code: user.code,
          createdOn: dayjs(user.createdOn).format("DD/MM/YYYY"),
          createdBy: user.createdBy,
          duration: user.duration,
          outputStandard: user.outputStandard,
          status: user.status,
        }));
      };

      if (rABS) {
        reader.readAsBinaryString(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const csvData = [
    [
      "id",
      "syllabusName",
      "code",
      "createdOn",
      "createdBy",
      "duration",
      "outputStandard",
      "status",
    ],
  ];

  return (
    <ModalContainer
      title={"Import Syllabus"}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <Box sx={style}>
        <Grid container sx={{ paddingRight: 4, paddingLeft: 4 }}>
          <Grid item xs={4}>
            <Typography sx={{ fontWeight: "bold" }}>Import setting</Typography>
          </Grid>
          <Grid item xs={8}>
            <Stack direction="row" spacing={4} sx={{ alignItems: "center" }}>
              <Stack spacing={2}>
                <Typography>File (csv)*</Typography>
                <Typography>Encoding type</Typography>
                <Typography>Column separator</Typography>
                <Typography>Import template</Typography>
              </Stack>
              <Stack spacing={2}>
                <Button
                  sx={{
                    background: "#2D3748",
                    height: 22,
                    maxWidth: 80,
                  }}
                  variant="contained"
                  size="small"
                  component="label"
                  role={undefined}
                  tabIndex={-1}
                >
                  Select
                  <VisuallyHiddenInput
                    type="file"
                    className="form-control"
                    id="file"
                    accept={[
                      "xlsx",
                      "xlsb",
                      "xlsm",
                      "xls",
                      "xml",
                      "csv",
                      "txt",
                      "ods",
                      "fods",
                      "uos",
                      "sylk",
                      "dif",
                      "dbf",
                      "prn",
                      "qpw",
                      "123",
                      "wb*",
                      "wq*",
                      "html",
                      "htm",
                    ]
                      .map((x) => "." + x)
                      .join(",")}
                    onChange={handleChange}
                  />
                </Button>
                <Select
                  sx={{
                    height: 22,
                    maxWidth: 300,
                    minWidth: 150,
                  }}
                  defaultValue={"Auto detect"}
                >
                  <MenuItem value={"Auto detect"}>Auto detect</MenuItem>
                  <MenuItem value={"UTF-8"}>UTF-8</MenuItem>
                </Select>
                <Select sx={{ height: 22 }} defaultValue={"Comma"}>
                  <MenuItem value={"Comma"}>Comma ,</MenuItem>
                  <MenuItem value={"Dot"}>Dot .</MenuItem>
                  <MenuItem value={"Semicolon"}>Semicolon ;</MenuItem>
                </Select>

                <CSVLink filename={"syllabus table.csv"} data={csvData}>
                  Download
                </CSVLink>
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
          <Grid item xs={4}>
            <Typography sx={{ fontWeight: "bold" }}>
              Duplicate control
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Box>
              <Box>
                <Typography>Scanning</Typography>
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
                        checked={codeCheckboxChecked}
                        onChange={(event) =>
                          setCodeCheckboxChecked(event.target.checked)
                        }
                      />
                    }
                    label="Syllabus code"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        sx={{
                          "&.Mui-checked": {
                            color: "#2D3748",
                          },
                        }}
                        checked={nameCheckboxChecked}
                        onChange={(event) =>
                          setNameCheckboxChecked(event.target.checked)
                        }
                      />
                    }
                    label="Syllabus name"
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
