import React, { useContext, useState } from "react";
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
import { usePostUserMutation } from "../../services/queries/userQuery";
import queryClient from "../../services/queries/queryClient";
import { QUERY_USER_KEY } from "../../constants/query";
import dayjs from "dayjs";
import {
  textFields,
  CancerButton,
  SaveButton,
  buttonContainer,
  textBox,
  textCanlender,
  datePickerStyle,
} from "./UserModal.style";
import useValidateForm from "../../utils/hooks/useValidateForm";
import ToastEmitter from "../shared/lib/ToastEmitter";
import AuthContext from "../../utils/authUtil";
const FormContent = ({ handleClose }) => {
  //False = Active, Truth = Unactive
  const { loginUser } = useContext(AuthContext);
  const [isactive, setActive] = useState(false);
  const [formData, setFormData] = useState({
    rolename: "",
    name: "",
    email: "",
    phone: "",
    dateOfBirth: null,
    gender: "male",
    status: true,
    createdBy: loginUser.name,
  });

  const { errors, validateForm } = useValidateForm();
  const { mutate: postNewUser, isSuccess } = usePostUserMutation();
  const handleSubmit = (e) => {
    if (!validateForm(formData)) {
      e.preventDefault();
    } else {
      e.preventDefault();
      postNewUser(formData, {
        onSuccess: () => {
          queryClient.resetQueries({ queryKey: [QUERY_USER_KEY] });
        },
        onError: () => {
          ToastEmitter.error("Add user failed!!");
        },
      });
    }
  };
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  if (isSuccess) {
    ToastEmitter.success("Create user successfully!!");
    handleClose();
  }
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
        />
        <FormControlLabel
          sx={textBox}
          control={
            <TextField
              placeholder="User name"
              sx={textFields}
              id="outlined-basic"
              variant="outlined"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              error={Boolean(errors.name)}
              helperText={errors.name}
            />
          }
          label="Name"
          labelPlacement="start"
        />
        <FormControlLabel
          sx={textBox}
          control={
            <TextField
              placeholder="Email address"
              sx={textFields}
              id="outlined-basic"
              variant="outlined"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              error={Boolean(errors.email)}
              helperText={errors.email}
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
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              error={Boolean(errors.phone)}
              helperText={errors.phone}
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
                      onChange: (date) => {
                        handleChange("dateOfBirth", date);
                      },
                    },
                    layout: {
                      sx: { datePickerStyle },
                    },
                  }}
                  sx={textCanlender}
                  value={formData.dateOfBirth}
                  onChange={(date) =>
                    handleChange(
                      "dateOfBirth",
                      dayjs(date).format("MM/DD/YYYY")
                    )
                  }
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
                defaultValue="male"
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
                  value="male"
                  control={<Radio color="default" />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
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
const AddUser = ({ isOpen, handleClose }) => {
  return (
    <ModalContainer
      title={"Add a new user"}
      isOpen={isOpen}
      handleClose={handleClose}
      key={isOpen?.toString()}
    >
      <FormContent handleClose={handleClose} />
    </ModalContainer>
  );
};
export default AddUser;
