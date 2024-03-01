import { lazy } from "react"
import Dashboard from "../components/Dashboard"
import LoginPage from "../components/LoginPage"
import SyllabusCreate from "../pages/SyllabusCreate"
import AppContainer from "../components/shared/layout/AppContainer"
import CreateTranningProgramList from "../pages/CreateTrainingProgram"
import ClassCreate from "../pages/ClassCreate"
const ClassDetail = lazy(() => import("../pages/ClassDetail"))
const ClassListing = lazy(() => import("../pages/ClassListing"))
const UserPermission = lazy(() => import("../pages/UserPermission"))



const UserManagement = lazy(() => import('../pages/UserManagement'))
const SyllabusListing = lazy(() => import('../pages/SyllabusListing'))
const SyllabusDetail = lazy(() => import('../pages/SyllabusDetail'))
const TrainingProgramList = lazy(() => import('../pages/TrainingProgramList'))
const TrainingCalendar = lazy(() => import('../pages/TrainingCalendar'))
const TrainingProgramDetail = lazy(() => import('../pages/TrainingProgramDetail'))


export const privateRoute = [
    {},
]

export const publicRoute = [
    {
        path: "/",
        element: <Dashboard />,
    }, {
        path: "/login",
        element: <LoginPage />,
    },
    {
        path: "/user",
        element: <UserManagement />,
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
        path: "/tranning/list",
        element: <TrainingProgramList />,
    },
    {
        path: "/tranning/detail/:code",
        element: <TrainingProgramDetail />

    },
    {
        path: "/tranning/create",
        element: <CreateTranningProgramList />

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
    }, {
        path: "/class/create",
        element: <ClassCreate />,
    },
]