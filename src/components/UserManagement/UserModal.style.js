export const textBox = {
    width: "100%",
    display: "flex",
    alignItems: { xs: "flex-start", sm: "center" },
    justifyContent:'space-between',
    // justifyContent: { xs:'space-between',lg: "space-between" },
    flexDirection: { xs: "column-reverse",sm:'row-reverse',md:"row-reverse", lg: "row-reverse" },
    "& .MuiFormControlLabel-label": {
      fontSize: "16px",
      fontWeight: "500",
      color: "rgb(0, 0, 0)",
    },
    // "& .MuiStack-root" : {
    //     width: {sm:'25%'}
    // }
};
export const textFields = {
    display: "flex",
    width: { xs: "90%",sm:'50%', lg: "315px" },
    // flexDirection: "row-reverse",
    "& .MuiInputBase-input": {
      padding: "10px",
    },
    "& .MuiInputBase-input::placeholder": {
      fontStyle: "italic",
      fontWeight: "bolder",
      color: "rgb(0, 0, 0)",
    },
};

export const textCanlender = {
    // width: { xs: "90%", lg: "315px" },
    "& .MuiInputBase-input": {
        padding: "10px 10px 10px 10px",
    },
    "& .MuiInputBase-input::placeholder": {
        fontStyle: "italic",
        fontWeight: "bolder",
        color: "rgb(0, 0, 0)",
    },
    "& .MuiInputBase-root": {
        flexDirection: "row-reverse",
    },
    "& .customDatePickerDay": {
        backgroundColor: "#E74A3B",
        borderRadius: "8px",
    },
};

export const buttonContainer = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

export const CancerButton = {
    color: "#E74A3B",
    firstSize: "17px",
    fontWeight: "700",
    textDecoration: "underline",
};

export const SaveButton = {
    color: "whitesmoke",
    backgroundColor: "#2D3748",
    padding: "0px 25px",
    borderRadius: "8px",
    fontSize: "17px",
    fontWeight: "700",
};

export const datePickerStyle = {
    "& .MuiPickersDay-today": {
        backgroundColor: "#2D3748",
        color: "#fff",
    },
    "& .MuiPickersDay-root": {
        borderRadius: "8px",
    },
    "& .MuiPickersCalendarHeader-switchViewIcon": {
        visibility: "hidden",
    },
    "& .MuiPickersCalendar-root": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    "& .MuiPickersCalendarHeader-labelContainer": {
        position: "absolute",
        transform: "translatex(78px)",
    },
    "& .MuiPickersArrowSwitcher-root": {
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
    },
};