import React, { useState, useCallback, useMemo, useEffect } from "react";
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
  const [initialDays, setInitialDays] = useState([]);

  useEffect(() => {
    setInitialDays([]);
  }, [search]);

  const handleAttendee = useCallback((type, value) => {
    setAttendee((prevAttendee) => ({
      ...prevAttendee,
      [type]: value,
    }));
  }, []);

  const handleTabChange = useCallback((event, newValue) => {
    setActiveTab(newValue);
  }, []);

  const handleAdmin = useCallback(
    (value) => {
      if (!admin.includes(value)) {
        setAdmin(value);
      }
    },
    [admin]
  );

  const handleFsu = useCallback((value) => {
    setFsu(value);
  }, []);

  const handleContact = useCallback((value) => {
    setContact(value);
  }, []);

  const handleTrainers = useCallback((items) => {
    setTrainers(items);
  }, []);

  const handleSearch = useCallback((item) => {
    setSearch(item);
  }, []);

  const handleCancel = useCallback(() => {
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
  }, []);

  const handleSave = useCallback(() => {
    // Implement your save logic here
  }, []);

  const contextValue = useMemo(
    () => ({
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
      initialDays,
      setInitialDays,
    }),
    [
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
      initialDays,
      setInitialDays,
    ]
  );

  return (
    <ClassContext.Provider value={contextValue}>
      {props.children}
    </ClassContext.Provider>
  );
}
