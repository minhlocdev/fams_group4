import React, { useContext } from "react";
import { SyllabusContext } from "../../../context/SyllabusContext";
import General from "./General";
import OutlineTabContent from "./OutlineTabContent";
import Other from "./Other";
import SyllabusTab from "./syllabusTab";
import { useGetTimeAllocationByIdQuery } from "../../../services/queries/syllabusQuery";

export default function SyllabusDetailContent({ data, SyllabusID }) {
  const { activeTab } = useContext(SyllabusContext);
  const { data: datas } = useGetTimeAllocationByIdQuery(SyllabusID);
  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <General datas={data} />;
      case 1:
        return (
          <OutlineTabContent SyllabusID={SyllabusID} timeallocation={datas} />
        );
      case 2:
        return (
          <Other datas={data} SyllabusID={SyllabusID} timeallocation={datas} />
        );
      default:
        return null;
    }
  };
  return (
    <>
      <SyllabusTab />
      {renderTabContent()}
    </>
  );
}
