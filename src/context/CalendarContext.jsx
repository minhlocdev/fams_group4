import dayjs from "dayjs";
import React, { createContext, useState } from "react";
import { useAuth } from "../utils/authUtil";
import { useGetCalendarQuery } from "../services/queries/calendarQuery";

export const CalendarContext = createContext();
export const CalendarProvider = ({ children }) => {
  const [selectedDay, setSelectedDay] = useState(dayjs());
  const [selectedContent, setSelectedContent] = React.useState(null);
  const { loginUser } = useAuth();
  const { data, isLoading } = useGetCalendarQuery(loginUser.id);

  const handleExpandContentClick = (code) => {
    setSelectedContent((prev) => (prev === code ? null : code));
  };
  const contextValue = {
    selectedDay,
    setSelectedDay,
    trainingContent: data,
    isLoading,
    selectedContent,
    handleExpandContentClick,
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};
