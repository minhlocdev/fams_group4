import React, { useState, useEffect } from "react";
import ModalContainer from "../../shared/ModalContainer";
import {
  Box,
  Modal,
  TextField,
  FormGroup,
  FormControlLabel,
  Stack,
  Button,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DropDown from "./SyllabusModalDropDown";
import Switch from "./SyllabusModalSwitch";
import { SyllabusWarningModal } from "./SyllabusWarningModal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "20px",
  border: " 1px solid black",
};
const textBox = {
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  "& .MuiFormControlLabel-label": {
    fontSize: "16px",
    fontWeight: "500",
    color: "rgb(0, 0, 0)",
  },
};
const textFields = {
  display: "flex",
  width: "315px",
  flexDirection: "row-reseve",
  "& .MuiInputBase-input": {
    padding: "10px",
  },
  "& .MuiInputBase-input::placeholder": {
    fontStyle: "italic",
    fontWeight: "bolder",
    color: "rgb(0, 0, 0)",
  },
};

const textCanlender = {
  width: "315px",
  "& .MuiInputBase-input": {
    padding: "10px 10px 10px 10px",
  },
  "& .MuiInputBase-input::placeholder": {
    fontStyle: "italic",
    fontWeight: "bolder",
    color: "rgb(0, 0, 0)",
  },
  "& .MuiInputBase-root": {
    flexDirection: "row-reverse",
  },
  "& .customDatePickerDay": {
    backgroundColor: "#E74A3B",
    borderRadius: "8px",
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
    DeliveryType: "",
    Name: "",
    OutputStandard: "",
    TrainingTime: "",
    Method: "Online",
    TrainingMaterial: [],
  });

  const [errors, setErrors] = useState({
    DeliveryType: "",
    Name: "",
    OutputStandard: "",
    TrainingTime: "",
  });
  const OpenWarningModal = () => {
    setError(true);
  };
  //Validate Data function here
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    //Validate Delivery Type
    if (!formData.DeliveryType) {
      newErrors.DeliveryType = "This field is required";
      valid = false;
    }

    //Validate Name
    if (formData.Name.trim() === "") {
      newErrors.Name = "This field is required";
      valid = false;
    } else if (!isNaN(formData.Name)) {
      newErrors.Name = "This field cannot be all number";
      valid = false;
    }
    //Valid OutputStandard
    if (formData.OutputStandard.trim() === "") {
      newErrors.OutputStandard = "This field is required";
      valid = false;
    } else if (!isNaN(formData.OutputStandard)) {
      newErrors.OutputStandard = "This field cannot be all number";
      valid = false;
    }
    //Validate Trainning Time
    if (formData.TrainingTime.trim() === "") {
      newErrors.TrainingTime = "This field is required";
      valid = false;
    } else if (formData.TrainingTime >= 480) {
      OpenWarningModal();
      valid = false;
    } else if (isNaN(formData.TrainingTime)) {
      newErrors.TrainingTime = "This field must be a number";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };
  const handleChange = (field, value) => {
    const updateData = field === "OutputStandard" ? value.split(" ") : value;
    setFormData({ ...formData, [field]: String(updateData) });
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
      const DeliveryType = formData.DeliveryType;
      const tempArray = formData.OutputStandard.split(",");
      // let IconType;
      // switch (DeliveryType) {
      //   case "Assignment/Lab":
      //     IconType = <AssignmentIcon />;
      //     break;
      //   case "Concept/Lecture":
      //     IconType = <RecordVoiceOverIcon />;
      //     break;
      //   case "Guide/Review":
      //     IconType = <PanToolOutlined />;
      //     break;
      //   case "Test/Quiz":
      //     IconType = <FactCheckOutlinedIcon />;
      //     break;
      //   case "Exam":
      //     IconType = <SpellcheckOutlinedIcon />;
      //     break;
      //   case "Seminar/Workshop":
      //     IconType = <SettingsInputAntennaOutlinedIcon />;
      //     break;
      // }
      const tempOjb = {
        ...formData,
        DeliveryType: DeliveryType,
        OutputStandard: tempArray,
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
          padding: "20px 48px 0px 15px",
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
              value={formData.Name}
              onChange={(e) => handleChange("Name", e.target.value)}
              error={Boolean(errors.Name)}
              helperText={errors.Name}
            />
          }
          label="Name"
          labelPlacement="start"
        />
        <FormControlLabel
          sx={textBox}
          control={
            <TextField
              placeholder="Output Standard"
              sx={textFields}
              id="outlined-basic"
              variant="outlined"
              value={formData.OutputStandard}
              onChange={(e) => handleChange("OutputStandard", e.target.value)}
              error={Boolean(errors.OutputStandard)}
              helperText={errors.OutputStandard}
            />
          }
          label="Output standard"
          labelPlacement="start"
        />
        <FormControlLabel
          sx={textBox}
          control={
            <TextField
              placeholder="Minutes"
              sx={textFields}
              id="outlined-basic"
              variant="outlined"
              value={formData.TrainingTime}
              onChange={(e) => handleChange("TrainingTime", e.target.value)}
              error={Boolean(errors.TrainingTime)}
              helperText={errors.TrainingTime}
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
            width: "33.875rem",
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
