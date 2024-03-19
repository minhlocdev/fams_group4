import React, { useState } from "react";
import { SyllabusContext } from "./SyllabusContext";

export default function SyllabusWrapper(probs) {
  const [general, setGeneral] = useState({});
  const [outline, setOutline] = useState([]);
  console.log(outline);
  const [other, setOther] = useState({});
  const [timeAllocation, setTimeAllocation] = useState(Array(5).fill(0));
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
  // console.log(timeAllocation);
  const [save, isSave] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  //State for Syllabus detail--------------------------------
  const [openState, setOpenState] = useState({});
  const [openTraining, setOpenTraining] = useState(false); // state for open modal
  const [modalData, setModalData] = useState([]); // state for getting data for the modal
  const [selectedDay, setSelectedDay] = useState(null);
  const [unitId, setUnitId] = useState(null);
  const [syllabusID, setSyllabusID] = useState(null);
  const [buttonData, setButtonData] = useState([]); //State for the origin data
  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
  };
  const handleTimeAllocation = (value) => {
    switch (value) {
      case "Assignment/Lab":
        setTimeAllocation((prev) => {
          const newArray = [...prev];
          newArray[0] += 1;
          return newArray;
        });
        break;
      case "Concept/Lecture":
        setTimeAllocation((prev) => {
          const newArray = [...prev];
          newArray[1] += 1;
          return newArray;
        });

        break;
      case "Guide/Review":
        setTimeAllocation((prev) => {
          const newArray = [...prev];
          newArray[2] += 1;
          return newArray;
        });

        break;
      case "Test/Quiz":
        setTimeAllocation((prev) => {
          const newArray = [...prev];
          newArray[3] += 1;
          return newArray;
        });

        break;
      case "Exam":
        setTimeAllocation((prev) => {
          const newArray = [...prev];
          newArray[4] += 1;
          return newArray;
        });
        break;
      case "Seminar/Workshop":
        break;
      default:
        break;
    }
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
  //Syllabus Detail function here
  const updateButtonData = (dayIndex, unitID, newFile, syllabusID) => {
    setButtonData((prevButtonData) => {
      return prevButtonData.map((day) => {
        if (day.id === dayIndex) {
          return {
            ...day,
            content: day.content.map((unit) => {
              if (unit.id === unitID) {
                return {
                  ...unit,
                  datasyllabus: unit.datasyllabus.map((syllabus) => {
                    if (syllabus.id === syllabusID) {
                      return {
                        ...syllabus,
                        TrainingMaterial: [
                          ...syllabus.TrainingMaterial,
                          newFile,
                        ],
                      };
                    }
                    return syllabus;
                  }),
                };
              }
              return unit;
            }),
          };
        }
        return day;
      });
    });
  };
  const deleteMaterialButtonData = (dayIndex, unitID, index, syllabusID) => {
    setButtonData((prevButtonData) => {
      return prevButtonData.map((day) => {
        if (day.id === dayIndex) {
          return {
            ...day,
            content: day.content.map((unit) => {
              if (unit.id === unitID) {
                return {
                  ...unit,
                  datasyllabus: unit.datasyllabus.map((syllabus) => {
                    if (syllabus.id === syllabusID) {
                      const newTrainingMaterial = [
                        ...syllabus.TrainingMaterial,
                      ];
                      newTrainingMaterial.splice(index, 1);
                      return {
                        ...syllabus,
                        TrainingMaterial: newTrainingMaterial,
                      };
                    }
                    return syllabus;
                  }),
                };
              }
              return unit;
            }),
          };
        }
        return day;
      });
    });
  };
  const OpenTrainingMaterialModal = (e) => {
    setOpenTraining((prev) => !prev);
  };
  const handlePress = (dayIndex) => {
    setOpenState((prevOpenState) => ({
      ...prevOpenState,
      [dayIndex]: !prevOpenState[dayIndex],
    }));
  };

  const handleUnitClick = (dayIndex, unitIndex, dayID) => {
    setSelectedDay(dayID);
    setOpenState((prevOpenState) => ({
      ...prevOpenState,
      [dayIndex]: {
        ...(prevOpenState[dayIndex] || {}),
        [unitIndex]: !prevOpenState[dayIndex][unitIndex],
      },
    }));
  };
  const handleClose = () => {
    setOpenTraining(false);
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
        timeAllocation,
        setTimeAllocation,
        handleTimeAllocation,
        openState,
        setOpenState,
        openTraining,
        setOpenTraining,
        modalData,
        setModalData,
        selectedDay,
        setSelectedDay,
        unitId,
        setUnitId,
        syllabusID,
        setSyllabusID,
        buttonData,
        setButtonData,
        updateButtonData,
        deleteMaterialButtonData,
        OpenTrainingMaterialModal,
        handlePress,
        handleUnitClick,
        handleClose,
      }}
    >
      {probs.children}
    </SyllabusContext.Provider>
  );
}
