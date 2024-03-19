export const dayStyles = {
    width: "100%",
    position: "relative",
    ".MuiPickersCalendarHeader-root": {
        width: { xs: "100%", md: "50%", lg: "30%" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
    },
    "& .MuiPickersCalendarHeader-labelContainer": {
        margin: 0,
        position: "absolute",
        "& .MuiButtonBase-root ": {
            display: "none",
        },
    },
    "& .MuiPickersArrowSwitcher-root ": {
        width: "100%",
        justifyContent: "space-between",
    },
    "& .MuiDayCalendar-header": {
        justifyContent: "space-between",
        "& .MuiDayCalendar-weekDayLabel ": {
            fontWeight: "900",
            flex: 1,
        },
    },
    "& .MuiDayCalendar-weekContainer": {
        "& .MuiPickersDay-dayOutsideMonth, .MuiPickersDay-root, .MuiDayCalendar-weekNumber ":
        {
            flex: 1,
            borderRadius: "30px",
        },
    },
}
export const weekStyles = {
    width: "100%",
    position: "relative",
    ".MuiPickersCalendarHeader-root": {
        width: { xs: "100%", md: "50%", lg: "30%" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "0 auto",
    },
    "& .MuiPickersCalendarHeader-labelContainer": {
        margin: 0,
        position: "absolute",
        "& .MuiButtonBase-root ": {
            display: "none",
        },
    },
    "& .MuiPickersArrowSwitcher-root ": {
        width: "100%",
        justifyContent: "space-between",
    },
    "& .MuiDayCalendar-header": {
        justifyContent: "space-between",
        "& .MuiDayCalendar-weekDayLabel ": {
            fontWeight: "900",
            flex: 1,
        },
    },
    "& .MuiDayCalendar-weekContainer": {
        "& .MuiPickersDay-dayOutsideMonth, .MuiPickersDay-root, .MuiDayCalendar-weekNumber ":
        {
            flex: 1,
        },
    },
}