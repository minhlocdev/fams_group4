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
  openState: {},
  setOpenState: () => {},
  openTraining: false,
  setOpenTraining: () => {},
  modalData: [],
  setModalData: () => {},
  selectedDay: null,
  setSelectedDay: () => {},
  unitId: null,
  setUnitId: () => {},
  syllabusID: null,
  setSyllabusID: () => {},
  buttonData: [],
  setButtonData: () => {},
  updateButtonData: () => {},
  deleteMaterialButtonData: () => {},
  OpenTrainingMaterialModal: () => {},
  handlePress: () => {},
  handleUnitClick: () => {},
  handleClose: () => {},
  timeAllocation: null,
  setTimeAllocation: () => {},
  handleValueOutlineTime: () => {},
  handleTimeAllocation: () => {},
  checked: {},
  setChecked: () => {},
  tableState: {},
  isLoading: false,
  deletingFiles: [],
  setDeletingFile: () => {},
});
