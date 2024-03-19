import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { Divider, Stack } from "@mui/material";
import { Warning } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
const buttonContainer = {
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
};

const CancerButton = {
  color: "#E74A3B",
  firstSize: "14px",
  fontWeight: "700",
  textDecoration: "underline",
};

const SaveButton = {
  color: "whitesmoke",
  backgroundColor: "#2D3748",
  padding: "0px 25px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: "700",
};
export default function AcceptUpdate({ onSave, onCancel }) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    onCancel(); // Notify the parent about cancel action
    setOpen(false);
  };

  const handleSave = () => {
    onSave(); // Notify the parent about save action
    setOpen(false);
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <Warning sx={{ float: "left", mr: 1 }} />
          <h4 id="parent-modal-title" style={{ margin: "0" }}>
            Update permission?
          </h4>
          <Divider />
          <p id="parent-modal-description">
            Are you sure your want to update the users's permission?
          </p>
          <Box sx={buttonContainer}>
            <Stack spacing={2} direction="row">
              <Button variant="text" sx={CancerButton} onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" sx={SaveButton} onClick={handleSave}>
                Save
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
