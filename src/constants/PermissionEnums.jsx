import {
  AddCircleOutline,
  CreateOutlined,
  GradeOutlined,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
export const PermissionEnums = [
  {
    id: "1",
    text: "Access Denied",
    icon: <VisibilityOffOutlined />,
  },
  {
    id: "2",
    text: "View",
    icon: <VisibilityOutlined />,
  },
  {
    id: "4",
    text: "Modify",
    icon: <CreateOutlined />,
  },
  {
    id: "3",
    text: "Create",
    icon: <AddCircleOutline />,
  },
  {
    id: "5",
    text: "Full access",
    icon: <GradeOutlined />,
  },
];
