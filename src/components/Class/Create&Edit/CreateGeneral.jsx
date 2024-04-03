import React, { useCallback, useContext } from "react";

import "react-day-picker/dist/style.css";
import theme from "../../../assets/theme";
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
  WarningAmber,
} from "@mui/icons-material";
import { InfoTooltip, ExpandMore } from "../../shared/lib/CustomMUI";
import { TimeToTime } from "./TimePicker";
import ClassContext from "../../../context/ClassContext";
import GeneralSkeleton from "../ClassSkeleton/GeneralSkeleton";

export default function CreateGeneral() {
  const locate = useLocation();
  const mode = locate.pathname.includes("edit");
  const [expanded, setExpanded] = React.useState(true);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const {
    classData,
    classAdmin,
    fsuContact,
    admin,
    fsu,
    contact,
    classTime,
    location,
    trainers,
    setLocation,
    setClassTime,
    handleContact,
    handleAdmin,
    handleFsu,
    fieldValidation,
  } = useContext(ClassContext);
  const { ClassTime, Admin, FSU, Contact, Location } = fieldValidation;
  const getCampus = useCallback((array) => {
    const campus = array.map((a) => a.location);
    const uniqueCampus = [...new Set(campus)];
    return uniqueCampus;
  }, []);
  const getTrainers = useCallback((array) => {
    const unique = array.reduce((accumulator, current) => {
      if (!accumulator.some((x) => x.trainerId === current.trainerId)) {
        accumulator.push(current);
      }
      return accumulator;
    }, []);
    return unique;
  }, []);
  if (!classData && mode) {
    return <GeneralSkeleton />;
  }
  return (
    <>
      <Stack
        direction={"row"}
        width={"100%"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{
          backgroundColor: !expanded ? theme.unmodified : theme.primary,
          color: "#fff",
          px: "15px",
          borderRadius: "10px",
          marginBottom: "5px",
          transition: "background-color .3s linear",
        }}
        onClick={() => handleExpandClick()}
      >
        <Stack direction={"row"} spacing={2} alignItems={"center"}>
          <CalendarToday fontSize="small" />
          <Typography variant="p" fontWeight={600}>
            General
          </Typography>
          {(Admin || ClassTime || FSU || Contact || Location) && (
            <InfoTooltip
              title={<Typography variant="span">{"Invalid Fields"}</Typography>}
            >
              <WarningAmber color="error" />
            </InfoTooltip>
          )}
        </Stack>

        <ExpandMore
          expand={expanded}
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
            <TimeToTime classTime={classTime} setTimeRange={setClassTime} />
          </Grid>
          {/* location */}
          <Grid item xs={4} paddingTop={1}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <HomeWorkOutlined fontSize="small" color="primary" />
              <Typography variant="p" fontWeight={600}>
                Location
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={8} paddingBottom={2}>
            <FormControl sx={{ width: "100%" }} size="small">
              <InputLabel id="location">Location</InputLabel>
              <Select
                labelId="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              >
                <MenuItem value={"Ho Chi Minh"}>Ho Chi Minh</MenuItem>
                <MenuItem value={"Ha Noi"}>Ha Noi</MenuItem>
                <MenuItem value={"Quy Nhon"}>Quy Nhon</MenuItem>
                <MenuItem value={"Da Nang"}>Da Nang</MenuItem>
                <MenuItem value={"Can Tho"}>Can Tho</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {getCampus(trainers).map((tr, index) => (
            <React.Fragment key={index}>
              <Grid item xs={4} paddingTop={1}></Grid>
              <Grid item xs={8} paddingBottom={1}>
                <Typography variant="span">{tr}</Typography>
              </Grid>
            </React.Fragment>
          ))}
          {/* trainer */}
          <Grid item xs={4} paddingBottom={1} sx={{ color: theme.unmodified }}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <RecordVoiceOverOutlined fontSize="small" />
              <Typography variant="p" fontWeight={600}>
                Trainer
              </Typography>
            </Stack>
          </Grid>
          {getTrainers(trainers).map((tr, index) => (
            <React.Fragment key={index}>
              {index !== 0 ? (
                <>
                  <Grid item xs={4} paddingTop={1}></Grid>
                  <Grid item xs={8} paddingBottom={1}>
                    <Typography variant="span">{tr.name}</Typography>
                  </Grid>
                </>
              ) : (
                <Grid item xs={8} paddingBottom={1}>
                  <Typography variant="span">{tr.name}</Typography>
                </Grid>
              )}
            </React.Fragment>
          ))}

          {getTrainers(trainers).length === 0 && (
            <Grid item xs={8} paddingBottom={3}></Grid>
          )}
          {/* admin */}
          <Grid item xs={4} paddingBottom={3} paddingTop={2}>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <StarBorderOutlined fontSize="small" color="primary" />
              <Typography variant="p" fontWeight={600}>
                Admin
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={8} paddingBottom={2} paddingTop={2}>
            {!classAdmin ? (
              <Skeleton variant="rectangle" width={300} height={30} />
            ) : (
              <Stack spacing={1}>
                {admin.map((a) => (
                  <Typography
                    variant="span"
                    key={a.id}
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
                    {classAdmin.map((a) => (
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
          </Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={8} paddingBottom={3}>
            {!fsuContact ? (
              <Skeleton variant="rectangle" width={300} height={30} />
            ) : (
              <FormControl sx={{ width: "100%" }} size="small">
                <InputLabel id="contact">Contact</InputLabel>
                <Select
                  labelId="contact"
                  value={contact}
                  onChange={(e) => handleContact(e.target.value)}
                  MenuProps={{ sx: { maxHeight: "300px" } }}
                >
                  {fsuContact.list.map((contact) => (
                    <MenuItem value={contact.email} key={contact.id}>
                      {contact.email}
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
          <Grid item xs={8} paddingBottom={3} sx={{ color: theme.unmodified }}>
            {mode && `${classData?.createdBy} on ${classData?.createdDate}`}
          </Grid>
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
          <Grid item xs={8} paddingBottom={3}>
            {mode && `${classData?.modifiedBy} on ${classData?.modifiedDate}`}
          </Grid>
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
          <Grid item xs={8} paddingBottom={3}>
            {mode && `${classData?.modifiedBy} on ${classData?.modifiedDate}`}
          </Grid>
        </Grid>
      </Collapse>
    </>
  );
}
