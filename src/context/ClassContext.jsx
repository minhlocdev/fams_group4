import React from "react";

const ClassContext = React.createContext({
  activeTab: 0,
  search: null,
  handleTabChange: () => {},
  handleSearch: () => {},
  classTitle: "",
  setClassTitle: () => {},
  admin: [],
  handleAdmin: () => {},
  fsu: {},
  handleFsu: () => {},
  contact: {},
  handleContact: () => {},
  trainers: [],
  handleTrainers: () => {},
  attendee: {},
  handleAttendee: () => {},
  handleSave: () => {},
  handleCancel: () => {},
});
export default ClassContext;
