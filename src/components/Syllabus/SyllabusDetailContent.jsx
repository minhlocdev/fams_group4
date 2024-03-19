import React, { useContext } from "react";
import { SyllabusContext } from "../../context/SyllabusContext";
import General from "./General";
import OutlineTabContent from "./OutlineTabContent";
import Other from "./Other";
import SyllabusTab from "./syllabusTab";
export default function SyllabusDetailContent() {
    const { activeTab } = useContext(SyllabusContext);
    const renderTabContent = () => {
        switch (activeTab) {
            case 0:
                return <General />;
            case 1:
                return <OutlineTabContent />;
            case 2:
                return <Other />;
            default:
                return null;
        }
    };
    return (
        <>
            <SyllabusTab />
            {renderTabContent()}
        </>
    )
}
