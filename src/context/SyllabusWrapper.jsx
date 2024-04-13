import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SyllabusContext } from "./SyllabusContext";
import useTable from "../utils/hooks/useTable";
import { useParams } from "react-router-dom";
import {
  useGetSyllabusByIdQuery,
  usePostSyllabusMutation,
  usePutSyllabusMutation,
} from "../services/queries/syllabusQuery";
import ToastEmitter from "../components/shared/lib/ToastEmitter";
import AuthContext from "../utils/authUtil";
import queryClient from "../services/queries/queryClient";

export default function SyllabusWrapper(probs) {
  const { loginUser } = useContext(AuthContext);
  const [general, setGeneral] = useState({
    createdBy: loginUser.name,
    userId: loginUser.id,
    outputStandards: ["LO01", "LO02", "LO03"],
    syllabusName: "",
    level: "",
    trainingAudience: 0,
    technicalRequirement: "",
    courseObjective: "",
    syllabusCode: "NLP",
  });
  const [outline, setOutline] = useState([]);
  const [other, setOther] = useState({
    quiz: 0,
    assignment: 0,
    final: 0,
    finalTheory: 0,
    finalPractice: 0,
    passing: 0,
    trainingPrinciple: "",
  });

  const [timeAllocation, setTimeAllocation] = useState(Array(5).fill(0));
  const [error, setError] = useState({
    syllabusName: false,
    level: false,
    technicalRequirement: false,
    trainingAudience: false,
    courseObjective: false,
    quiz: false,
    assignment: false,
    final: false,
    finalTheory: false,
    finalPractice: false,
    passing: false,
    syllabusCode: false,
    unitTitle: false,
    day: false,
  });
  // console.log("error", error);
  const { code } = useParams();
  const [checked, setChecked] = useState({
    outputStandardStrings: "",
    createdDateBegin: "",
    createdDateEnd: "",
  });
  const tableState = useTable();

  const { data, isLoading } = useGetSyllabusByIdQuery(code);
  const [activeTab, setActiveTab] = useState(0);
  //State for Syllabus detail--------------------------------
  const [openState, setOpenState] = useState({});
  const [openTraining, setOpenTraining] = useState(false); // state for open modal
  const [modalData, setModalData] = useState([]); // state for getting data for the modal
  const [selectedDay, setSelectedDay] = useState(null);
  const [unitId, setUnitId] = useState(null);
  const [syllabusID, setSyllabusID] = useState(null);
  const [buttonData, setButtonData] = useState([]); //State for the origin data
  const postParams = useMemo(() => {
    const newOutline = outline.map((item) => ({
      dayNumber: item.dayNumber,
      trainingUnits: item.trainingUnits.map((unit) => ({
        unitName: unit.unitName,
        trainingContents: unit.trainingContents.map((dataUnit) => ({
          contentName: dataUnit.contentName,
          learningObjectiveCode: dataUnit.learningObjectiveCode,
          deliveryType: dataUnit.deliveryType,
          duration: dataUnit.duration,
          trainingFormat: dataUnit.trainingFormat,
          note: "no information",
          materials: (dataUnit.materials || []).map((material) => ({
            title: material.title,
            createdOn: material.createdOn,
            createdBy: material.createdBy,
            url: material.url,
          })),
        })),
      })),
    }));
    return {
      generalTab: { ...general },
      dayUnits: newOutline,
      otherScreen: { ...other },
    };
  }, [general, outline, other]);
  const putParams = useMemo(() => {
    const newOutline = outline.map((item) => ({
      dayNumber: item.dayNumber,
      trainingUnits: item.trainingUnits.map((unit) => ({
        unitCode: null,
        unitName: unit.unitName,
        trainingContents: unit.trainingContents.map((dataUnit) => ({
          id: 0,
          contentName: dataUnit.contentName,
          learningObjectiveCode: dataUnit.learningObjectiveCode,
          deliveryType: dataUnit.deliveryType,
          duration: dataUnit.duration,
          trainingFormat: dataUnit.trainingFormat,
          note: "no information",
          materials: (dataUnit.materials || []).map((material) => ({
            id: material.id,
            contentId: 0,
            title: material.title,
            createdDate: material.createdOn,
            createdBy: material.createdBy,
            url: material.url,
          })),
        })),
      })),
    }));
    const newOther = {
      quiz: other.quiz,
      assignment: other.assignment,
      final: other.final,
      finalTheory: other.finalTheory,
      finalPractice: other.finalPractice,
      passing: other.passing,
    };

    return {
      id: Number(code),
      syllabusName: general.syllabusName,
      technicalRequirement: general.technicalRequirement,
      attendeeNumber: general.trainingAudience,
      courseObjective: general.courseObjective,
      trainingPrinciples: other.trainingPrinciple,
      level: general.level,
      modifiedBy: loginUser.name,
      outline: newOutline,
      schema: newOther,
    };
  }, [code, general, outline, other, loginUser]);
  useEffect(() => {
    if (data && !isLoading) {
      setOutline(data.outline);
      setGeneral((prev) => ({
        ...prev,
        level: data.level,
        syllabusCode: data.syllabusCode,
        syllabusName: data.syllabusName,
        trainingAudience: data.trainingAudience,
        technicalRequirement: data.technicalRequirement,
        courseObjective: data.courseObjective,
        createdBy: data.createdBy,
      }));
      setOther(() => ({
        ...data.assessmentScheme,
        trainingPrinciple: data.trainingPrinciples,
      }));
      updateTimeAllocation(data.outline);
    }
  }, [data, isLoading]);

  const handleTabChange = (newValue) => {
    setActiveTab(newValue);
  };
  const updateTimeAllocation = (trainingSchedule) => {
    // Khởi tạo một mảng tạm thời để tính tổng thời gian
    const tempTimeAllocation = [0, 0, 0, 0, 0];

    trainingSchedule.forEach((day) => {
      day.trainingUnits.forEach((unit) => {
        unit.trainingContents.forEach((content) => {
          const duration = content.duration;
          const deliveryType = content.deliveryType;
          tempTimeAllocation[deliveryType - 1] += duration;
        });
      });
    });
    setTimeAllocation(tempTimeAllocation);
  };
  const handleTimeAllocation = (value, action, time) => {
    switch (action) {
      case "add":
        switch (value) {
          case 1:
            setTimeAllocation((prev) => {
              const newArray = [...prev];
              newArray[0] += parseInt(time, 10);
              return newArray;
            });
            break;
          case 2:
            setTimeAllocation((prev) => {
              const newArray = [...prev];
              newArray[1] += parseInt(time, 10);
              return newArray;
            });
            break;
          case 3:
            setTimeAllocation((prev) => {
              const newArray = [...prev];
              newArray[2] += parseInt(time, 10);
              return newArray;
            });

            break;
          case 4:
            setTimeAllocation((prev) => {
              const newArray = [...prev];
              newArray[3] += parseInt(time, 10);
              return newArray;
            });

            break;
          case 5:
            setTimeAllocation((prev) => {
              const newArray = [...prev];
              newArray[4] += parseInt(time, 10);
              return newArray;
            });
            break;
          case 6:
            break;
          default:
            break;
          // Increment the corresponding index based on the value
        }
        break;
      case "remove":
        switch (value) {
          case 1:
            setTimeAllocation((prev) => {
              const newArray = [...prev];
              newArray[0] -= parseInt(time, 10);
              return newArray;
            });
            break;
          case 2:
            setTimeAllocation((prev) => {
              const newArray = [...prev];
              newArray[1] -= parseInt(time, 10);
              return newArray;
            });

            break;
          case 3:
            setTimeAllocation((prev) => {
              const newArray = [...prev];
              newArray[2] -= parseInt(time, 10);
              return newArray;
            });

            break;
          case 4:
            setTimeAllocation((prev) => {
              const newArray = [...prev];
              newArray[3] -= parseInt(time, 10);
              return newArray;
            });

            break;
          case 5:
            setTimeAllocation((prev) => {
              const newArray = [...prev];
              newArray[4] -= parseInt(time, 10);
              return newArray;
            });
            break;
          case 6:
            break;
          default:
            break;
          // Decrement the corresponding index based on the value
        }
        break;
      default:
        break;
    }
    switch (value) {
    }
  };
  const postSyllabus = usePostSyllabusMutation();
  const putSyllabus = usePutSyllabusMutation();

  const handleCreate = useCallback(() => {
    // console.log("create", postParams);
    postSyllabus.mutate(postParams, {
      onSuccess: () => {
        ToastEmitter.update(
          "Create syllabus successfully!!!",
          "loading",
          "success"
        );
      },
      onError: (error) => {
        ToastEmitter.update(error.response?.data, "loading", "error");
      },
    });
  }, [postParams, postSyllabus]);
  const handleUpdate = useCallback(() => {
    putSyllabus.mutate(putParams, {
      onSuccess: () => {
        ToastEmitter.update(
          "Update syllabus successfully!!!",
          "loading",
          "success"
        );
      },
      onError: (error) => {
        ToastEmitter.update(error.response?.data, "loading", "error");
      },
    });
    // console.log("put data", putParams);
  }, [putParams, putSyllabus]);
  if (postSyllabus.isPending || putSyllabus.isPending) {
    ToastEmitter.loading("...Loading", "loading");
  }
  const handleSave = useCallback(() => {
    validateForm();
    if (Object.values(error).every((value) => value === false)) {
      code ? handleUpdate() : handleCreate();
    } else {
      ToastEmitter.error("You didnt fill enough information");
      handleTabChange(0);
    }
    // eslint-disable-next-line
  }, [postParams, putParams]);

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
  const validateForm = () => {
    const unrequireFields = ["syllabusCode", "trainingPrinciple"];
    // general :
    Object.entries(general).forEach(([key, value]) => {
      if (!unrequireFields.includes(key) && (value === "" || value === 0)) {
        error[key] = true;
      }
    });
    // other
    Object.entries(other).forEach(([key, value]) => {
      if (!unrequireFields.includes(key) && (value === "" || value === 0)) {
        error[key] = true;
      }
    });
    return error;
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
        checked,
        setChecked,
        ...tableState,
        isLoading,
      }}
    >
      {probs.children}
    </SyllabusContext.Provider>
  );
}
