import { Box, IconButton } from "@mui/material";
import React, { useContext, useState } from "react";
import { CreateIcon, DeleteForeverIcon } from "../../../assets/icon";
import { SyllabusContext } from "../../../context/SyllabusContext";

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
export default function TrainingMaterialModalContent({
  handleOnChange,
  dayIndex,
  unitIndex,
  dataUnitIndex,
}) {
  const { outline, setOutline } = useContext(SyllabusContext);
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
  const handleDelete = (dataUnitIndex) => {
    const newArray = [...outline];
    setOutline(() => {
      const newContent = newArray[dayIndex].content;
      const newDataUnit = newContent[unitIndex].dataUnit;
      newDataUnit.splice(dataUnitIndex, 1);
      return newDataUnit;
    });
  };

  const dataTraining =
    outline[dayIndex].content[unitIndex].dataUnit[dataUnitIndex]
      .TrainingMaterial;
  const titleUnit =
    outline[dayIndex].content[unitIndex].dataUnit[dataUnitIndex].Name;

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
          <Box>{`Unit ${outline[dayIndex].content[unitIndex].id + 1} `}</Box>
          <Box>{outline[dayIndex].content[unitIndex].title}</Box>
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
          <Box>{titleUnit}</Box>
          {Array.isArray(dataTraining) &&
            dataTraining.length !== 0 &&
            dataTraining.map((item, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: {
                    xs: "column",
                    sm: "row",
                    md: "row",
                    lg: "row",
                  },
                }}
              >
                <Box
                  sx={{
                    color: "#0C4DA2",
                    textDecoration: "underline",
                    width: { xs: "100%", sm: "50%" },
                    whiteSpace: "normal",
                    wordWrap: "break-word",
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
      </Box>
    </>
  );
}
