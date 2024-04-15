import React, { useState } from "react";
import NewTrainingProgram from "../components/CreateTraningProgram/NewTrainingProgram";
import AddSyllabus from "../components/CreateTraningProgram/AddSyllabus";
export default function CreateTrainingProgramList() {
  const [newProgramSate, setNewProgramSate] = useState(true);
  const [newProgramName, setNewProgramName] = useState();
  const [oldProgramName, setOldProgramName] = useState();
  const onclickCreate = () => {
    console.log("newProgramName", newProgramName);
    if (newProgramName !== undefined) {
      setNewProgramSate(false);
    }
  };
  const onClickBack = () => {
    setNewProgramSate(true);
    setOldProgramName(newProgramName);
  };
  const inputProgramName = (value) => {
    setNewProgramName(value);
  };
  return (
    <>
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
    </>
  );
}
