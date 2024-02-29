import React, { useState } from "react";
import ClassContext from "./ClassContext";

export default function ClassWrapper(props) {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState(null);
  const [classTitle, setClassTitle] = useState("");
  const [trainers, setTrainers] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [fsu, setFsu] = useState({});
  const [contact, setContact] = useState({});
  const [attendee, setAttendee] = useState({
    type: "",
    planned: 0,
    accepted: 0,
    actual: 0,
  });
  const handleAttendee = (type, value) => {
    setAttendee((prevAttendee) => ({
      ...prevAttendee,
      [type]: value,
    }));
  };
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const handleAdmin = (value) => {
    if (!admin.includes(value)) {
      setAdmin(value);
    }
  };
  const handleFsu = (value) => {
    setFsu(value);
  };
  const handleContact = (value) => {
    setContact(value);
  };
  const handleTrainers = (items) => {
    setTrainers(items);
  };
  const handleSearch = (item) => {
    setSearch(item);
  };
  const handleCancel = () => {
    setActiveTab(0);
    setSearch(null);
    setClassTitle("");
    setTrainers([]);
    setAdmin([]);
    setFsu({});
    setContact({});
    setAttendee({
      type: "",
      planned: 0,
      accepted: 0,
      actual: 0,
    });
  };
  const handleSave = () => {};
  return (
    <ClassContext.Provider
      value={{
        activeTab,
        handleTabChange,
        search,
        handleSearch,
        classTitle,
        setClassTitle,
        admin,
        handleAdmin,
        fsu,
        handleFsu,
        contact,
        handleContact,
        trainers,
        handleTrainers,
        attendee,
        handleAttendee,
        handleCancel,
        handleSave,
      }}
    >
      {" "}
      {props.children}
    </ClassContext.Provider>
  );
}
