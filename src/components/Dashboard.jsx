import React, { useState } from "react";
import AppContainer from "./shared/layout/AppContainer";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Chip,
  Stack,
} from "@mui/material";

const Dashboard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [datas, setDatas] = useState((data) => [
    {
      id: 121,
      className: "C# basic program",
      classcode: "NPL",
      duration: "1",
      location: "Room B202",
      status: "Active",
    },
    {
      id: 122,
      className: "Java advanced program",
      classcode: "CBG",
      duration: "14",
      location: "Room B101",
      status: "Inactive",
    },
    {
      id: 123,
      className: "Python for beginners",
      classcode: "NET",
      duration: "30",
      location: "Room 544",
      status: "Draft",
    },
    {
      id: 124,
      className: "JavaScript fundamentals",
      classcode: "PYT",
      duration: "21",
      location: "Room 345",
      status: "Active",
    },
    {
      id: 125,
      className: "HTML and CSS basics",
      classcode: "DOF",
      duration: "10",
      location: "HCM",
      status: "Inactive",
    },
    {
      id: 126,
      className: "Data Structures and Algorithms",
      classcode: "AZD",
      duration: "30",
      location: "Ha Noi",
      status: "Draft",
    },
    {
      id: 127,
      className: "Python advanced program",
      classcode: "AWD",
      duration: "14",
      location: "Phu Quoc",
      status: "Active",
    },
    {
      id: 128,
      className: "Web Development Bootcamp",
      classcode: "FUJL",
      duration: "60",
      location: "Ha Noi",
      status: "Inactive",
    },
    {
      id: 129,
      className: "Machine Learning for Beginners",
      classcode: "FULN",
      duration: "30",
      location: "Ho Chi Minh",
      status: "Draft",
    },
    {
      id: 130,
      className: "React.js Fundamentals",
      classcode: "TES",
      duration: "14",
      location: "Quang Ninh",
      status: "Active",
    },
  ]);

  const [sortOrder, setSortOrder] = useState("asc");

  const handleSortTPName = (datas, sortOrder, setSortOrder, setDatas) => {
    let sortedData;
    if (sortOrder === "asc") {
      // Sắp xếp tăng dần
      sortedData = datas.sort((a, b) => a.className.localeCompare(b.className));
      setSortOrder("desc");
    } else {
      // Sắp xếp giảm dần
      sortedData = datas.sort((a, b) => b.className.localeCompare(a.className));
      setSortOrder("asc");
    }
    setDatas([...sortedData]);
  };

  const handleSortTPCode = (datas, sortOrder, setSortOrder, setDatas) => {
    let sortedData;
    if (sortOrder === "asc") {
      // Sắp xếp tăng dần
      sortedData = datas.sort((a, b) => a.classcode.localeCompare(b.classcode));
      setSortOrder("desc");
    } else {
      // Sắp xếp giảm dần
      sortedData = datas.sort((a, b) => b.classcode.localeCompare(a.classcode));
      setSortOrder("asc");
    }
    setDatas([...sortedData]);
  };

  const HandleSortTPDuration = (datas, sortOrder, setSortOrder, setDatas) => {
    let sortedData;
    if (sortOrder === "asc") {
      // Sắp xếp tăng dần
      sortedData = datas.sort((a, b) => a.duration - b.duration);
      setSortOrder("desc");
    } else {
      // Sắp xếp giảm dần
      sortedData = datas.sort((a, b) => b.duration - a.duration);
      setSortOrder("asc");
    }
    setDatas([...sortedData]);
  };

  return (
    <AppContainer>
      {/* Dashboard */}
      <Box style={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={6}
          justifyContent="center"
          alignItems="flex-start"
          sx={{ margin: "15px 40px 0", gap: "20px" }}
        >
          <Card
            className="trainer_card"
            sx={{
              background: "linear-gradient(135deg, #6b8ddd 0%, #b0c6f1 100%)",
              color: "white",
              borderRadius: "8px",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              border: "1px solid #ddd",
            }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <img
                src="/img/icon_Trainers.png"
                alt="Trainer"
                style={{ height: "65px", marginRight: "20px" }}
              />
              <Typography
                variant="h3"
                component="div"
                sx={{ flex: "1", textalign: "right", marginTop: "10px" }}
              >
                0
              </Typography>
            </CardContent>
            <CardHeader
              title="Trainer"
              sx={{ marginBottom: "5px", color: "whitesmoke" }}
            />
          </Card>

          <Card
            className="class_card"
            style={{
              background: "linear-gradient(-20deg, #ff868e 0%, #f9c27c 100%)",
              color: "white",
              borderRadius: "8px",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              border: "1px solid #ddd",
            }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <img
                src="/img/icon_Class.png"
                alt="Class"
                style={{ height: "65px", marginRight: "20px" }}
              />
              <Typography
                variant="h3"
                component="div"
                sx={{ flex: "1", textalign: "right", marginTop: "10px" }}
              >
                0
              </Typography>
            </CardContent>
            <CardHeader
              title="Class"
              sx={{ marginBottom: "5px", color: "whitesmoke" }}
            />
          </Card>

          <Card
            className="syllabus_card"
            style={{
              background: "linear-gradient(to right, #84fab0 0%, #8fd3f4 100%)",
              color: "white",
              borderRadius: "8px",
              boxShadow:
                "0 8px 16px rgba(0, 0, 0, 0.2)" /* Tăng độ mờ và đổ bóng */,
              border: "1px solid #ddd",
            }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <img
                src="/img/icon_Syllabus.png"
                alt="Syllabus"
                style={{ height: "65px", marginRight: "20px" }}
              />
              <Typography
                variant="h3"
                component="div"
                sx={{ flex: "1", textalign: "right", marginTop: "10px" }}
              >
                0
              </Typography>
            </CardContent>
            <CardHeader
              title="Syllabus"
              sx={{ marginBottom: "5px", color: "whitesmoke" }}
            />
          </Card>

          <Card
            className="trainingProgram_card"
            style={{
              background: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
              color: "white",
              borderRadius: "8px",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              border: "1px solid #ddd",
            }}
          >
            <CardContent sx={{ display: "flex", alignItems: "center" }}>
              <img
                src="/img/icon_TrainingProgram.png"
                alt="TrainingProgram"
                style={{ height: "65px", marginRight: "20px" }}
              />
              <Typography
                variant="h3"
                component="div"
                sx={{ flex: "1", textalign: "right", marginTop: "10px" }}
              >
                0
              </Typography>
            </CardContent>
            <CardHeader
              title="TrainingProgram"
              sx={{ marginBottom: "5px", color: "whitesmoke" }}
            />
          </Card>
        </Grid>
      </Box>
      {/* Table */}
      <Box sx={{ marginTop: "30px" }}>
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          <TableContainer sx={{ marginTop: 3, borderRadius: 1, width: "100%" }}>
            <Table
              sx={{
                borderRadius: "10px",
                maxHeight: "400px",
                // marginLeft: "auto",
                width: "100%",
                maxWidth: "700px",
                overflowY: "auto",
                scrollbarWidth: "thin",
                scrollbarColor: "#ddd #fff",
                WebkitOverflowScrolling: "touch",
              }}
            >
              <TableHead sx={{ background: "#2D3748", color: "#fff" }}>
                <TableRow
                  sx={{
                    height: "40px",
                    textAlign: "center",
                  }}
                >
                  <TableCell
                    sx={{
                      fontSize: "18px",
                      color: "white",
                      width: "20%",
                      pt: 1,
                      pb: 1,
                    }}
                    align="left"
                    onClick={() =>
                      handleSortTPName(datas, sortOrder, setSortOrder, setDatas)
                    }
                  >
                    Class Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "18px",
                      color: "white",
                      width: "10%",
                      pl: 0,
                      pr: 0,
                      pt: 1,
                      pb: 1,
                    }}
                    align="left"
                    onClick={() =>
                      handleSortTPCode(datas, sortOrder, setSortOrder, setDatas)
                    }
                  >
                    Class Code
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "18px",
                      color: "white",
                      width: "10%",
                      pl: 0,
                      pr: 0,
                      pt: 1,
                      pb: 1,
                    }}
                    align="left"
                    onClick={() =>
                      HandleSortTPDuration(
                        datas,
                        sortOrder,
                        setSortOrder,
                        setDatas
                      )
                    }
                  >
                    Duration
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "18px",
                      color: "white",
                      width: "10%",
                      pt: 1,
                      pb: 1,
                    }}
                    align="left"
                    onClick={() =>
                      handleSortTPName(datas, sortOrder, setSortOrder, setDatas)
                    }
                  >
                    Location
                  </TableCell>
                  <TableCell
                    sx={{
                      fontSize: "18px",
                      color: "white",
                      width: "10%",
                      pl: 2,
                      pr: 0,
                      pt: 1,
                      pb: 1,
                    }}
                    align="left"
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {datas.map((data) => (
                  <TableRow
                    key={data.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      maxHeight: "30px",
                    }}
                  >
                    <TableCell
                      sx={{
                        width: "20%",
                        fontWeight: "bold",
                        pt: 0.5,
                        pb: 0.5,
                      }}
                      align="left"
                    >
                      {data.className}
                    </TableCell>
                    <TableCell sx={{ width: "10%", p: 0.5 }} align="left">
                      {data.classcode}
                    </TableCell>
                    <TableCell sx={{ width: "10%", p: 0.5 }} align="left">
                      {data.duration >= 2
                        ? data.duration + " days"
                        : data.duration + " day"}
                    </TableCell>
                    <TableCell sx={{ width: "10%", p: 0.5 }} align="left">
                      {data.location}
                    </TableCell>
                    <TableCell sx={{ width: "10%", p: 0.5 }} align="left">
                      {data.status === "Active" ? (
                        <Chip
                          sx={{
                            background: "#2D3748",
                            color: "white",
                            width: "75px",
                            height: "28px",
                          }}
                          label={data.status}
                        />
                      ) : data.status === "Inactive" ? (
                        <Chip
                          sx={{
                            background: "#B9B9B9",
                            color: "white",
                            width: "75px",
                            height: "28px",
                          }}
                          label={data.status}
                        />
                      ) : data.status === "Draft" ? (
                        <Chip
                          sx={{
                            background: "#285D9A",
                            color: "white",
                            width: "75px",
                            height: "28px",
                          }}
                          label={data.status}
                        />
                      ) : null}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {/* <div className="chart" 
              style={{ 
                width: "50%",
                maxWidth:"400px",
                marginLeft:"auto",
                marginRight:"auto"  
              }}>
          <Typography variant="h4" align="center" style={{ marginBottom: "10px" }}>
            <strong>Class Status Statistics</strong>
          </Typography>
          
          <canvas id="statusChart" 
              style={{
                display:"flex",
                boxSizing:"border-box",
                height:"376px",
                width:"376px"
          }}></canvas>
        </div> */}
        </Stack>
      </Box>

      {/* End Dashboard */}
    </AppContainer>
  );
};

export default Dashboard;
