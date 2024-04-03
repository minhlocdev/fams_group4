import React, { useContext } from "react";

import "react-day-picker/dist/style.css";
import theme from "../../../assets/theme";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import { Divider, Grid, List, ListItem, Stack } from "@mui/material";
import {
  AccessAlarm,
  CalendarToday,
  HomeWorkOutlined,
  Info,
  MailOutline,
  PhoneInTalk,
  RecordVoiceOverOutlined,
  StarBorderOutlined,
  StarsOutlined,
} from "@mui/icons-material";
import { InfoTooltip, ExpandMore } from "../../shared/lib/CustomMUI";
import ClassContext from "../../../context/ClassContext";
import GeneralSkeleton from "../ClassSkeleton/GeneralSkeleton";

export default function General() {
  const { classData } = useContext(ClassContext);
  const [expanded, setExpanded] = React.useState(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  if (!classData) {
    return <GeneralSkeleton />;
  }
  const {
    classTime,
    location,
    fsu,
    createdBy,
    createdDate,
    infoTrainers,
    infoAdmins,
    emailFSU,
  } = classData;
  const getCampus = (array) => {
    const campus = array.map((a) => a.location);
    const uniqueCampus = [...new Set(campus)];
    return uniqueCampus;
  };
  const getTrainers = (array) => {
    const unique = array.reduce((accumulator, current) => {
      if (!accumulator.some((x) => x.trainerId === current.trainerId)) {
        accumulator.push(current);
      }
      return accumulator;
    }, []);
    return unique;
  };
  return (
    <>
      <Stack
        direction={"row"}
        width={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{
          backgroundColor: theme.primary,
          color: "#fff",
          px: "15px",
          borderRadius: "10px",
          transition: "background-color .3s linear",
          marginBottom: "5px",
        }}
      >
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <CalendarToday fontSize="small" />
          <Typography variant="p" fontWeight={600}>
            General
          </Typography>
        </Stack>

        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon sx={{ color: "#fff" }} />
        </ExpandMore>
      </Stack>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Grid
          container
          alignItems={"flex-start"}
          sx={{
            backgroundColor: "#fff",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            borderRadius: "10px",
            padding: "20px",
            textAlign: { lg: "left", xs: "center" },
            color: "#000",
          }}
        >
          {/* time */}
          <Grid item xs={4} paddingBottom={3}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <AccessAlarm fontSize="small" color="primary" />
              <Typography variant="p" fontWeight={600}>
                Class Time
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={8} paddingBottom={3}>
            <Typography variant="span">{classTime}</Typography>
          </Grid>
          {/* location */}
          <Grid item xs={4} paddingBottom={1}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <HomeWorkOutlined fontSize="small" color="primary" />
              <Typography variant="p" fontWeight={600}>
                Location
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={8} paddingBottom={1}>
            <Stack spacing={2}>
              <Typography variant="span">{location}</Typography>
            </Stack>
          </Grid>
          {getCampus(infoTrainers).map((tr, index) => (
            <React.Fragment key={index}>
              <Grid item xs={4} paddingTop={1}></Grid>
              <Grid item xs={8} paddingBottom={1}>
                <Typography variant="span">{tr}</Typography>
              </Grid>
            </React.Fragment>
          ))}
          {/* trainer */}
          <Grid item xs={4} paddingBottom={3}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <RecordVoiceOverOutlined fontSize="small" color="primary" />
              <Typography variant="p" fontWeight={600}>
                Trainer
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={8} paddingBottom={3}>
            <Stack spacing={2}>
              {getTrainers(infoTrainers).map((trainer, index) => (
                <Typography
                  key={index}
                  variant="span"
                  sx={{ textDecoration: "underline", color: "#285D9A" }}
                >
                  {trainer.name}
                  <InfoTooltip
                    title={
                      <List>
                        <ListItem sx={{ padding: "0" }}>
                          <PhoneInTalk color="primary" />
                          <Typography variant="p" p={1} fontSize={"14px"}>
                            {trainer.phone}
                          </Typography>
                        </ListItem>
                        <ListItem sx={{ padding: "0" }}>
                          <MailOutline color="primary" />
                          <Typography variant="p" p={1} fontSize={"14px"}>
                            {trainer.email}
                          </Typography>
                        </ListItem>
                      </List>
                    }
                  >
                    <Info
                      color="success"
                      fontSize="10px"
                      sx={{ cursor: "pointer" }}
                    />
                  </InfoTooltip>
                </Typography>
              ))}
            </Stack>
          </Grid>
          {/* admin */}
          <Grid item xs={4} paddingBottom={3}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <StarBorderOutlined fontSize="small" color="primary" />
              <Typography variant="p" fontWeight={600}>
                Admin
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={8} paddingBottom={3}>
            <Stack spacing={2}>
              {infoAdmins.map((admin) => (
                <Typography
                  variant="span"
                  sx={{ textDecoration: "underline", color: "#285D9A" }}
                >
                  {admin.name}
                  <InfoTooltip
                    title={
                      <List>
                        <ListItem sx={{ padding: "0" }}>
                          <PhoneInTalk color="primary" />
                          <Typography variant="p" p={1} fontSize={"14px"}>
                            {admin.phoneNumber}
                          </Typography>
                        </ListItem>
                        <ListItem sx={{ padding: "0" }}>
                          <MailOutline color="primary" />
                          <Typography variant="p" p={1} fontSize={"14px"}>
                            {admin.email}
                          </Typography>
                        </ListItem>
                      </List>
                    }
                  >
                    <Info
                      color="success"
                      fontSize="10px"
                      sx={{ cursor: "pointer" }}
                    />
                  </InfoTooltip>
                </Typography>
              ))}
            </Stack>
          </Grid>
          {/* FSU */}
          <Grid item xs={4} paddingBottom={1}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <StarsOutlined fontSize="small" color="primary" />
              <Typography variant="p" fontWeight={600}>
                FSU
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={8} paddingBottom={1}>
            <Typography variant="span">{fsu}</Typography>
          </Grid>
          <Grid item xs={4} paddingBottom={3}></Grid>
          <Grid item xs={8} paddingBottom={3}>
            {emailFSU}
          </Grid>

          <Grid item xs={12} paddingBottom={3}>
            <Divider />
          </Grid>
          {/* create */}
          <Grid item xs={4} paddingBottom={3} textAlign={"left"}>
            <Typography variant="p" fontWeight={600}>
              Created
            </Typography>
          </Grid>
          <Grid item xs={8} paddingBottom={3}>
            <Typography variant="p">{`${createdDate} by ${createdBy}`}</Typography>
          </Grid>
          {/* review */}
          <Grid item xs={4} paddingBottom={3} textAlign={"left"}>
            <Typography variant="p" fontWeight={600}>
              Review
            </Typography>
          </Grid>
          <Grid item xs={8} paddingBottom={3}>
            <Typography variant="p">25/03/2022 by DanPL</Typography>
          </Grid>
          {/* approve */}
          <Grid item xs={4} paddingBottom={3} textAlign={"left"}>
            <Typography variant="p" fontWeight={600}>
              Approve
            </Typography>
          </Grid>
          <Grid item xs={8} paddingBottom={3}>
            <Typography variant="p">25/03/2022 by DanPL</Typography>
          </Grid>
        </Grid>
      </Collapse>
    </>
  );
}
