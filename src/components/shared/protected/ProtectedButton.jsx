import React from "react";
import { useAuth } from "../../../utils/authUtil";
import { Box } from "@mui/material";
import { PermissionEnums } from "../../../constants/PermissionEnums";
import ToastEmitter from "../lib/ToastEmitter";

export default function ProtectedButton({
  onClick,
  children,
  permissionRequired,
  pathName,
  style,
}) {
  const { loginUser, userPermission } = useAuth();

  const hasRole = () => {
    if (loginUser.permissionId !== "SA") {
      if (userPermission !== undefined) {
        const myPermission = userPermission?.find(
          (u) => u.permissionId === loginUser.permissionId
        );
        const capabilities = PermissionEnums.at(
          myPermission[pathName] - 1
        ).allow;
        return capabilities.includes(permissionRequired);
      }
    } else return true;
  };

  const handleClick = () => {
    if (hasRole()) onClick();
    else ToastEmitter.error("You do not have permission for this function!");
  };
  const divStyle = {
    ...style,
    display: "flex",
    alignItems: "center",
    filter: !hasRole() ? "opacity(0.3)" : "opacity(1)",

    cursor: !hasRole() ? "not-allowed" : "pointer",
    "& > .MuiButtonBase-root": {
      cursor: !hasRole() ? "not-allowed" : "pointer",
    },
  };

  return (
    <Box onClick={handleClick} sx={divStyle}>
      {children}
    </Box>
  );
}
