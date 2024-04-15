import { Box, IconButton, Typography } from "@mui/material";
import React, { useContext, useState, useRef } from "react";
import { DeleteForeverIcon } from "../../../assets/icon";
import { SyllabusContext } from "../../../context/SyllabusContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { fileDB } from "../../../utils/FireBase";
import ToastEmitter from "../../shared/lib/ToastEmitter";
import dayjs from "dayjs";
import AuthContext from "../../../utils/authUtil";

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
  onClose,
  dataUnitId,
  dayIndex,
  unitIndex,
  dataUnitIndex,
}) {
  const { outline, setOutline, setDeletingFile } = useContext(SyllabusContext);
  const { loginUser } = useContext(AuthContext);
  const fileInputRef = useRef(null);
  const [firebaseFiles, setFirebaseFiles] = useState(
    outline?.[dayIndex]?.trainingUnits?.[unitIndex]?.trainingContents?.[
      dataUnitIndex
    ]?.materials
  );
  const [remainFiles, setRemainFiles] = useState([]);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    if (event && event.target && event.target.files) {
      const files = event.target.files;
      if (files) {
        setRemainFiles(files);
      }
    }
  };
  const handleSave = async () => {
    for (const file of remainFiles) {
      await uploadFileToStorage(file);
    }
    onClose();
  };
  const uploadFileToStorage = async (file) => {
    const storageRef = ref(
      fileDB,
      `training-content-materials/${dataUnitId}/${file.name}`
    );
    await uploadBytes(storageRef, file)
      .then(() => {
        ToastEmitter.success("Upload file ok");
        getDownloadURL(storageRef).then((url) => {
          updateDataAfterUpload(file, url);
        });
      })
      .catch(() => {
        ToastEmitter.error("Error uploading file");
      });
  };

  const updateDataAfterUpload = (file, url) => {
    const newFileData = {
      createdBy: loginUser.name,
      createdOn: dayjs(),
      title: file.name,
      url: url,
    };
    const newOutline = [...outline];
    newOutline[dayIndex].trainingUnits[unitIndex].trainingContents[
      dataUnitIndex
    ].materials.push(newFileData);
    setOutline(newOutline);
    setFirebaseFiles((prev) => [...prev, newFileData]);
    setRemainFiles([]);
  };
  const handleDeleteRemaining = (index) => {
    const newFiles = [...remainFiles];
    newFiles.splice(index, 1);
    setRemainFiles(newFiles);
  };

  const handleDeleteInFirebase = async (index) => {
    const fileName = firebaseFiles[index].title;
    setDeletingFile((prev) => [...prev, firebaseFiles[index]]);
    const newFiles = [...firebaseFiles];
    newFiles.splice(index, 1);
    setFirebaseFiles(newFiles);
    const newOutline = [...outline];
    newOutline[dayIndex].trainingUnits[unitIndex].trainingContents[
      dataUnitIndex
    ].materials = newOutline[dayIndex].trainingUnits[
      unitIndex
    ].trainingContents[dataUnitIndex].materials.filter(
      (material) => material.title !== fileName
    );
    setOutline(newOutline);
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
        <Box sx={{ display: "flex", gap: "20px" }}>
          <Box
            sx={{ minWidth: "60px" }}
          >{`Unit ${outline[dayIndex].trainingUnits[unitIndex].unitCode} `}</Box>
          <Box>{outline[dayIndex].trainingUnits[unitIndex].unitName}</Box>
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
          {firebaseFiles.map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
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
                  width: { xs: "100%" },
                }}
              >
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={item.name}
                  style={{
                    maxWidth: "100%",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {item.title}
                </a>
              </Box>
              <Box
                sx={{
                  fontStyle: "italic",
                  fontSize: "10px",
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "auto",
                }}
              >
                <IconButton
                  onClick={() => handleDeleteInFirebase(index, item.url)}
                >
                  <DeleteForeverIcon />
                </IconButton>
              </Box>
            </Box>
          ))}
          {Array.from(remainFiles).map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  sm: "row",
                  md: "row",
                  lg: "row",
                },
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  width: { xs: "100%" },
                }}
              >
                <Typography
                  variant="p"
                  sx={{
                    maxWidth: "100%",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {item.name} (unsaved)
                </Typography>
              </Box>
              <Box
                sx={{
                  fontStyle: "italic",
                  fontSize: "10px",
                  display: "flex",
                  alignItems: "center",
                  marginLeft: "auto",
                }}
              >
                <IconButton onClick={() => handleDeleteRemaining(index)}>
                  <DeleteForeverIcon />
                </IconButton>
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
            columnGap: "10px",
          }}
        >
          <input
            type="file"
            style={inputStyle}
            ref={fileInputRef}
            onChange={(e) => handleFileChange(e)}
            multiple
          />
          <button type="button" style={buttonStyle} onClick={handleButtonClick}>
            Upload New
          </button>
          <button type="button" style={buttonStyle} onClick={handleSave}>
            Save
          </button>
        </Box>
      </Box>
    </>
  );
}
