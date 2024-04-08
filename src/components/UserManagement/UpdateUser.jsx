import React, { useState } from "react";
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
import {
  textFields,
  CancerButton,
  SaveButton,
  buttonContainer,
  textBox,
  textCanlender,
} from "./UserModal.style";
import dayjs from "dayjs";
import { usePutUserMutation } from "../../services/queries/userQuery";
import queryClient from "../../services/queries/queryClient";
import { QUERY_USER_KEY } from "../../constants/query";
import ToastEmitter from "../shared/lib/ToastEmitter";
import useValidateForm from "../../utils/hooks/useValidateForm";

const UpdateContent = ({ handleClose, item }) => {
  //False = Active, Truth = Unactive
  const [isactive, setActive] = useState(item.status);
  const [formData, setFormData] = useState({
    id: item.id,
    rolename: item.roleName,
    name: item.name,
    email: item.email,
    phone: item.phone,
    dateOfBirth: item.dateOfBirth,
    gender: String(item.gender).toLowerCase(),
    status: item.status,
  });
  const { mutate: updateUser, isSuccess } = usePutUserMutation();
  const { errors, validateForm } = useValidateForm();
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm(formData)) {
      console.log("Form validation failed");
    } else {
      updateUser(formData, {
        onSuccess: () => {
          ToastEmitter.success("Update user successfully!!");
          queryClient.invalidateQueries({ queryKey: [QUERY_USER_KEY] });
        },
        onError: () => {
          ToastEmitter.error("Update user failed!!");
        },
      });
    }
  };
  if (isSuccess) {
    ToastEmitter.success("Update sucessfully!!");
    handleClose();
  }
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

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
          defaultValue={formData.rolename}
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
                  value={dayjs(formData.dateOfBirth)}
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
const UpdateUser = ({ isOpen, handleClose, item }) => {
  return (
    <ModalContainer
      title={"Update a new user"}
      isOpen={isOpen}
      handleClose={handleClose}
      key={isOpen.toString()}
    >
      <UpdateContent handleClose={handleClose} item={item} />
    </ModalContainer>
  );
};
export default UpdateUser;
