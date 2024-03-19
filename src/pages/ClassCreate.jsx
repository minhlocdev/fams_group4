import React from "react";
import AppContainer from "../components/shared/layout/AppContainer";
import ClassWrapper from "../context/ClassWrapper";
import ClassCreateDetail from "../components/Class/ClassCreateDetail";
import ClassCreateHeader from "../components/Class/ClassCreateHeader";

export default function ClassCreate() {
  return (
    <>
      <AppContainer>
        <ClassWrapper>
          <ClassCreateHeader />
          <ClassCreateDetail />
        </ClassWrapper>
      </AppContainer>
    </>
  );
}
