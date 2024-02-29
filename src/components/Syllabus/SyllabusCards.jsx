import React from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import dayjs from "dayjs";

import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Chip,
} from "@mui/material";
const SyllabusCard = ({ data, onDelete }) => {
  const isActive = data ? data.status === "Active" : "Undefined";
  return (
    <Card
      sx={{
        minWidth: 275,
        m: 2,
        p: 2,
        borderRadius: 6,
        boxShadow: 3,
        width: "65%",
        height: 115,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: data.status === "Active" ? "#ddd" : "",
        },
      }}
    >
      <CardContent sx={{ padding: 0 }}>
        <Grid container justifyContent="space-between" alignItems="flex-start">
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
              {data?.name}
            </Typography>

            {isActive ? (
              <Chip
                label={data?.status}
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
                label={data?.status}
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
              {data?.version} | {data?.duration} | Modified on{" "}
              {dayjs(data.modifiedDate).format("DD/MM/YYYY")}  by {data?.modifiedBy}
            </Typography>
          </Grid>

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
              <HighlightOffIcon color="action" sx={{ fontSize: "1.5rem" }} />
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SyllabusCard;
