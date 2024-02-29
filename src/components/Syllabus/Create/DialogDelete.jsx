import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import React from "react";

const cancel = {
  width: "106px",
  height: "38px",
  borderRadius: "10px",
  color: "red",
  textDecoration: "underline",
};
const button = {
  color: "white",
  width: "106px",
  borderRadius: "10px",
  height: "38px",
  backgroundColor: "#2D3748",
  "&:hover": { backgroundColor: "rgb(72 147 222 / 81%)" },
  fontWeight: "bold",
};
export default function DialogDelete(props) {
  const { open, handleClose, handleDelete, id } = props;
  return (
    <React.Fragment>
      <Dialog
        open={open === id}
        onClose={handleClose}
        aria-labelledby="alert-delete-day"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiPaper-root": {
            width: "315px",
            height: "164px",
          },
        }}
      >
        <DialogTitle
          id="alert-delete-day"
          sx={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <WarningIcon sx={{ color: "red" }} />
          Delete Day
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Delete all content of the Day?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={cancel} onClick={handleClose}>
            Cancel
          </Button>
          <Button sx={button} onClick={handleDelete} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
