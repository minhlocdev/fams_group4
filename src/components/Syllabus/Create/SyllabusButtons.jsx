import { Box, Button, Link } from "@mui/material";
import React, { useContext } from "react";
import { SyllabusContext } from "../../../context/SyllabusContext";

export default function SyllabusButtons() {
  const { handleTabChange, activeTab, handleSave } =
    useContext(SyllabusContext);
  return (
    <Box
      sx={{
        margin: "20px 0px 20px 0px",
        display: "flex",
        justifyContent:
          activeTab === 1 || activeTab === 2 ? "space-between" : "flex-end",
        "& button": { fontWeight: "bold", borderRadius: "8px" },
      }}
    >
      {activeTab >= 1 ? (
        <Button
          sx={{
            color: "white",
            backgroundColor: "#2D3748",
            "&:hover": { backgroundColor: "rgb(72 147 222 / 81%)" },
          }}
          onClick={() => handleTabChange(activeTab - 1)}
        >
          Previous
        </Button>
      ) : (
        ""
      )}
      <Box sx={{ display: "flex", gap: "10px" }}>
        <Button
          component={Link}
          to="/syllabus/detail/1"
          sx={{
            color: "red",
            textDecoration: "underline",
            fontWeight: "bold",
          }}
        >
          Cancel
        </Button>
        <Button
          //   onClick={handleDraftButton}
          sx={{
            color: "white",
            backgroundColor: "#474747",
            "&:hover": { backgroundColor: "rgb(72 147 222 / 81%)" },
          }}
        >
          Save as draft
        </Button>
        {activeTab === 2 ? (
          <Button
            type="submit"
            onClick={() => handleSave()}
            sx={{
              color: "white",
              backgroundColor: "#2D3748",
              "&:hover": { backgroundColor: "rgb(72 147 222 / 81%)" },
            }}
          >
            Save
          </Button>
        ) : (
          <Button
            type="submit"
            onClick={() => handleTabChange(activeTab + 1)}
            sx={{
              color: "white",
              backgroundColor: "#2D3748",
              "&:hover": { backgroundColor: "rgb(72 147 222 / 81%)" },
            }}
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
}
