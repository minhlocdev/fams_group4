import { Box, Modal } from "@mui/material";
import React, { useContext } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { SyllabusContext } from "../../../context/SyllabusContext";
import TrainingMaterialModalContent from "./TrainingMaterialModalContent";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "20px",
  border: " 1px solid black",
  width: { xs: "90%", lg: "35%" },
};

export default function TrainingMaterialModalCreate({
  //trainingUnit content
  dataUnitId,
  openTraining,
  handleClose,
  dayIndex,
  unitIndex,
  dataUnitIndex,
}) {
  const { outline } = useContext(SyllabusContext);
  return (
    <div>
      <Modal
        open={openTraining}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div
            style={{
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
              {`Day  ${outline[dayIndex].dayNumber}`}
              <div
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  fontSize: "large",
                }}
              >
                <HighlightOffIcon onClick={handleClose} />
              </div>
            </div>
            <TrainingMaterialModalContent
              dataUnitId={dataUnitId} // trainingContent
              dayIndex={dayIndex}
              dataUnitIndex={dataUnitIndex}
              unitIndex={unitIndex}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
