import React, { createContext, useState } from "react";
import useTable from "../utils/hooks/useTable";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
  const [checked, setChecked] = useState({
    roleName: "",
    gender: "",
    dobFro: "",
    dobTo: "",
  });

  const tableState = useTable();
  const contextValue = {
    checked,
    setChecked,
    ...tableState,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
