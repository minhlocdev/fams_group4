import React, { useContext } from "react";
import theme from "../../../assets/theme";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { DeliveryTypeEnums } from "../../../constants/DeliveryTypeEnum";
import {
  AddCircleOutlineOutlined,
  ArrowDownwardRounded,
  SnippetFolder,
} from "@mui/icons-material";
import ClassContext from "../../../context/ClassContext";

export default function SyllabusCardUnit({ unit, syllabusId }) {
  const { trainerData, trainers, handleTrainers, handleLocations } =
    useContext(ClassContext);
  const location = trainers.find(
    (tr) => tr.unitCode === unit.unitCode
  )?.location;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Grid
        container
        sx={{
          margin: "0",
          borderRadius: "5px",
          transition: "background-color .3s linear",
          "&:active": {
            backgroundColor: "#ddd",
          },
        }}
      >
        <Grid
          item
          sx={{
            transition: "max-width 0.5s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 0",
          }}
          xs={1}
        >
          Unit
        </Grid>
        <Grid
          item
          xs={11}
          sx={{
            borderBottomRightRadius: "20px",
            alignContent: "center",
            cursor: "pointer",
            padding: "15px 0",
          }}
        >
          <Stack direction={"row"}>
            <Stack>
              {unit.unitName}
              <span style={{ color: theme.unmodified, fontStyle: "italic" }}>
                {parseFloat(unit.durationByHour / 60).toFixed(2)}hrs
              </span>
            </Stack>
            <IconButton sx={{ marginLeft: "auto", marginRight: "20px" }}>
              <ArrowDownwardRounded />
            </IconButton>
          </Stack>
        </Grid>
      </Grid>
      {/* trainingUnitContent */}
      <Grid
        container
        key={unit.unitCode}
        sx={{
          margin: "0",
          borderRadius: "5px",
          borderBottom: "1px solid #333",
        }}
      >
        {/* avatar */}
        <Grid
          item
          sx={{
            transition: "max-width 0.5s ease",
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 0",
          }}
          xs={1}
        >
          <Stack spacing={1} alignItems={"center"}>
            {trainers.length === 0 ||
            !trainers.some(
              (tr) => tr.unitCode === unit.unitCode && tr.trainerId
            ) ? (
              <IconButton onClick={handleClick}>
                <AddCircleOutlineOutlined />
              </IconButton>
            ) : (
              trainers.map(
                (tr) =>
                  tr.unitCode === unit.unitCode && (
                    <Avatar
                      key={tr.id}
                      src={tr.avatarUrl}
                      onClick={handleClick}
                      sx={{ cursor: "pointer" }}
                    />
                  )
              )
            )}

            <Divider variant="inset" flexItem />
            {/* location */}
            <Select
              value={location}
              onChange={(e) =>
                handleLocations(unit.unitCode, e.target.value, syllabusId)
              }
              size="small"
              displayEmpty
              defaultValue="Location"
              sx={{
                width: "100px",
                fontSize: "13px",
                textAlign: "center",
              }}
            >
              <MenuItem disabled value="">
                <em>Location</em>
              </MenuItem>
              <MenuItem value={"FTown 1"}>Ftown 1</MenuItem>
              <MenuItem value={"FTown 2"}>FTown 2</MenuItem>
              <MenuItem value={"FTown 3"}>FTown 3</MenuItem>
            </Select>
          </Stack>
          {/* trainer */}
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            sx={{
              maxHeight: "400px",
              borderRadius: "10px",
              "& .Mui-selected": {
                backgroundColor: theme.primary,
                color: "#fff",
                "&:hover": {
                  color: "#000",
                },
              },
            }}
          >
            {trainerData ? (
              trainerData.list.map((tr) => (
                <MenuItem
                  key={tr.id}
                  selected={trainers.some(
                    (trainer) =>
                      trainer.trainerId === tr.id &&
                      trainer.syllabusId === syllabusId
                  )}
                  onClick={() => {
                    handleTrainers(unit.unitCode, tr, syllabusId);
                    handleClose();
                  }}
                >
                  <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    <Avatar src={tr.avatarUrl} />
                    <Stack>
                      <Typography>{tr.name}</Typography>
                      <Typography>{tr.email}</Typography>
                    </Stack>
                  </Stack>
                </MenuItem>
              ))
            ) : (
              <div>...Loading</div>
            )}
          </Menu>
        </Grid>
        {/* content */}
        <Grid
          item
          xs={11}
          sx={{
            borderBottomRightRadius: "20px",
            alignContent: "center",
          }}
        >
          <List>
            {unit.trainingContents.map((content) => (
              <ListItem
                key={content.id}
                sx={{
                  justifyContent: "space-between",
                  backgroundColor: "#DFDEDE",
                  borderRadius: "10px",
                  margin: "5px 0",
                }}
              >
                {content.contentName}
                <Stack direction={"row"} spacing={2} alignItems={"center"}>
                  <Chip
                    sx={{
                      backgroundColor: "#2D3748",
                      color: "white",
                      height: "27px",
                    }}
                    label={content.learningObjectiveCode}
                  ></Chip>
                  <Typography variant="span">{content.duration}ms</Typography>
                  <Chip
                    label={content.trainingFormat}
                    sx={{ height: "27px" }}
                    color={
                      content.trainingFormat === "Online"
                        ? "warning"
                        : "default"
                    }
                    variant={
                      content.trainingFormat === "Online"
                        ? "outlined"
                        : "filled"
                    }
                  ></Chip>
                  <Box
                    sx={{
                      width: { sm: "24px" },
                      height: "32px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {DeliveryTypeEnums[content.deliveryType].icon}
                  </Box>
                  <IconButton>
                    <SnippetFolder />
                  </IconButton>
                </Stack>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </>
  );
}
