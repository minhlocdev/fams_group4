import React, { useState } from "react";
import {
  Box,
  Modal,
  TextField,
  FormGroup,
  FormControlLabel,
  Stack,
  Button,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DropDown from "./SyllabusModalDropDown";
import Switch from "./SyllabusModalSwitch";
import { SyllabusWarningModal } from "./SyllabusWarningModal";
import LearningObjectiveDropDown from "./LearningObjectiveDropDown";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "20px",
  border: " 1px solid black",
  width: { xs: "90%", sm: "70%", lg: "35%" },
};
const textBox = {
  width: "100%",
  display: "flex",
  alignItems: { xs: "flex-start", lg: "" },
  justifyContent: { lg: "space-between" },
  flexDirection: { xs: "column-reverse", lg: "row-reverse" },
  "& .MuiFormControlLabel-label": {
    fontSize: "16px",
    fontWeight: "500",
    color: "rgb(0, 0, 0)",
  },
};
const textFields = {
  display: "flex",
  width: { xs: "90%", lg: "315px" },
  // flexDirection: "row-reverse",
  "& .MuiInputBase-input": {
    padding: "10px",
  },
  "& .MuiInputBase-input::placeholder": {
    fontStyle: "italic",
    fontWeight: "bolder",
    color: "rgb(0, 0, 0)",
  },
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
//SubComponet for the Export Component
//handleCloseModal là func dùng để đóng modal
//AddData là func dùng để lấy unit content từ form
const SyllabusNewContentModal = ({ handleCloseModal, AddData }) => {
  const [isactive, setActive] = useState(false);
  const [isError, setError] = useState(false); //Open Warning modal when Hour exceed 8 hours
  const [formData, setFormData] = useState({
    id: "",
    deliveryType: "",
    contentName: "",
    learningObjectiveCode: "",
    duration: "",
    trainingFormat: "Online",
    note: null,
    materials: [],
  });
  const [errors, setErrors] = useState({
    deliveryType: "",
    contentName: "",
    learningObjectiveCode: "",
    duration: "",
  });
  const OpenWarningModal = () => {
    setError(true);
  };
  function handleIconDelivery(deliveryData) {
    let IconType;
    switch (deliveryData) {
      case "Assignment/Lab":
        IconType = 1;
        break;
      case "Concept/Lecture":
        IconType = 2;
        break;
      case "Guide/Review":
        IconType = 3;
        break;
      case "Test/Quiz":
        IconType = 4;
        break;
      case "Exam":
        IconType = 5;
        break;
      case "Seminar/Workshop":
        IconType = 6;
        break;
      default:
        break;
    }
    return IconType;
  }

  //Validate Data function here
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    //Validate Delivery Type
    if (!formData.deliveryType) {
      newErrors.deliveryType = "This field is required";
      valid = false;
    }

    //Validate Name
    if (formData.contentName.trim() === "") {
      newErrors.contentName = "This field is required";
      valid = false;
    } else if (!isNaN(formData.contentName)) {
      newErrors.contentName = "This field cannot be all number";
      valid = false;
    }
    //Valid OutputStandard
    if (formData.learningObjectiveCode.trim() === "") {
      newErrors.learningObjectiveCode = "This field is required";
      valid = false;
    }
    //Validate Trainning Time
    if (formData.duration === null) {
      newErrors.duration = "This field is required";
      valid = false;
    } else if (formData.duration >= 480) {
      OpenWarningModal();
      valid = false;
    } else if (isNaN(formData.duration)) {
      newErrors.duration = "This field must be a number";
      valid = false;
    } else if (formData.duration < 0) {
      newErrors.duration = "Invalid time";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
  const handleChange = (field, value) => {
    const updateData = field === "duration" ? Number(value) : value;
    setFormData({ ...formData, [field]: updateData });
    setErrors({ ...errors, [field]: "" });
  };
  //Handle data after Click the Create Button
  const handleSubmit = (e) => {
    //=================================================Prevent Submit code==================================
    if (!validateForm()) {
      e.preventDefault();
      console.log("non");
    } else {
      //=================================================Put Submit logic here==================================
      e.preventDefault();
      const DeliveryType = formData.deliveryType;
      const v4Id = uuidv4();
      const tempOjb = {
        ...formData,
        id: v4Id,
        deliveryType: handleIconDelivery(DeliveryType),
        learningObjectiveCode: formData.learningObjectiveCode,
      };
      AddData(tempOjb);

      handleCloseModal();
    }
  };
  return (
    <div style={{ width: "100%" }}>
      {isError && (
        <SyllabusWarningModal isError={isError} setError={setError} />
      )}
      <FormGroup
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          padding: { xs: "20px", lg: "20px 48px 0px 15px" },
        }}
      >
        <FormControlLabel
          sx={textBox}
          control={
            <TextField
              placeholder="Name of content..."
              sx={textFields}
              id="outlined-basic"
              variant="outlined"
              value={formData.contentName}
              onChange={(e) => handleChange("contentName", e.target.value)}
              error={Boolean(errors.contentName)}
              helperText={errors.contentName}
            />
          }
          label="Name"
          labelPlacement="start"
        />
        <LearningObjectiveDropDown
          handleChange={handleChange}
          formData={formData}
          errors={errors}
        />
        <FormControlLabel
          sx={textBox}
          control={
            <TextField
              placeholder="Minutes"
              sx={textFields}
              id="outlined-basic"
              variant="outlined"
              value={formData.duration}
              onChange={(e) => handleChange("duration", e.target.value)}
              error={Boolean(errors.duration)}
              helperText={errors.duration}
            />
          }
          label="Training Time"
          labelPlacement="start"
        />

        <DropDown
          handleChange={handleChange}
          formData={formData}
          errors={errors}
        />
        <FormControlLabel
          sx={textBox}
          control={
            <Switch
              isactive={isactive}
              setActive={setActive}
              handleChange={handleChange}
              formData={formData}
            />
          }
          label="Method"
          labelPlacement="start"
        />
        <Box sx={buttonContainer}>
          <Stack spacing={2} direction="row">
            <Button variant="text" sx={CancerButton} onClick={handleCloseModal}>
              Cancel
            </Button>
            <Button variant="contained" sx={SaveButton} onClick={handleSubmit}>
              Create
            </Button>
          </Stack>
        </Box>
      </FormGroup>
    </div>
  );
};
//Export Component
//handleCloseModal là func dùng để đóng modal
//openModal là state để mở modal
//AddData là func dùng để lấy unit content từ form
export default function SyllabusNewContent({
  handleCloseModal,
  openModal,
  AddData,
  unitIndex,
}) {
  return (
    <Modal
      open={openModal}
      onClose={handleCloseModal}
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
            {"New Content"}
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                fontSize: "large",
              }}
            >
              <HighlightOffIcon onClick={handleCloseModal} />
            </div>
          </div>
          {/* Body of the form */}
          <SyllabusNewContentModal
            handleCloseModal={handleCloseModal}
            AddData={AddData}
          />
        </div>
      </Box>
    </Modal>
  );
}
