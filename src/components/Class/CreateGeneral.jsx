import React, { useContext, useEffect, useMemo, useState } from "react";

import "react-day-picker/dist/style.css";
import theme from "../../assets/theme";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import {
  Divider,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
  Skeleton,
  Stack,
} from "@mui/material";
import { useLocation } from "react-router-dom";
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
import { InfoTooltip, ExpandMore } from "../shared/lib/CustomMUI";
import TimePickerViews from "./TimePicker";
import ClassContext from "../../context/ClassContext";
import { useGetAllTrainerQuery } from "../../services/queries/trainingQuery";

export default function CreateGeneral() {
  const location = useLocation();

  const mode = location.pathname.includes("detail"); //true=detail false=create/edit

  const [expanded, setExpanded] = React.useState(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const {
    admin,
    fsu,
    contact,
    trainers,
    handleTrainers,
    handleContact,
    handleAdmin,
    handleFsu,
  } = useContext(ClassContext);
  const { data, isSuccess, isLoading } = useGetAllTrainerQuery();
  useEffect(() => {
    if (isSuccess) handleTrainers(data);
  }, [data, isSuccess]);
  const filteredEmails = useMemo(() => {
    if (!fsu && trainers) {
      return trainers.map((user) => user.email);
    }
    const filteredUsers = trainers.filter((user) => user.fsu === fsu);
    return filteredUsers.map((user) => user.email);
  }, [fsu, trainers]);
  return (
    <>
      <Stack
        direction={"row"}
        width={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{
          backgroundColor: !expanded
            ? mode
              ? theme.primary
              : theme.unmodified
            : theme.primary,
          color: "#fff",
          px: "15px",
          borderRadius: "10px",
          marginBottom: "5px",
          transition: "background-color .3s linear",
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
          <Grid item xs={4} paddingBottom={3} py={1}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <AccessAlarm fontSize="small" color="primary" />
              <Typography variant="p" fontWeight={600}>
                Class Time
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={8} alignItems={"center"} paddingBottom={3}>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <Typography variant="span">from</Typography>
              <TimePickerViews />
              <Typography variant="span">to</Typography>
              <TimePickerViews />
            </Stack>
          </Grid>
          {/* location */}
          <Grid item xs={4} paddingBottom={3} sx={{ color: theme.unmodified }}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <HomeWorkOutlined fontSize="small" />
              <Typography variant="p" fontWeight={600}>
                Location
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={8} paddingBottom={3}></Grid>
          {/* trainer */}
          <Grid item xs={4} paddingBottom={3} sx={{ color: theme.unmodified }}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <RecordVoiceOverOutlined fontSize="small" />
              <Typography variant="p" fontWeight={600}>
                Trainer
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={8} paddingBottom={3}></Grid>
          {/* admin */}
          <Grid item xs={4} paddingBottom={3}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <StarBorderOutlined fontSize="small" color="primary" />
              <Typography variant="p" fontWeight={600}>
                Admin
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={8} paddingBottom={2}>
            {isLoading ? (
              <Skeleton variant="rectangle" width={300} height={30} />
            ) : (
              <Stack spacing={1}>
                {admin?.map((a) => (
                  <Typography
                    variant="span"
                    sx={{ textDecoration: "underline", color: "#285D9A" }}
                  >
                    {a.name}
                    <InfoTooltip
                      title={
                        <List>
                          <ListItem sx={{ padding: "0" }}>
                            <PhoneInTalk color="primary" />
                            <Typography variant="p" p={1} fontSize={"14px"}>
                              {a.phone}
                            </Typography>
                          </ListItem>
                          <ListItem sx={{ padding: "0" }}>
                            <MailOutline color="primary" />
                            <Typography variant="p" p={1} fontSize={"14px"}>
                              {a.email}
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
                <FormControl sx={{ m: 1, width: "100%" }} size="small">
                  <InputLabel id="admin">Admin</InputLabel>
                  <Select
                    value={admin}
                    labelId="admin"
                    onChange={(e) => handleAdmin(e.target.value)}
                    multiple
                  >
                    {trainers.map((a) => (
                      <MenuItem value={a} key={a.id}>
                        {a.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            )}
          </Grid>
          {/* FSU */}
          <Grid item xs={4} paddingTop={1}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <StarsOutlined fontSize="small" color="primary" />
              <Typography variant="p" fontWeight={600}>
                FSU
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={8} paddingBottom={2}>
            {isLoading ? (
              <Skeleton variant="rectangle" width={300} height={30} />
            ) : (
              <FormControl sx={{ width: "100%" }} size="small">
                <InputLabel id="fsu">FSU</InputLabel>
                <Select
                  labelId="fsu"
                  value={fsu}
                  onChange={(e) => handleFsu(e.target.value)}
                >
                  <MenuItem value={"FHU"}>FHU</MenuItem>
                  <MenuItem value={"FHM"}>FHM</MenuItem>
                  <MenuItem value={"FHT"}>FHT</MenuItem>
                </Select>
              </FormControl>
            )}
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={8} paddingBottom={3}>
            {isLoading ? (
              <Skeleton variant="rectangle" width={300} height={30} />
            ) : (
              <FormControl sx={{ width: "100%" }} size="small">
                <InputLabel id="contact">Contact</InputLabel>
                <Select
                  labelId="contact"
                  value={contact}
                  onChange={(e) => handleContact(e.target.value)}
                >
                  {filteredEmails.map((email) => (
                    <MenuItem value={email} key={email}>
                      {email}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Grid>

          <Grid item xs={12} paddingBottom={3}>
            <Divider />
          </Grid>
          {/* create */}
          <Grid
            item
            xs={4}
            paddingBottom={3}
            textAlign={"left"}
            sx={{ color: theme.unmodified }}
          >
            <Typography variant="p" fontWeight={600}>
              Created
            </Typography>
          </Grid>
          <Grid
            item
            xs={8}
            paddingBottom={3}
            sx={{ color: theme.unmodified }}
          ></Grid>
          {/* review */}
          <Grid
            item
            xs={4}
            paddingBottom={3}
            textAlign={"left"}
            sx={{ color: theme.unmodified }}
          >
            <Typography variant="p" fontWeight={600}>
              Review
            </Typography>
          </Grid>
          <Grid item xs={8} paddingBottom={3}></Grid>
          {/* approve */}
          <Grid
            item
            xs={4}
            paddingBottom={3}
            textAlign={"left"}
            sx={{ color: theme.unmodified }}
          >
            <Typography variant="p" fontWeight={600}>
              Approve
            </Typography>
          </Grid>
          <Grid item xs={8} paddingBottom={3}></Grid>
        </Grid>
      </Collapse>
    </>
  );
}
