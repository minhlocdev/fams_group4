import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Stack,
} from "@mui/material";

const Dashboard = () => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
      justifyContent="center"
      alignItems="stretch"
      width="90%"
    >
      {/* SECTION FOR THE TRAINER CARD */}
      <Card
        className="trainer_card"
        style={{
          background: "linear-gradient(135deg, #6b8ddd 0%, #b0c6f1 100%)",
          color: "white",
          borderRadius: "8px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          border: "1px solid #ddd",
          // width: { xs: "100%", md: "calc(50% - 10px)", lg: "calc(25% - 10px)" } //Set width for the responsive
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
            sx={{ flex: "1", textAlign: "right", marginTop: "10px" }}
          >
            0
          </Typography>
        </CardContent>
        <CardHeader
          title="Trainer"
          sx={{ marginBottom: "5px", color: "whitesmoke" }}
        />
      </Card>

      {/* SECTION for the Class Card */}
      <Card
        className="class_card"
        style={{
          background: "linear-gradient(-20deg, #ff868e 0%, #f9c27c 100%)",
          color: "white",
          borderRadius: "8px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          border: "1px solid #ddd",
          width: {
            xs: "100%",
            sm: "calc(50% - 10px)",
            md: "calc(25% - 10px)",
          }, //Set width for the responsive
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
            sx={{ flex: "1", textAlign: "right", marginTop: "10px" }}
          >
            0
          </Typography>
        </CardContent>
        <CardHeader
          title="Class"
          sx={{ marginBottom: "5px", color: "whitesmoke" }}
        />
      </Card>

      {/* SECTION for the Syllabus Card */}
      <Card
        className="syllabus_card"
        style={{
          background: "linear-gradient(to right, #84fab0 0%, #8fd3f4 100%)",
          color: "white",
          borderRadius: "8px",
          boxShadow:
            "0 8px 16px rgba(0, 0, 0, 0.2)" /* Tăng độ mờ và đổ bóng */,
          border: "1px solid #ddd",
          width: {
            xs: "100%",
            sm: "calc(50% - 10px)",
            md: "calc(25% - 10px)",
          }, //Set width for the responsive
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
            sx={{ flex: "1", textAlign: "right", marginTop: "10px" }}
          >
            0
          </Typography>
        </CardContent>
        <CardHeader
          title="Syllabus"
          sx={{ marginBottom: "5px", color: "whitesmoke" }}
        />
      </Card>

      {/* SECTION for the Training Program Card */}
      <Card
        className="trainingProgram_card"
        style={{
          background: "linear-gradient(120deg, #f6d365 0%, #fda085 100%)",
          color: "white",
          borderRadius: "8px",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          border: "1px solid #ddd",
          width: {
            xs: "100%",
            sm: "calc(50% - 10px)",
            md: "calc(25% - 10px)",
          },
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
            sx={{ flex: "1", textAlign: "right", marginTop: "10px" }}
          >
            0
          </Typography>
        </CardContent>
        <CardHeader
          title="Training"
          sx={{ marginBottom: "5px", color: "whitesmoke" }}
        />
      </Card>
    </Stack>
  );
};

export default Dashboard;
