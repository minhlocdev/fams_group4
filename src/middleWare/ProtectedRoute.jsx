import React, { useCallback, useMemo } from "react";
import { useAuth } from "../utils/authUtil";
import { Navigate, useLocation } from "react-router-dom";
import BackdropLoader from "../components/shared/loader/BackdropLoader";

export default function ProtectedRoute({ children, level }) {
  const { loginUser, userPermission } = useAuth();
  const path = useLocation().pathname;
  const pathName = useMemo(() => {
    return path.split("/")[1];
  }, [path]);
  const pathType = useMemo(() => {
    return path.split("/")[2] || "view";
  }, [path]);

  const hasPermission = useCallback(() => {
    if (loginUser.permissionId === "SA" && pathType === "permission") {
      return true;
    } else if (pathType === "permission" && loginUser.permissionId !== "SA") {
      return false;
    }
    if (userPermission !== undefined) {
      const myPermission = userPermission?.find(
        (u) => u.permissionId === loginUser.permissionId
      );
      return myPermission?.[pathName] >= level;
    }
    return false;
  }, [loginUser, userPermission, level, pathName, pathType]);
  if (!userPermission) {
    return <BackdropLoader />;
  }
  if (!hasPermission()) {
    return <Navigate to={"/unauthorize"} replace={true} />;
  }
  return children;
}
