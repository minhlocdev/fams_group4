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
import { PublishStatus } from "../../../constants/PublishStatusEnum";
import { useGetSyllabusOutlineQuery } from "../../../services/queries/syllabusQuery";
import SyllabusCardDay from "./SyllabusCardDay";
import ClassContext from "../../../context/ClassContext";
export default function SyllabusCardItem({ card, isEdit }) {
  const { data } = useGetSyllabusOutlineQuery(card.id);
  const { trainers, activeStep } = useContext(ClassContext);
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    activeStep !== 1 && setExpanded(!expanded);
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
          flexDirection: { xs: "column", lg: "row" },
          marginTop: "20px",
        }}
      >
        <Grid
          item
          sx={{
            transition: "max-width 0.5s ease",
            backgroundColor: theme.primary,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "20px",
            borderBottomRightRadius: { xs: "20px", lg: "0" },
            borderTopRightRadius: { xs: "20px", lg: "0" },
            padding: "10px 0",
          }}
          xs={12}
          lg={!expanded ? 2 : "auto"}
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
          xs={12}
          lg={expanded ? 12 : 10}
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
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "center", md: "flex-start" },
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
                  whiteSpace: { xs: "wrap", md: "nowrap" },
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                  fontSize: { xs: "25px", md: "34px" },
                  textAlign: { xs: "center", md: "left" },
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
                {PublishStatus[card.publishStatus]}
              </Typography>
            </Stack>
            <Stack
              direction={"row"}
              columnGap={2}
              justifyContent={"flex-start"}
              alignItems={"center"}
              sx={{
                color: theme.primary,
                flexDirection: { xs: "column", md: "row" },
                alignItems: { xs: "flex-start", md: "center" },
              }}
            >
              <Typography variant="body1" sx={{}}>
                Duration: {card.durationByDay} days ({card.durationByHour}{" "}
                hours)
              </Typography>
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
                  isEdit={isEdit}
                />
              ))}
          </Collapse>
        </Grid>
      </Grid>
    </>
  );
}
