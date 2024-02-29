import React, { useEffect, useState } from "react";
import { SyllabusContext } from "./SyllabusContext";

export default function SyllabusWrapper(probs) {
  const [general, setGeneral] = useState({});
  const [outline, setOutline] = useState([]);
  const [other, setOther] = useState({});
  const [error, setError] = useState({
    level: true,
    message: true,
    attendee: true,
    richtext: true,
    title: true,
    quiz: true,
    assignment: true,
    final: true,
    finalTheory: true,
    finalPractice: true,
    gpa: true,
  });
  const [save, isSave] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
  };
  const handleSave = () => {
    if (Object.values(error).every((value) => value === false)) {
      isSave(true);
    } else {
      handleTabChange(0);
    }
  };
  const handleFieldValidation = (fieldName, value) => {
    if (value !== "") {
      setError((prevError) => ({
        ...prevError,
        [fieldName]: false,
      }));
    } else {
      setError((prevError) => ({
        ...prevError,
        [fieldName]: true,
      }));
    }
  };
  return (
    <SyllabusContext.Provider
      value={{
        general,
        setGeneral,
        outline,
        setOutline,
        other,
        setOther,
        error,
        handleFieldValidation,
        save,
        handleSave,
        activeTab,
        handleTabChange,
      }}
    >
      {probs.children}
    </SyllabusContext.Provider>
  );
}
