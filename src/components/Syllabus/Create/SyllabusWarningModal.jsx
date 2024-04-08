import React from "react";
import { Modal, Box, Typography, Divider, Stack, Button } from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "85%", lg: "400px" },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const buttonContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const CancerButton = {
  color: "#E74A3B",
  firstSize: "17px",
  fontWeight: "700",
  textDecoration: "underline",
};

const SaveButton = {
  color: "whitesmoke",
  backgroundColor: "#2D3748",
  padding: "0px 25px",
  borderRadius: "8px",
  fontSize: "17px",
  fontWeight: "700",
};
//isError is a prop for open the modal
//setError is a prop to set the state for the isConfirm in handleClose func
export function SyllabusWarningModal({ isError, setError }) {
  const [open, setOpen] = React.useState(isError);
  const handleClose = () => setError(false);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              fontWeight: "bold",
              fontSize: "25px",
            }}
          >
            <WarningAmberIcon color="error" /> Learning Hour
          </Typography>
          <Divider />
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, fontWeight: "bold", fontSize: "20px" }}
          >
            Learning hours a day cannot exceed 8 hours.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

//isComfirm is a prop for open the modal
//setComfirm is a prop to set the state for the isConfirm in handleClose func
//ConfirmDelete is a function. Click the Delete button to trigger it
export function SyllabusDeleteWarningModal({
  isConfirm,
  setConfirm,
  ConfirmDelete,
  id,
}) {
  const handleClose = () => setConfirm(false);
  return (
    <div>
      <Modal
        open={isConfirm === id}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              fontWeight: "bold",
              fontSize: "25px",
            }}
          >
            <WarningAmberIcon color="error" />
            Delete Day
          </Typography>
          <Divider />
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, fontWeight: "bold", fontSize: "20px" }}
          >
            Delete all content of the Day?
          </Typography>
          <Box sx={buttonContainer}>
            <Stack spacing={2} direction="row">
              <Button variant="text" sx={CancerButton} onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={SaveButton}
                onClick={ConfirmDelete}
              >
                Delete
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
