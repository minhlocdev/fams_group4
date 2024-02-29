import { Box, IconButton, Modal } from "@mui/material";
import React, { useState } from "react";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { CreateIcon, DeleteForeverIcon } from "../../../assets/icon";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "20px",
  border: " 1px solid black",
};
const buttonStyle = {
  backgroundColor: "#2d3748",
  borderRadius: "8px",
  color: "white",
  padding: "5px 15px",
  cursor: "pointer",
};
const inputStyle = {
  display: "none",
};
export function TrainingMaterialModalContent({
  unitData,
  handleOnChange,
  dataTraining,
  dataUnitIndex,
  unit,
  handleDelete,
}) {
  const [formData, setFormData] = useState({
    title: "",
    author: "Warrior Tran",
    data: "",
  });
  const fileInputRef = React.useRef(null);
  const [UploadFile, setUploadFile] = React.useState(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    if (event && event.target && event.target.files && event.target.files[0]) {
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
            const updatedFormData = {
              ...formData,
              title: newfile.title,
              data: newfile.date,
            };
            handleOnChange(updatedFormData);
          };
          reader.readAsDataURL(file);
        } else {
          // Handle invalid file format
          alert("Invalid file format. Please select a valid file.");
        }
      }
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", paddingLeft: "16px", gap: "10%" }}>
        <Box>{`Unit ${unit.id + 1} `}</Box>
        <Box>{unit.title}</Box>
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
        <Box>{unitData[dataUnitIndex].Name}</Box>
        {Array.isArray(dataTraining) &&
          dataTraining.length !== 0 &&
          dataTraining.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{
                  color: "#0C4DA2",
                  textDecoration: "underline",
                  width: "50%",
                  whiteSpace: "normal",
                }}
              >
                {item.title}
              </Box>
              <Box sx={{ display: "flex", gap: "2px" }}>
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
                >
                  <IconButton onClick={() => handleDelete(index)}>
                    <DeleteForeverIcon />
                  </IconButton>
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
          onChange={(e) => handleFileChange(e)}
        />
        {/* ))} */}
        <button type="button" style={buttonStyle} onClick={handleButtonClick}>
          Upload New
        </button>
      </Box>
    </>
  );
}
export default function TrainingMaterialModalCreate({
  modalData,
  unitData,
  unit,
  openTraining,
  handleClose,
  dataTraining,
  updateTraining,
  dataUnitIndex,
}) {
  const handleButtonData = (newTraining) => {
    updateTraining([...dataTraining, newTraining]);
  };
  const handleDelete = (index) => {
    const updatedDataTraining = [...dataTraining];
    updatedDataTraining.splice(index, 1);
    updateTraining(updatedDataTraining);
  };
  // console.log(unitData);

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
              width: "33.875rem",
              height: "fit-content",
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
              {`Day  ${modalData.id + 1}`}
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
              unit={unit}
              unitData={unitData}
              handleOnChange={handleButtonData}
              dataTraining={dataTraining}
              dataUnitIndex={dataUnitIndex}
              handleDelete={handleDelete}
              // setTraining={setTraining}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
