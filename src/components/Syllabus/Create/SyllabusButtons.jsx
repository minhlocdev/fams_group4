import { Box, Button, Grid, Link } from "@mui/material";
import React, { useContext } from "react";
import { SyllabusContext } from "../../../context/SyllabusContext";

const button = {
  backgroundColor: "#2d3748",
  borderRadius: "8px",
  color: "white",
  padding: "5px 15px",
  cursor: "pointer",
  "&:hover": { backgroundColor: "rgb(72 147 222 / 81%)" },
  fontWeight: "bold",
};
export default function SyllabusButtons() {
  const { handleTabChange, activeTab, handleSave } =
    useContext(SyllabusContext);
  return (
    <Grid
      container
      // columns={16}
      sx={{
        margin: "20px 0px 20px 0px",
        display: "flex",
        justifyContent:
          activeTab === 1 || activeTab === 2 ? "space-between" : "flex-end",
      }}
    >
      {activeTab >= 1 ? (
        <Grid item xs={2} sm={4}>
          <Button sx={button} onClick={() => handleTabChange(activeTab - 1)}>
            Previous
          </Button>
        </Grid>
      ) : (
        ""
      )}
      <Grid
        item
        xs={10}
        sm={8}
        sx={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
      >
        {/* <Grid item xs={3}> */}
        <Button
          component={Link}
          to="/syllabus/detail/1"
          sx={{
            color: "red",
            textDecoration: "underline",
            fontWeight: "bold",
            padding: "5px 0px 5px 15px",
          }}
        >
          Cancel
        </Button>
        {/* </Grid> */}
        {/* <Grid item xs={6}> */}
        <Button
          //   onClick={handleDraftButton}
          sx={button}
        >
          Save draft
        </Button>
        {/* </Grid> */}
        {/* <Grid item xs={3}> */}
        {activeTab === 2 ? (
          <Button type="submit" onClick={() => handleSave()} sx={button}>
            Save
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={() => handleTabChange(activeTab + 1)}
            sx={button}
          >
            Next
          </Button>
        )}
        {/* </Grid> */}
      </Grid>
    </Grid>
  );
}
