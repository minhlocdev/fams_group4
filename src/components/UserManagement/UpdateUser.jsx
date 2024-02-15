import React, { useState, useContext } from "react";
import ModalContainer from "../shared/ModalContainer";
import {
  TextField,
  FormGroup,
  FormControlLabel,
  FormControl,
  Radio,
  RadioGroup,
  Box,
  Stack,
  Button,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import DropDown from "./DropDown/DropDown";
import Switch from "./Switch/Switch";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import { ModalProvider } from "../shared/ModalContainer";
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
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    position: "relative",
    border: "none",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
  },
}));
const UpdateContent = ({ index, userList }) => {
  //False = Active, Truth = Unactive
  const [isactive, setActive] = useState(false);
  //Show chosen data for each data field
  const [formData, setFormData] = useState({
    userType: userList ? userList[index].userType : "Admin",
    userName: userList ? userList[index].userName : "ExampleName",
    emailAddress: userList
      ? userList[index].emailAddress
      : "ExampleEmail@gmail.com",
    phoneNumber: userList ? userList[index].phoneNumber : "ExamplePhoneNumber",
    dateOfBirth: userList ? userList[index].dateOfBirth : null,
    gender: userList ? userList[index].gender : "Male",
    status: userList
      ? userList[index].status === "Active"
        ? false
        : true
      : false,
  });

  const [errors, setErrors] = useState({
    userType: "",
    userName: "",
    emailAddress: "",
    phoneNumber: "",
    dateOfBirth: "",
  });
  const validateForm = () => {
    let valid = true;
    const pickedDate = new Date();
    const newErrors = { ...errors };

    //Validate User Type
    if (!formData.userType) {
      newErrors.userType = "User type is required";
      valid = false;
    }

    //Validate Username
    if (formData.userName.trim() === "") {
      newErrors.userName = "User name is required";
      valid = false;
    }
    //Validate Email
    if (formData.emailAddress.trim() === "") {
      newErrors.emailAddress = "Email address is required";
      valid = false;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@(gmail\.com|fpt\.edu\.vn)$/.test(
        formData.emailAddress
      )
    ) {
      newErrors.emailAddress = "Email address is invalid";
      valid = false;
    }
    //Validate Phonenumber
    if (formData.phoneNumber.trim() === "") {
      newErrors.phoneNumber = "Phone number is required";
      valid = false;
    } else if (!/^0\d{9,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number is invalid";
      valid = false;
    }
    //Validate DateofBirth
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
      valid = false;
    } else if (formData.dateOfBirth > pickedDate) {
      newErrors.dateOfBirth = "Date of birth is invalid";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    if (!validateForm()) {
      e.preventDefault();
    } else {
      //=================================================Put Submit logic here==================================
    }
  };
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };
  const handleClose = useContext(ModalProvider);
  return (
    <div style={{ width: "100%" }}>
      <FormGroup
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          padding: "20px 48px 0px 15px",
        }}
      >
        <DropDown
          handleChange={handleChange}
          formData={formData}
          errors={errors}
          defaultValue={formData.userType}
        />
        <FormControlLabel
          sx={textBox}
          control={
            <TextField
              placeholder="User name"
              sx={textFields}
              id="outlined-basic"
              variant="outlined"
              value={formData.userName}
              onChange={(e) => handleChange("userName", e.target.value)}
              error={Boolean(errors.userName)}
              helperText={errors.userName}
            />
          }
          label="Name"
          labelPlacement="start"
        />
        <FormControlLabel
          sx={textBox}
          control={
            <BootstrapInput
              placeholder="Email address"
              sx={{
                ...textFields,
                "& .MuiInputBase-input": {
                  border: "none",
                  borderRadius: "4",
                  padding: "10px 10px 10px 10px",
                  outline: "none",
                },
              }}
              id="outlined-basic"
              variant="outlined"
              value={formData.emailAddress}
              onChange={(e) => handleChange("emailAddress", e.target.value)}
              error={Boolean(errors.emailAddress)}
              helperText={errors.emailAddress}
              InputProps={{
                readOnly: true,
              }}
            />
          }
          label="Email address"
          labelPlacement="start"
        />
        <FormControlLabel
          sx={textBox}
          control={
            <TextField
              placeholder="Phone number"
              sx={textFields}
              id="outlined-basic"
              variant="outlined"
              value={formData.phoneNumber}
              onChange={(e) => handleChange("phoneNumber", e.target.value)}
              error={Boolean(errors.phoneNumber)}
              helperText={errors.phoneNumber}
            />
          }
          label="Phone"
          labelPlacement="start"
        />
        <FormControlLabel
          sx={textBox}
          control={
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              sx={{ "& .MuiPickersDay-root": { borderRadius: "50%" } }}
            >
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  slotProps={{
                    textField: {
                      placeholder: "Select Date",
                      error: Boolean(errors.dateOfBirth),
                      helperText: errors.dateOfBirth,
                    },
                    layout: {
                      sx: {
                        "& .MuiPickersDay-today": {
                          backgroundColor: "#2D3748",
                          color: "#fff",
                        },
                        "& .MuiPickersDay-root": {
                          borderRadius: "8px",
                        },
                        "& .MuiPickersCalendarHeader-switchViewIcon": {
                          visibility: "hidden",
                        },
                        "& .MuiPickersCalendar-root": {
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        },
                        "& .MuiPickersCalendarHeader-labelContainer": {
                          position: "absolute",
                          transform: "translatex(78px)",
                        },
                        "& .MuiPickersArrowSwitcher-root": {
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        },
                      },
                    },
                  }}
                  sx={textCanlender}
                  value={formData.dateOfBirth}
                  onChange={(date) => handleChange("dateOfBirth", date)}
                  showDaysOutsideCurrentMonth
                  className="customDatePickerDay"
                />
              </DemoContainer>
            </LocalizationProvider>
          }
          label="Date of birth"
          labelPlacement="start"
        />
        <FormControlLabel
          sx={textBox}
          control={
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                value={formData.gender}
                name="radio-buttons-group"
                onChange={(gender) =>
                  handleChange("gender", gender.target.value)
                }
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "315px",
                  justifyContent: "flex-start",
                }}
              >
                <FormControlLabel
                  value="Male"
                  control={<Radio color="default" />}
                  label="Male"
                />
                <FormControlLabel
                  value="Female"
                  control={<Radio color="default" />}
                  label="Female"
                />
              </RadioGroup>
            </FormControl>
          }
          label="Gender"
          labelPlacement="start"
        />
        <FormControlLabel
          sx={textBox}
          control={
            <Switch
              isactive={isactive}
              setActive={setActive}
              handleChange={handleChange}
              formData={formData}
              defaultValue={formData.status}
            />
          }
          label="Status"
          labelPlacement="start"
        />
        <Box sx={buttonContainer}>
          <Stack spacing={2} direction="row">
            <Button variant="text" sx={CancerButton} onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="contained" sx={SaveButton} onClick={handleSubmit}>
              Save
            </Button>
          </Stack>
        </Box>
      </FormGroup>
    </div>
  );
};
const UpdateUser = () => {
  return (
    <ModalContainer title={"Update a new user"}>
      <UpdateContent />
    </ModalContainer>
  );
};
export default UpdateUser;
