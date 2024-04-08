import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useContext,
} from "react";
import ClassContext from "./ClassContext";
import useTable from "../utils/hooks/useTable";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  useGetClassByIdQuery,
  usePostClassMutation,
  usePutClassMutation,
} from "../services/queries/classQuery";
import { useGetUserQuery } from "../services/queries/userQuery";
import dayjs from "dayjs";
import { useGetTrainingProgramByIdQuery } from "../services/queries/trainingQuery";
import AuthContext from "../utils/authUtil";
import ToastEmitter from "../components/shared/lib/ToastEmitter";
import queryClient from "../services/queries/queryClient";
import { QUERY_CLASS_KEY } from "../constants/query";
import { differenceInMinutes } from "date-fns";
import { PublishStatusEnum } from "../constants/PublishStatusEnum";

export default function ClassWrapper(props) {
  const locate = useLocation();
  const navigate = useNavigate();
  const isCreate = locate.pathname.includes("create");
  const { loginUser } = useContext(AuthContext);
  const { code } = useParams();
  const { data } = useGetClassByIdQuery(code);
  const { data: classAdmin } = useGetUserQuery(0, 100, "", "", "", {
    roleName: "Class Admin",
  });
  const { data: trainerData } = useGetUserQuery(0, 100, "", "", "", {
    roleName: "Trainer",
  });
  const { data: fsuContact } = useGetUserQuery(0, 100, "", "", "", {});
  const [activeStep, setActiveStep] = React.useState(isCreate ? 0 : 1);
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState(null);
  const [classTitle, setClassTitle] = useState("");
  const [classCode, setClassCode] = useState("");
  const [classTime, setClassTime] = useState("");
  const [startDate, setStartDate] = useState(dayjs());
  const [trainers, setTrainers] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [fsu, setFsu] = useState("");
  const [contact, setContact] = useState("");
  const [attendee, setAttendee] = useState({
    type: "",
    planned: 0,
    accepted: 0,
    actual: 0,
  });
  const [initialDays, setInitialDays] = useState([]);
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState(0);
  const { data: trainingProgramDetail } = useGetTrainingProgramByIdQuery(
    search ? search.trainingProgramCode : null
  );
  //useEffect to set data for editing
  useEffect(() => {
    if (data) {
      setSearch(data.trainingProgram);
      setFsu(data.fsu);
      setLocation(data.location);
      setContact(data.emailFSU);
      setClassTitle(data.className);
      setTrainers(data.infoTrainers);
      setAdmin(data.infoAdmins);
      const formattedDates = data.calendarStudy.map((dateString) => {
        return dayjs(dateString, "MM/DD/YYYY").toDate();
      });
      setInitialDays(formattedDates);
      setAttendee((prevAttendee) => ({ ...prevAttendee, type: data.attendee }));
      setClassTime(data.classTime);
      setClassCode(data.classCode);
      setStartDate(dayjs(data.startDate, "DD/MM/YYYY"));
    }
  }, [data]);
  //filter table
  const [checked, setChecked] = useState({
    locations: "",
    startDate: "",
    endDate: "",
    status: "",
    typeClassTime: "",
    FSU: "",
    trainerId: "",
    attendees: "",
  });
  const tableState = useTable();
  const handleAttendee = useCallback((type, value) => {
    setAttendee((prevAttendee) => ({
      ...prevAttendee,
      [type]: value,
    }));
  }, []);
  const fieldValidation = useMemo(() => {
    const [from, to] = classTime.split("-");
    const diff = differenceInMinutes(
      dayjs(to, "HH:mm").toString(),
      dayjs(from, "HH:mm").toString()
    );
    return {
      ClassTitle: classTitle === "",
      ClassCode: classCode === "",
      ClassTime: classTime === "-" || diff < 90 || diff > 120,
      Admin: admin.length === 0,
      Contact: contact === "" || !contact,
      FSU: fsu === "",
      StartDate: !startDate,
      InitialDays: initialDays.length === 0,
      Attendee: attendee.type === "",
      TrainingProgram: !search,
      Location: location === "",
    };
  }, [
    location,
    classTitle,
    classCode,
    classTime,
    admin,
    contact,
    fsu,
    startDate,
    initialDays,
    attendee,
    search,
  ]);
  const postParams = useMemo(() => {
    const [from, to] = classTime.split("-");
    const adminID = admin.map((a) => a.id);
    const formattedTrainers = trainers.map((trainer) => ({
      trainerId: trainer.trainerId,
      unitCode: trainer.unitCode,
      location: trainer.location,
    }));
    return {
      className: classTitle,
      classCode: classCode,
      attendee: attendee.type,
      duration: initialDays?.length + 1,
      status: PublishStatusEnum[status],
      location: location,
      fsu: fsu + "-" + contact,
      startDate: startDate,
      endDate: dayjs(startDate).add(initialDays.length, "day"),
      // gmt +7
      classTimeStart: dayjs(from, "HH:mm").add(7, "hour"),
      classTimeEnd: dayjs(to, "HH:mm").add(7, "hour"),
      createdBy: loginUser.name,
      createdDate: dayjs(),
      adminId: [...adminID],
      calendar: initialDays,
      trainers: formattedTrainers,
      trainingProgramCode: search?.trainingProgramCode,
    };
  }, [
    search,
    classTime,
    classTitle,
    classCode,
    initialDays,
    location,
    status,
    fsu,
    contact,
    startDate,
    admin,
    loginUser,
    trainers,
    attendee,
  ]);
  const putParms = useMemo(() => {
    const [from, to] = classTime.split("-");
    const adminID = admin.map((a) => a.id);
    const formattedTrainers = trainers.map((trainer) => ({
      trainerId: trainer.trainerId,
      unitCode: trainer.unitCode,
      location: trainer.location,
    }));
    return {
      id: Number(code),
      className: classTitle,
      classCode: classCode,
      attendee: attendee.type,
      duration: initialDays?.length + 1,
      status: PublishStatusEnum[status],
      location: location,
      fsu: fsu + "-" + contact,
      startDate: startDate,
      endDate: dayjs(startDate).add(initialDays.length, "day"),
      // gmt +7
      classTimeStart: dayjs(from, "HH:mm").add(7, "hour"),
      classTimeEnd: dayjs(to, "HH:mm").add(7, "hour"),
      modifiedBy: loginUser.name,
      adminId: [...adminID],
      dateAndTimeStudy: initialDays,
      trainers: formattedTrainers,
      trainingProgramCode: search?.trainingProgramCode,
    };
  }, [
    code,
    search,
    classTime,
    classTitle,
    classCode,
    initialDays,
    location,
    status,
    fsu,
    contact,
    startDate,
    admin,
    loginUser,
    trainers,
    attendee,
  ]);
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
  // add Trainers
  const handleTrainers = useCallback(
    (unitCode, trainer, syllabusId) => {
      const { id, phone, email, name, avatarUrl } = trainer;

      const existingTrainerIndex = trainers.findIndex(
        (tr) => tr.unitCode === unitCode
      );
      if (existingTrainerIndex !== -1) {
        const updatedTrainers = trainers.map((tr, index) => {
          if (index === existingTrainerIndex) {
            return {
              ...tr,
              trainerId: id,
              phone: phone,
              email: email,
              name: name,
              avatarUrl: avatarUrl,
            };
          }
          return tr;
        });
        setTrainers(updatedTrainers);
      } else {
        setTrainers((prevTrainers) => [
          ...prevTrainers,
          {
            unitCode,
            syllabusId,
            trainerId: id,
            phone,
            email,
            name,
            avatarUrl,
          },
        ]);
      }
    },
    [trainers, setTrainers]
  );
  const handleLocations = useCallback(
    (unitCode, location, syllabusId) => {
      const existingTrainerIndex = trainers.findIndex(
        (tr) => tr.unitCode === unitCode
      );
      if (existingTrainerIndex !== -1) {
        const updatedTrainers = trainers.map((tr, index) => {
          if (index === existingTrainerIndex) {
            return {
              ...tr,
              location: location,
            };
          }
          return tr;
        });
        setTrainers(updatedTrainers);
      } else {
        setTrainers((prevTrainers) => [
          ...prevTrainers,
          {
            unitCode,
            syllabusId,
            location: location,
          },
        ]);
      }
    },
    [trainers, setTrainers]
  );
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

  const postClass = usePostClassMutation();
  const handleSave = useCallback(() => {
    isCreate ? handleCreate() : handleUpdate();
    // eslint-disable-next-line
  }, [postParams, putParms]);
  const handleCreate = useCallback(() => {
    console.log(postParams);
    postClass.mutate(postParams, {
      onSuccess: () => {
        ToastEmitter.success("Create class successfully!!!");
        queryClient.invalidateQueries({ queryKey: [QUERY_CLASS_KEY] });
        navigate("/class");
      },
    });
    // eslint-disable-next-line
  }, [postParams]);
  const putClass = usePutClassMutation();
  const handleUpdate = useCallback(() => {
    console.log(putParms);
    putClass.mutate(putParms, {
      onSuccess: () => {
        ToastEmitter.success("Update class successfully!!!");
        queryClient.invalidateQueries({ queryKey: [QUERY_CLASS_KEY] });
        navigate("/class");
      },
    });
    // eslint-disable-next-line
  }, [postParams]);
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
      checked,
      setChecked,
      ...tableState,
      classData: data,
      classAdmin: classAdmin?.list,
      fsuContact,
      classCode,
      classTime,
      startDate,
      setClassTime,
      setClassCode,
      setStartDate,
      activeStep,
      setActiveStep,
      trainingProgramDetail,
      trainerData,
      fieldValidation,
      location,
      setLocation,
      status,
      setStatus,
      handleLocations,
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
      checked,
      setChecked,
      tableState,
      data,
      classAdmin,
      fsuContact,
      classCode,
      classTime,
      startDate,
      setClassTime,
      setClassCode,
      setStartDate,
      activeStep,
      setActiveStep,
      trainingProgramDetail,
      trainerData,
      fieldValidation,
      location,
      setLocation,
      status,
      setStatus,
      handleLocations,
    ]
  );

  return (
    <ClassContext.Provider value={contextValue}>
      {props.children}
    </ClassContext.Provider>
  );
}
