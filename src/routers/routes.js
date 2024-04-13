import { lazy } from "react";
import SyllabusCreate from "../pages/SyllabusCreate";
import CreateTrainingProgramList from "../pages/CreateTrainingProgram";
import ClassCreate from "../pages/ClassCreate";
import LoginPage from "../pages/LoginPage";
import NotFoundPage from "../pages/NotFoundPage";
import UnauthorizePage from "../pages/UnauthorizePage";
const EditTrainingProgram = lazy(() => import("../pages/EditTrainingProgram"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
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
const UserProfile = lazy(() => import("../pages/Profile/UserProfile"))

export const privateRoute = [
  {
    path: "/user",
    element: <UserManagement />,
    level: 2,
  }, {
    path: "/user/detail/:code",
    element: <UserDetail />,
    level: 2,
  },
  {
    path: "/user/profile/:code",
    element: <UserProfile />,
    level: 2,
  },
  {
    path: "/user/permission",
    element: <UserPermission />,
    level: 5,
  },
  {
    path: "/syllabus",
    element: <SyllabusListing />,
    level: 2,
  },
  {
    path: "/syllabus/detail/:code",
    element: <SyllabusDetail />,
    level: 2,
  },
  {
    path: "/syllabus/create",
    element: <SyllabusCreate />,
    level: 3,
  },
  {
    path: "/syllabus/edit/:code",
    element: <SyllabusCreate />,
    level: 4
  },
  {
    path: "/training",
    element: <TrainingProgramList />,
    level: 2,
  },
  {
    path: "/training/detail/:code",
    element: <TrainingProgramDetail />,
    level: 2
  },
  {
    path: "/training/create",
    element: <CreateTrainingProgramList />,
    level: 3,
  },
  {
    path: "/training/edit/:code",
    element: <EditTrainingProgram />,
    level: 4
  },
  {
    path: "/training/calendar",
    element: <TrainingCalendar />,
    level: 2
  },
  {
    path: "/class",
    element: <ClassListing />,
    level: 2
  },
  {
    path: "/class/detail/:code",
    element: <ClassDetail />,
    level: 2
  },
  {
    path: "/class/edit/:code",
    element: <ClassCreate />,
    level: 4
  },
  {
    path: "/class/create",
    element: <ClassCreate />,
    level: 3
  },
];

export const publicRoute = [
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/unauthorize",
    element: <UnauthorizePage />,
  },
];
