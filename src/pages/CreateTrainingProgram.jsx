import React, { useState } from "react";
import { Box } from "@mui/material";
import NewTrainingProgram from "../components/CreateTraningProgram/NewTrainingProgram";
import AddSyllabus from "../components/CreateTraningProgram/AddSyllabus";

export default function CreateTranningProgramList() {
  const [newProgramSate, setNewProgramSate] = useState(true);
  const [newProgramName, setNewProgramName] = useState();
  const [oldProgramName, setOldProgramName] = useState();
  const onclickCreate = () => {
    setNewProgramSate(false);
  };
  const onClickBack = () => {
    setNewProgramSate(true);
    setOldProgramName(newProgramName);
  };
  const inputProgramName = (value) => {
    setNewProgramName(value);
  };
  return (
    <Box sx={{ width: "100%" }}>
      {newProgramSate ? (
        <NewTrainingProgram
          newProgramName={inputProgramName}
          clickCreate={onclickCreate}
          oldProgramName={oldProgramName}
        ></NewTrainingProgram>
      ) : (
        <AddSyllabus
          TraningProgramName={newProgramName}
          onClickBack={onClickBack}
        ></AddSyllabus>
      )}
    </Box>
  );
}
