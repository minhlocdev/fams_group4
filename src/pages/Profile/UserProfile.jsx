import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Avatar, Typography, Divider, Button, Box, Link } from "@mui/material";
import { useGetUserByIdQuery } from "../../services/queries/userQuery";
import { useParams } from "react-router";
import UserDetailSkeleton from "../../components/UserManagement/UserDetail/UserDetailSkeleton";
import UpdateUser from "../../components/UserManagement/UpdateUser";
import EditAvatarModal from "../../components/UserManagement/UserDetail/EditAvatarModal";

const UserProfileRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  marginBottom: theme.spacing(2),
}));

const Username = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: "bold",
  marginBottom: theme.spacing(1),
}));

const Bio = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(2),
}));

const Field = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  marginBottom: theme.spacing(1),
}));

const FieldName = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: "bold",
  marginRight: theme.spacing(1),
}));

const FieldValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

const UserProfile = () => {
  const [update, isUpdate] = useState(false);
  const [editAvatar, setEditAvatar] = useState(false);
  const { code } = useParams();
  const { data, isLoading } = useGetUserByIdQuery(code);
  const handleCloseUpdate = () => {
    isUpdate(false);
  };
  const handleCloseAvatar = () => {
    setEditAvatar(false);
  };
  if (isLoading) {
    return <UserDetailSkeleton />;
  }
  // eslint-disable-next-line no-unused-vars
  const [forName, _] = data.email.split("@");
  const { avatarUrl } = data;
  return (
    <>
      <UserProfileRoot>
        <Box
          sx={{
            position: "relative",
            "&:hover > .MuiAvatar-root": {
              scale: "1.2",
              opacity: "0.2",
            },
          }}
        >
          <UserAvatar
            sx={{
              transition: "scale .1s linear,  opacity .2s ease",
              textAlign: "center",
            }}
            alt="User Avatar"
            src={avatarUrl}
          />
          {/* {forName}
          </UserAvatar>{" "} */}
          <Button
            variant="outlined"
            color="primary"
            sx={{
              minWidth: "90px",
              fontSize: "10px",
              padding: "2px 5px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontWeight: "500",
            }}
            onClick={() => setEditAvatar(true)}
          >
            Edit Avatar
          </Button>
        </Box>
        <Username variant="h4">{data.name}</Username>
        <Bio variant="body1">{data.roleName}</Bio>
        <StyledDivider />
        <Field>
          <FieldName variant="body1">Permission ID:</FieldName>
          <FieldValue variant="body1">{data.permissionId}</FieldValue>
        </Field>
        <Field>
          <FieldName variant="body1">Email:</FieldName>
          <FieldValue variant="body1">{data.email}</FieldValue>
        </Field>
        <Field>
          <FieldName variant="body1">Phone:</FieldName>
          <FieldValue variant="body1">{data.phone}</FieldValue>
        </Field>
        <Field>
          <FieldName variant="body1">Date of Birth:</FieldName>
          <FieldValue variant="body1">{data.dateOfBirth}</FieldValue>
        </Field>
        <Field>
          <FieldName variant="body1">Gender:</FieldName>
          <FieldValue variant="body1">{data.gender}</FieldValue>
        </Field>
        <Field>
          <FieldName variant="body1">Status:</FieldName>
          <FieldValue variant="body1">
            {data.status ? "Active" : "Inactive"}
          </FieldValue>
        </Field>
        <Box mt={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => isUpdate(true)}
          >
            Edit Profile
          </Button>
        </Box>
      </UserProfileRoot>
      <Button
        variant="filled"
        sx={{
          backgroundColor: "#2D3748",
          fontWeight: "600",
          display: "block",
          margin: "10px auto",
        }}
      >
        <Link
          href={"/user"}
          sx={{
            color: "#fff",
          }}
        >
          Back
        </Link>
      </Button>
      <UpdateUser isOpen={update} handleClose={handleCloseUpdate} item={data} />
      <EditAvatarModal
        isOpen={editAvatar}
        handleClose={handleCloseAvatar}
        avatar={avatarUrl}
        letters={forName}
      />
    </>
  );
};

export default UserProfile;
