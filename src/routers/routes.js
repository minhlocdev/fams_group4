import { lazy } from "react";
import SyllabusCreate from "../pages/SyllabusCreate";
import CreateTrainingProgramList from "../pages/CreateTrainingProgram";
import ClassCreate from "../pages/ClassCreate";
import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import EditTrainingProgram from "../pages/EditTrainingProgram";

const ClassDetail = lazy(() => import("../pages/ClassDetail"));
const ClassListing = lazy(() => import("../pages/ClassListing"));
const UserPermission = lazy(() => import("../pages/UserPermission"));
const UserManagement = lazy(() => import("../pages/UserManagement"));
const SyllabusListing = lazy(() => import("../pages/SyllabusListing"));
const SyllabusDetail = lazy(() => import("../pages/SyllabusDetail"));
const TrainingProgramList = lazy(() => import("../pages/TrainingProgramList"));
const TrainingCalendar = lazy(() => import("../pages/TrainingCalendar"));
const TrainingProgramDetail = lazy(() => import("../pages/TrainingProgramDetail"));
const UserDetail = lazy(() => import("../pages/UserDetail"));
export const privateRoute = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/user",
    element: <UserManagement />,
  }, {
    path: "/user/detail/:code",
    element: <UserDetail />,
  },
  {
    path: "/user/permission",
    element: <UserPermission />,
  },
  {
    path: "/syllabus",
    element: <SyllabusListing />,
  },
  {
    path: "/syllabus/detail/:code",
    element: <SyllabusDetail />,
  },
  {
    path: "/syllabus/create",
    element: <SyllabusCreate />,
  },
  {
    path: "/syllabus/edit/:code",
    element: <SyllabusCreate />,
  },
  {
    path: "/training/list",
    element: <TrainingProgramList />,
  },
  {
    path: "/training/detail/:code",
    element: <TrainingProgramDetail />

  },
  {
    path: "/training/create",
    element: <CreateTrainingProgramList />

  },
  {
    path: "/training/edit/:code",
    element: <EditTrainingProgram />

  },
  {
    path: "/calendar",
    element: <TrainingCalendar />,
  },
  {
    path: "/class",
    element: <ClassListing />,
  },
  {
    path: "/class/detail/:code",
    element: <ClassDetail />,
  },
  {
    path: "/class/edit/:code",
    element: <ClassCreate />,
  },
  {
    path: "/class/create",
    element: <ClassCreate />,
  },
];

export const publicRoute = [
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];
