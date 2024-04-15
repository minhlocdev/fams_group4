import React, { useContext } from "react";
import { Box, Modal } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { SyllabusContext } from "../../../context/SyllabusContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  outlineStyle: "none",
};
//SubComponent here
const TrainingMaterialModalContent = () => {
  const { modalData } = useContext(SyllabusContext);

  return (
    <Box
      sx={{
        width: { xs: "90%", sm: "100%", md: "100%" },
        display: "flex",
        justifyContent: "flex-start",
        padding: { xs: "0px", sm: "0px 15px" },
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <Box sx={{ display: "flex", gap: "40px" }}>
        <Box>{"Unit " + modalData.unit}</Box>
        <Box>{modalData.unitTitle}</Box>
      </Box>
      <Box
        sx={{
          background: "#dfdede",
          borderRadius: "8px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {modalData?.TrainingMaterial.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Box
              sx={{
                color: "#0C4DA2",
                textDecoration: "underline",
                width: { xs: "100%", sm: "50%" },
                whiteSpace: "normal",
              }}
            >
              <a href={item?.url} target="_blank" rel="noopener noreferrer">
                {item?.title}
              </a>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  fontStyle: "italic",
                  fontSize: "12px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                by {item?.createdBy}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};
//Export Component here
export default function TrainingMaterialModal() {
  const { handleClose, openTraining, modalData } = useContext(SyllabusContext);
  return (
    <div>
      <Modal
        open={openTraining}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "80%", sm: "77%", md: "60%", lg: "50%" },
              height: "fit-content",
              alignItems: "center",
              borderRadius: "20px",
              gap: "15px",
              paddingBottom: "20px",
              backgroundColor: "white",
              transition: "0.3s ease-in-out",
            }}
          >
            <Box
              sx={{
                textAlign: "center",
                color: "white",
                width: "100%",
                borderRadius: "18px 18px 0px 0px",
                background: "#2D3748",
                padding: "10px 16px",
                position: "relative",
              }}
            >
              {"Day " + modalData.day}
              <Box
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  fontSize: "large",
                }}
              >
                <HighlightOffIcon onClick={handleClose} />
              </Box>
            </Box>
            <TrainingMaterialModalContent />
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
