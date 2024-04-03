import React, { createContext, useState } from "react";
import useTable from "../utils/hooks/useTable";

export const TrainingProgramContext = createContext();
export const TrainingProgramProvider = ({ children }) => {
  const [checked, setChecked] = useState({
    startDateBegin: "",
    startDateEnd: "",
  });

  const tableState = useTable();
  const contextValue = {
    checked,
    setChecked,
    ...tableState,
  };

  return (
    <TrainingProgramContext.Provider value={contextValue}>{children}</TrainingProgramContext.Provider>
  );
};