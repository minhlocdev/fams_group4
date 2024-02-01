import { lazy } from "react"
import AppContainer from "../components/shared/layout/AppContainer"

const UserManagement = lazy(() => import('../pages/UserManagement'))
const SyllabusListing = lazy(() => import('../pages/SyllabusListing'))
const SyllabusDetail = lazy(() => import('../pages/SyllabusDetail'))
const TranningProgramList = lazy(() => import('../pages/TranningProgramList'))


export const privateRoute = [
    {},
]

export const publicRoute = [
    {
        path: "/",
        element: <AppContainer />,
    },
    {
        path: "/user",
        element: <UserManagement />,
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
        path: "/tranning/list",
        element: <TranningProgramList />,
    },
]