import React, { useState, useContext } from "react";
import SyllabusTab from "../syllabusTab";
import SyllabusGeneral from "./SyllabusGeneral";
import SyllabusOutline from "./SyllabusOutline";
import SyllabusOther from "./SyllabusOther";
import { SyllabusContext } from "../../../context/SyllabusContext";

const text1 = `   Trainees’ PCs need to have following software installed & run without any issues:
• Microsoft SQL Server 2005 Express (in which the trainees can create & manipulate on their own database)
• Microsoft Visual Studio 2017
• Microsoft Office 2007 (Visio, Word, PowerPoint) `;

const line = `• Trainee who actively complete online learning according to MOOC links provided</br>
• At the end of the day, students complete Daily Quiz for 30 minutes</br>
• Trainer/Mentor supports answering questions, guiding exercises 1.5-2.0h/day</br>
• Trainer conducts the workshops</br>
• Trainees complete Assignments and Labs</br>
• Trainees have 1 final test in 4 hours (1 hour theory + 3 hours of practice)`;
export default function SyllabusTabContent() {
  const [draft, setDraft] = useState(false);
  const { activeTab } = useContext(SyllabusContext);
  const [data, setData] = useState({
    syllabusName: "C# Language Program",
    general: {
      level: "",
      message: text1,
      attendee: "20",
      richtext: line,
    },
    outline: [],
    other: {
      quiz: "15",
      assignment: "15",
      final: "70",
      finalTheory: "40",
      finalPractice: "60",
      gpa: "70",
      richtext: line,
    },
  });
  const [otherError, setOtherError] = useState({
    quiz: false,
    assignment: false,
    final: false,
    finalTheory: false,
    finalPractice: false,
    gpa: false,
  });

  const handleData = (updatedData, tab) => {
    if (draft === false) {
      if (tab === "other") {
        setData((prevState) => ({
          ...prevState,
          other: updatedData,
        }));
      }
      if (tab === "general") {
        setData((prevState) => ({
          ...prevState,
          general: updatedData,
        }));
      }
      if (tab === "outline") {
        setData((prevState) => ({
          ...prevState,
          outline: updatedData,
        }));
      }
    }
  };
  return (
    <>
      <SyllabusTab />
      {activeTab === 0 && <SyllabusGeneral />}
      {activeTab === 1 && <SyllabusOutline />}
      {activeTab === 2 && (
        <SyllabusOther
          error={otherError}
          OtherData={data.other}
          onChange={handleData}
        />
      )}
    </>
  );
}
