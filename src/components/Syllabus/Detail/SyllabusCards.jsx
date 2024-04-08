import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
  Stack,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useGetSyllabusByIdQuery } from "../../../services/queries/syllabusQuery";
const SyllabusCard = ({ SyllabusID, onDelete, children, onClick }) => {
  const { data } = useGetSyllabusByIdQuery(SyllabusID);
  const totalDay = data?.outline.length;
  const totalHours = data?.outline.reduce(
    (total, day) =>
      total +
      day.trainingUnits.reduce(
        (dayTotal, unit) => dayTotal + unit.durationByHour,
        0
      ),
    0
  );
  const location = useLocation();
  const isActive = data ? data?.publishStatus === 1 : 0;
  return (
    <Card
      sx={{
        minWidth: "80%",
        width: "fit-content",
        minHeight: "115px",
        maxHeight: "600px",
        overflowY: "auto",
        m: 2,
        p: 2,
        borderRadius: 6,
        boxShadow: 3,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: data?.publishStatus === 1 ? "#ddd" : "",
        },
      }}
    >
      <CardContent sx={{ padding: 0 }}>
        <div onClick={onClick}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Grid item style={{ opacity: isActive ? 1 : 0.5 }}>
              <Typography
                variant="h5"
                component="div"
                display="inline"
                sx={{
                  fontFamily: "Arial",
                  fontWeight: 600,
                  fontSize: 24,
                }}
              >
                {data?.syllabusName}
              </Typography>

              {isActive ? (
                <Chip
                  label="Active"
                  color="primary"
                  variant="filled"
                  sx={{
                    ml: 1.5,
                    bgcolor: "#2D3748",
                    color: "white",
                    border: "none",
                    fontWeight: 600,
                    height: "auto",
                    minWidth: 70,
                    py: 0.5,
                    my: "auto",
                    alignSelf: "flex-start",
                    mt: -1.5,
                  }}
                />
              ) : (
                <Chip
                  label="Inactive"
                  color="primary"
                  variant="outlined"
                  sx={{
                    ml: 1.5,
                    bgcolor: "#B9B9B9",
                    color: "white",
                    border: "none",
                    fontWeight: 600,
                    height: "auto",
                    minWidth: 70,
                    py: 0.5,
                    my: "auto",
                    alignSelf: "flex-start",
                    mt: -1.5,
                  }}
                />
              )}
            </Grid>
            {(location.pathname.includes("/training/create") ||
              location.pathname.includes("/training/edit")) && (
              <Grid item>
                <Button
                  onClick={() => onDelete(data?.id)}
                  sx={{ opacity: 1 }}
                  onMouseOver={(e) =>
                    (e.currentTarget.firstChild.style.fontWeight = "bold")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.firstChild.style.fontWeight = "normal")
                  }
                >
                  <HighlightOffIcon
                    color="action"
                    sx={{ fontSize: "1.5rem" }}
                  />
                </Button>
              </Grid>
            )}
          </Grid>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontFamily: "Arial",
              fontSize: 14,
              fontWeight: 600,
              mt: 2,
            }}
          >
            {data?.version} |{data?.durationByDay || totalDay} day (
            {data?.durationByHour || totalHours} hours) | Modified on{" "}
            {data?.modifiedDate || data?.createdDate} by{" "}
            {data?.modifiedBy || data?.createdBy}
          </Typography>
        </div>
        <Stack>{children}</Stack>
      </CardContent>
    </Card>
  );
};

export default SyllabusCard;
