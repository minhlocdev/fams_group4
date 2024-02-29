import React from "react";

export const SyllabusContext = React.createContext({
  general: {},
  setGeneral: () => {},
  outline: [],
  setOutline: () => {},
  other: {},
  setOther: () => {},
  error: {},
  handleFieldValidation: () => {},
  save: {},
  handleSave: () => {},
  activeTab: 0,
  handleTabChange: () => {},
});
