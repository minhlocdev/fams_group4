import React from "react";
import ModalContainer from "../../shared/ModalContainer";
import {
  Avatar,
  Button,
  Divider,
  FormControl,
  FormLabel,
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
  const [link, setLink] = React.useState(avatar);

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
      <Avatar src={link} sx={{ width: 80, height: 80 }} />
      <Divider></Divider>
      <FormControl
        sx={{ justifyContent: "center", alignItems: "center", width: "100%" }}
      >
        <FormLabel id="demo-controlled-radio-buttons-group">Avatar</FormLabel>
        <TextField
          id="standard-basic"
          variant="standard"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="Link to the Image"
          sx={{ width: "80%", marginBottom: "10px" }}
        />

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
