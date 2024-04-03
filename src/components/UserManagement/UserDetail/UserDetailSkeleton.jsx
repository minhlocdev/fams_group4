import React from "react";

import { Skeleton } from "@mui/material";
import styled from "@emotion/styled";

const UserProfileRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(2),
}));

const UserAvatarSkeleton = styled(Skeleton)(({ theme }) => ({
  width: theme.spacing(15),
  height: theme.spacing(15),
  marginBottom: theme.spacing(2),
}));

const UsernameSkeleton = styled(Skeleton)(({ theme }) => ({
  width: "60%",
  marginBottom: theme.spacing(1),
}));

const BioSkeleton = styled(Skeleton)(({ theme }) => ({
  width: "80%",
  marginBottom: theme.spacing(2),
}));

const StyledDivider = styled(Skeleton)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(2),
}));

const FieldSkeleton = styled(Skeleton)(({ theme }) => ({
  width: "80%",
  marginBottom: theme.spacing(1),
}));

const UserDetailSkeleton = () => {
  return (
    <UserProfileRoot>
      <UserAvatarSkeleton variant="circular" />
      <UsernameSkeleton variant="text" />
      <BioSkeleton variant="text" />
      <StyledDivider variant="text" />
      <FieldSkeleton variant="text" />
      <FieldSkeleton variant="text" />
      <FieldSkeleton variant="text" />
      <FieldSkeleton variant="text" />
      <FieldSkeleton variant="text" />
      <FieldSkeleton variant="text" />
      <FieldSkeleton variant="text" />
    </UserProfileRoot>
  );
};

export default UserDetailSkeleton;
