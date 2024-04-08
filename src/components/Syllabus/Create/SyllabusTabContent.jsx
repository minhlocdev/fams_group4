import React, { useContext } from "react";
import SyllabusTab from "../Detail/syllabusTab";
import SyllabusGeneral from "./SyllabusGeneral";
import SyllabusOutline from "./SyllabusOutline";
import SyllabusOther from "./SyllabusOther";
import { SyllabusContext } from "../../../context/SyllabusContext";

export default function SyllabusTabContent() {
  // const [draft, setDraft] = useState(false);
  const { activeTab } = useContext(SyllabusContext);

  return (
    <>
      <SyllabusTab />
      {activeTab === 0 && <SyllabusGeneral />}
      {activeTab === 1 && <SyllabusOutline />}
      {activeTab === 2 && <SyllabusOther />}
    </>
  );
}
