import React from "react";

import "react-day-picker/dist/style.css";
import theme from "../../assets/theme";
import Collapse from "@mui/material/Collapse";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandCircleDownOutlined";
import { Divider, Grid, List, ListItem, Stack } from "@mui/material";
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

export default function General() {
  const location = useLocation();

  const mode = location.pathname.includes("detail"); //true=detail false=create/edit

  const [expanded, setExpanded] = React.useState(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
            <Typography variant="span">09:00 - 12:00</Typography>
          </Grid>
          {/* location */}
          <Grid item xs={4} paddingBottom={3}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <HomeWorkOutlined fontSize="small" color="primary" />
              <Typography variant="p" fontWeight={600}>
                Location
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={8} paddingBottom={3}>
            <Stack spacing={2}>
              <Typography variant="span">Ftown2</Typography>
              <Typography variant="span">Ftown3</Typography>
            </Stack>
          </Grid>
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
              <Typography
                variant="span"
                sx={{ textDecoration: "underline", color: "#285D9A" }}
              >
                Dinh Vu Quoc Trung
                <InfoTooltip
                  title={
                    <List>
                      <ListItem sx={{ padding: "0" }}>
                        <PhoneInTalk color="primary" />
                        <Typography variant="p" p={1} fontSize={"14px"}>
                          097899084
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ padding: "0" }}>
                        <MailOutline color="primary" />
                        <Typography variant="p" p={1} fontSize={"14px"}>
                          TrungDVQ@fsoft.com.vn
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
              <Typography
                variant="span"
                sx={{ textDecoration: "underline", color: "#285D9A" }}
              >
                Ba Chu Heo
                <InfoTooltip
                  title={
                    <List>
                      <ListItem sx={{ padding: "0" }}>
                        <PhoneInTalk color="primary" />
                        <Typography variant="p" p={1} fontSize={"14px"}>
                          097899084
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ padding: "0" }}>
                        <MailOutline color="primary" />
                        <Typography variant="p" p={1} fontSize={"14px"}>
                          TrungDVQ@fsoft.com.vn
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
              <Typography
                variant="span"
                sx={{ textDecoration: "underline", color: "#285D9A" }}
              >
                Heo Chu Ba
                <InfoTooltip
                  title={
                    <List>
                      <ListItem sx={{ padding: "0" }}>
                        <PhoneInTalk color="primary" />
                        <Typography variant="p" p={1} fontSize={"14px"}>
                          097899084
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ padding: "0" }}>
                        <MailOutline color="primary" />
                        <Typography variant="p" p={1} fontSize={"14px"}>
                          TrungDVQ@fsoft.com.vn
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
              <Typography
                variant="span"
                sx={{ textDecoration: "underline", color: "#285D9A" }}
              >
                Tap The Lop
                <InfoTooltip
                  title={
                    <List>
                      <ListItem sx={{ padding: "0" }}>
                        <PhoneInTalk color="primary" />
                        <Typography variant="p" p={1} fontSize={"14px"}>
                          097899084
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ padding: "0" }}>
                        <MailOutline color="primary" />
                        <Typography variant="p" p={1} fontSize={"14px"}>
                          TrungDVQ@fsoft.com.vn
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
              <Typography variant="span">
                Dinh Vu Quoc Trung
                <InfoTooltip
                  title={
                    <List>
                      <ListItem sx={{ padding: "0" }}>
                        <PhoneInTalk color="primary" />
                        <Typography variant="p" p={1} fontSize={"14px"}>
                          097899084
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ padding: "0" }}>
                        <MailOutline color="primary" />
                        <Typography variant="p" p={1} fontSize={"14px"}>
                          TrungDVQ@fsoft.com.vn
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
              <Typography variant="span">
                Ba Chu Heo
                <InfoTooltip
                  title={
                    <List>
                      <ListItem sx={{ padding: "0" }}>
                        <PhoneInTalk color="primary" />
                        <Typography variant="p" p={1} fontSize={"14px"}>
                          097899084
                        </Typography>
                      </ListItem>
                      <ListItem sx={{ padding: "0" }}>
                        <MailOutline color="primary" />
                        <Typography variant="p" p={1} fontSize={"14px"}>
                          TrungDVQ@fsoft.com.vn
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
            </Stack>
          </Grid>
          {/* FSU */}
          <Grid item xs={4} paddingBottom={3}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <StarsOutlined fontSize="small" color="primary" />
              <Typography variant="p" fontWeight={600}>
                FSU
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={8} paddingBottom={3}>
            <Stack spacing={2}>
              <Typography variant="span">Dinh Vu Quoc Trung</Typography>
              <Typography variant="span">Ba Chu Heo</Typography>
            </Stack>
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={8}></Grid>

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
            <Typography variant="p">25/03/2022 by DanPL</Typography>
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
