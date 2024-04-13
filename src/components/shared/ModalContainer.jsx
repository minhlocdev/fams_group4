import React, { useEffect } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "20px",
  border: " 1px solid black",
  width: { xs: "90%", sm: "65%", md: "40%", lg: "35%" },
};
const ModalContainer = ({ children, title, isOpen, handleClose }) => {
  const [open, setOpen] = React.useState(isOpen);
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "fit-content",
              alignItems: "center",
              borderRadius: "20px",
              gap: "15px",
              paddingBottom: "20px",
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                textAlign: "center",
                color: "white",
                width: "100%",
                borderRadius: "18px 18px 0px 0px",
                background: "#2D3748",
                padding: "10px 16px",
                position: "relative",
              }}
            >
              {title || "Header"}
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  fontSize: "large",
                }}
              >
                <HighlightOffIcon
                  onClick={handleClose}
                  sx={{ cursor: "pointer" }}
                />
              </div>
            </div>
            {children}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalContainer;
