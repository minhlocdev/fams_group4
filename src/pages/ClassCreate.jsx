import React from "react";
import AppContainer from "../components/shared/layout/AppContainer";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ClassHeader from "../components/Class/ClassHeader";
import ClassWrapper from "../context/ClassWrapper";
import ClassCreateDetail from "../components/Class/ClassCreateDetail";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  border: "unset",
  boxShadow: "unset",
}));
export default function ClassCreate() {
  return (
    <>
      <AppContainer>
        <ClassWrapper>
          <ClassHeader />
          <ClassCreateDetail />
        </ClassWrapper>
      </AppContainer>
    </>
  );
}
