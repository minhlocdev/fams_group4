import React, { useMemo } from "react";
import { Card, CardContent, Typography, Grid, Box, Paper } from "@mui/material";
import {
  Biotech,
  ImportContactsOutlined,
  PersonOutline,
  SchoolOutlined,
} from "@mui/icons-material";
import theme from "../assets/theme";
import { useGetUserDashboard } from "../services/queries/userQuery";
import { useGetDeliveryDashboard } from "../services/queries/deliveryQuery";
import DeliveryChart from "../components/Dashboard/DeliveryChart";

const Dashboard = () => {
  const { data, isLoading } = useGetUserDashboard();
  const {
    data: deliveryType,
    isLoading: deliveryLoad,
    isSuccess: hasDelivery,
  } = useGetDeliveryDashboard();

  const deliveryData = useMemo(() => {
    if (hasDelivery) {
      return deliveryType.map((d) => d.totalDuration);
    }
  }, [deliveryType, hasDelivery]);
  console.log(deliveryData);

  if (isLoading && deliveryLoad) {
    return <div>Loading...</div>;
  }

  const cardComponents = [
    {
      icon: <SchoolOutlined sx={{ color: theme.primary, fontSize: "40px" }} />,
      value: data?.openingClass || 0,
      text: "Opening Class",
      color: "#80a8eb",
    },
    {
      icon: <Biotech sx={{ color: theme.green, fontSize: "40px" }} />,
      value: data?.activeTraining || 0,
      text: "Active Program",
      color: "#7eff93",
    },
    {
      icon: <PersonOutline sx={{ color: theme.orange, fontSize: "40px" }} />,
      value: data?.activeTrainer || 0,
      text: "Trainers",
      color: "#fbb185",
    },
    {
      icon: (
        <ImportContactsOutlined
          sx={{ color: theme.subinfo, fontSize: "40px" }}
        />
      ),
      value: data?.activeSyllabus || 0,
      text: "Active Syllabus",
      color: "#c3c3c3",
    },
  ];

  return (
    <>
      <Typography variant="h4" fontWeight={600} marginTop={10}>
        Dashboard
      </Typography>
      <Grid
        container
        flexWrap={"wrap"}
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        marginTop={2}
      >
        {cardComponents.map((item, index) => (
          <Grid item xs={12} md={6} sm={6} lg={3} key={index}>
            <Card
              className="trainer_card"
              style={{
                borderRadius: "8px",
                border: "1px solid #ddd",
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: "20px",
                }}
              >
                <Box
                  width={70}
                  height={70}
                  sx={{
                    backgroundColor: item.color,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "10px",
                  }}
                >
                  {item.icon}
                </Box>
                <Box>
                  <Typography
                    variant="h3"
                    component="div"
                    sx={{ fontWeight: "600", textAlign: "left" }}
                  >
                    {item.value}
                  </Typography>
                  <Typography
                    variant="p"
                    component="div"
                    sx={{ flex: "1", textAlign: "left" }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid item xs={8}></Grid>
        <Grid item xs={4}>
          <Paper
            elevation={3}
            sx={{
              padding: 3,
              position: "relative",
              width: "100%",
              height: "400px",
            }}
          >
            <DeliveryChart deliveryType={deliveryData} />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
