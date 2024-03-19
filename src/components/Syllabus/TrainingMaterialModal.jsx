import React, { useContext } from "react";
import ModalContainer from "../shared/ModalContainer";
import { Box, Modal } from "@mui/material";
import { CreateIcon, DeleteForeverIcon } from "../../assets/icon";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { SyllabusContext } from "../../context/SyllabusContext";
const inputStyle = {
  display: "none",
};

const buttonStyle = {
  backgroundColor: "#2d3748",
  borderRadius: "8px",
  color: "white",
  padding: "5px 15px",
  cursor: "pointer",
};
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
  const {
    modalData,
    selectedDay,
    setModalData,
    updateButtonData,
    deleteMaterialButtonData,
    syllabusID,
    unitId,
  } = useContext(SyllabusContext);
  const fileInputRef = React.useRef(null);
  const [UploadFile, setUploadFile] = React.useState(null);
  const handleButtonClick = () => {
    fileInputRef.current.click(); // Trigger the file input when the button is clicked
  };
  const handleFileChange = (event) => {
    const validFileFormats = [
      "image/*",
      "application/pdf",
      "application/vnd.ms-powerpoint",
      "video/*",
      "application/vnd.ms-excel",
    ];
    const file = event.target.files[0];
    if (file) {
      if (
        validFileFormats.some((format) =>
          file.type.includes(format.split("/")[0])
        )
      ) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const today = new Date();
          const formattedDate = `${today
            .getDate()
            .toString()
            .padStart(2, "0")}/${(today.getMonth() + 1)
            .toString()
            .padStart(2, "0")}/${today.getFullYear()}`;

          const newfile = {
            title: file.name,
            author: "someone",
            date: formattedDate,
          };
          setUploadFile(newfile);
          const updatedModalData = {
            ...modalData,
            TrainingMaterial: [...modalData.TrainingMaterial, newfile],
          };
          setModalData(updatedModalData);

          updateButtonData(selectedDay, unitId, newfile, syllabusID);
        };
        reader.readAsDataURL(file);
      } else {
        // Handle invalid file format
        alert("Invalid file format. Please select a valid file.");
      }
    }
  };

  const handleDelete = (index) => {
    const newTrainingMaterial = [...modalData.TrainingMaterial];
    newTrainingMaterial.splice(index, 1);

    const newModalData = {
      ...modalData,
      TrainingMaterial: newTrainingMaterial,
    };
    setModalData(newModalData);
  };
  console.log(modalData);
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
        <Box>{modalData.title}</Box>
        {modalData.TrainingMaterial.map((item, index) => (
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
              {item.title}
            </Box>
            <Box sx={{ display: "flex" }}>
              <Box
                sx={{
                  fontStyle: "italic",
                  fontSize: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                by {item.author} on {item.date}
              </Box>
              <Box
                sx={{
                  fontStyle: "italic",
                  fontSize: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <CreateIcon />
              </Box>
              <Box
                sx={{
                  fontStyle: "italic",
                  fontSize: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={() => (
                  handleDelete(index),
                  deleteMaterialButtonData(
                    selectedDay,
                    unitId,
                    index,
                    syllabusID
                  )
                )}
              >
                <DeleteForeverIcon />
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <input
          type="file"
          style={inputStyle}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
        <button type="button" style={buttonStyle} onClick={handleButtonClick}>
          Upload File
        </button>
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
