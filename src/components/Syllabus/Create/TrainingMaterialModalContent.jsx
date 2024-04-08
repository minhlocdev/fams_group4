import { Box, IconButton } from "@mui/material";
import React, { useContext, useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { DeleteForeverIcon } from "../../../assets/icon";
import { SyllabusContext } from "../../../context/SyllabusContext";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
  getMetadata,
} from "firebase/storage";
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
  dataUnitId,
  dayIndex,
  unitIndex,
  dataUnitIndex,
}) {
  const { outline, setOutline } = useContext(SyllabusContext);
  const { loginUser } = useContext(AuthContext);
  const fileInputRef = useRef(null);
  const [firebaseFiles, setFirebaseFiles] = useState([]);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    if (event && event.target && event.target.files) {
      const files = event.target.files;
      if (files) {
        for (const file of files) {
          await uploadFileToStorage(file);
        }
      }
    }
  };

  const uploadFileToStorage = async (file) => {
    const storageRef = ref(
      fileDB,
      `training-content-materials/${dataUnitId}/${file.name}`
    );
    setFirebaseFiles((prevFirebaseFiles) => [...prevFirebaseFiles, storageRef]);
    await uploadBytes(storageRef, file)
      .then(() => {
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
  };

  const handleDeleteInFirebase = async (index) => {
    const fileName = firebaseFiles[index].name;
    const storageRef = ref(
      fileDB,
      `training-content-materials/${dataUnitId}/${fileName}`
    );
    try {
      await deleteObject(storageRef);
      setFirebaseFiles((prevFiles) =>
        prevFiles.filter((file, idx) => idx !== index)
      );
      toast.success(`Deleted ${fileName} successfully`);
    } catch (error) {
      console.error(`Error deleting ${fileName}:`, error);
      toast.error(`Error deleting ${fileName}`);
    }
  };

  useEffect(() => {
    const storageRef = ref(fileDB, `training-content-materials/${dataUnitId}`);
    listAll(storageRef).then((res) => {
      res.items.forEach(async (item) => {
        const url = await getDownloadURL(item);
        const metadata = await getMetadata(item);
        const uploadDate = metadata.timeCreated
          ? new Date(metadata.timeCreated).toLocaleDateString()
          : "Unknown";

        setFirebaseFiles((prevFiles) => [
          ...prevFiles,
          { name: item.name, url, uploadDate },
        ]);
      });
    });
  }, [dataUnitId]);

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
                  {item.name}
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
                <IconButton onClick={() => handleDeleteInFirebase(index)}>
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
        </Box>
      </Box>
    </>
  );
}
