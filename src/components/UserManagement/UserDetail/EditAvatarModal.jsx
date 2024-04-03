import React from "react";
import ModalContainer from "../../shared/ModalContainer";
import {
  Avatar,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
} from "@mui/material";
import { usePutUserAvatarMutation } from "../../../services/queries/userQuery";
import ToastEmitter from "../../shared/lib/ToastEmitter";
import queryClient from "../../../services/queries/queryClient";
import { QUERY_USER_KEY } from "../../../constants/query";
import { useParams } from "react-router-dom";

export default function EditAvatarModal({
  isOpen,
  handleClose,
  avatar,
  letters,
}) {
  const { code } = useParams();
  const [value, setValue] = React.useState("Letters");
  const [link, setLink] = React.useState(avatar);
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const { mutate, isPending } = usePutUserAvatarMutation();
  const handleSave = () => {
    mutate(
      { id: Number(code), link: link },
      {
        onSuccess: () => {
          ToastEmitter.update(
            "Edit avatar successfully!!!",
            "loading",
            "success"
          );
          handleClose();
          queryClient.invalidateQueries({
            queryKey: [QUERY_USER_KEY, "id:" + code],
          });
        },
        onError: () => {
          ToastEmitter.update("Edit avatar failed!!", "loading", "error");
        },
      }
    );
  };
  if (isPending) {
    ToastEmitter.loading("...Loading", "loading");
  }
  return (
    <ModalContainer
      title={"Edit avatar"}
      isOpen={isOpen}
      handleClose={handleClose}
      key={isOpen?.toString()}
    >
      {value === "Image" && (
        <Avatar src={link} sx={{ width: 80, height: 80 }} />
      )}
      {value === "Letters" && (
        <Avatar
          sx={{
            width: 80,
            height: 80,
            fontSize: "14px",
            wordWrap: "break-word",
            wordBreak: "break-word",
            textAlign: "center",
          }}
        >
          {letters}
        </Avatar>
      )}
      <Divider></Divider>
      <FormControl
        sx={{ justifyContent: "center", alignItems: "center", width: "100%" }}
      >
        <FormLabel id="demo-controlled-radio-buttons-group">
          Avatar Type
        </FormLabel>
        {value === "Image" && (
          <TextField
            id="standard-basic"
            variant="standard"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Link to the Image"
            sx={{ width: "80%" }}
          />
        )}
        <RadioGroup
          aria-labelledby="demo-controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel
            value="Letters"
            control={<Radio />}
            label="Letter"
          />
          <FormControlLabel value="Image" control={<Radio />} label="Image" />
        </RadioGroup>
        <Stack direction={"row"} spacing={2}>
          <Button variant="outlined" color="primary" onClick={handleSave}>
            Save
          </Button>
          <Button
            variant="filled"
            sx={{
              backgroundColor: "#2D3748",
              fontWeight: "600",
              display: "block",
              margin: "10px auto",
              color: "#fff",
            }}
            onClick={handleClose}
          >
            Back
          </Button>
        </Stack>
      </FormControl>
    </ModalContainer>
  );
}
