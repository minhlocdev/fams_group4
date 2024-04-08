import React, { useContext } from "react";
import theme from "../../../assets/theme";
import {
  Avatar,
  AvatarGroup,
  Collapse,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { SupervisedUserCircleOutlined } from "@mui/icons-material";
import { PublishStatusEnum } from "../../../constants/PublishStatusEnum";
import { useGetSyllabusOutlineQuery } from "../../../services/queries/syllabusQuery";
import SyllabusCardDay from "./SyllabusCardDay";
import ClassContext from "../../../context/ClassContext";
export default function SyllabusCardItem({ card, isEdit }) {
  const { data } = useGetSyllabusOutlineQuery(card.id);
  const { trainers } = useContext(ClassContext);
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    isEdit && setExpanded(!expanded);
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
  const countBySyllabusId = getTrainers(trainers).reduce((count, trainer) => {
    count[trainer.syllabusId] = (count[trainer.syllabusId] || 0) + 1;
    return count;
  }, {});

  return (
    <>
      <Grid
        container
        key={card.id}
        sx={{
          marginTop: "20px",
        }}
      >
        <Grid
          item
          sx={{
            maxWidth: expanded && "0px !important",
            transition: "max-width 0.5s ease",
            backgroundColor: theme.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px 0",
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: !isEdit ? "20px" : "0px",
          }}
          xs={2}
        >
          {trainers.length !== 0 ? (
            <Stack direction={"row"} spacing={1}>
              <AvatarGroup
                total={countBySyllabusId[card.id]}
                max={4}
                sx={{
                  display: expanded && "none",
                }}
              >
                {getTrainers(trainers).map(
                  (t, index) =>
                    t.syllabusId === card.id && (
                      <Avatar
                        key={index}
                        src={t.avatarUrl}
                        sx={{ width: 50, height: 50 }}
                        alt="trainer_image"
                      />
                    )
                )}
              </AvatarGroup>
            </Stack>
          ) : (
            <SupervisedUserCircleOutlined
              fontSize="large"
              color="action"
              sx={{ display: expanded && "none" }}
            />
          )}
        </Grid>
        <Grid
          item
          xs={expanded ? 12 : 10}
          sx={{ transition: "max-width 0.5s ease" }}
          onClick={() => handleExpandClick()}
        >
          <Stack
            sx={{
              backgroundColor: "#fff",
              color: theme.primary,
              boxShadow: "rgba(100, 100, 111, 0.5) 1px 1px 6px 2px",
              padding: "10px 20px",
              borderRadius: "20px",
            }}
          >
            <Stack
              direction={"row"}
              alignItems={"flex-start"}
              sx={{
                color: theme.primary,
                maxWidth: "100%",
                overflow: "hidden",
              }}
            >
              <Typography
                variant="h4"
                gutterBottom
                sx={{
                  maxWidth: "90%",
                  letterSpacing: "5px",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {card.syllabusName}
              </Typography>
              <Typography
                variant={"span"}
                sx={{
                  backgroundColor: card.publishStatus
                    ? theme.primary
                    : theme.unmodified,
                  color: "#fff",
                  borderRadius: "20px",
                  border: "1px solid #fff",
                  padding: "3px 10px",
                  marginLeft: "5px",
                }}
              >
                {PublishStatusEnum[card.publishStatus]}
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              spacing={2}
              justifyContent={"flex-start"}
              alignItems={"center"}
              sx={{ color: theme.primary }}
            >
              <Typography variant="body1" sx={{}}>
                Duration: {card.durationByDay} days ({card.durationByHour}{" "}
                hours)
              </Typography>
              <div
                style={{
                  borderRight: "1px solid #fff",
                  height: "20px",
                }}
              ></div>
              <Typography variant="body1" sx={{}}>
                Modified on {card.modifiedDate} by {card.modifiedBy}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            {data &&
              data.map((day) => (
                <SyllabusCardDay
                  key={day.dayNumber}
                  day={day}
                  syllabusId={card.id}
                />
              ))}
          </Collapse>
        </Grid>
      </Grid>
    </>
  );
}
