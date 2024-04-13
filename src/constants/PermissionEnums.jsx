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
    allow: [],
  },
  {
    id: "2",
    text: "View",
    icon: <VisibilityOutlined />,
    allow: ["view", "detail"],
  },
  {
    id: "3",
    text: "Create",
    icon: <AddCircleOutline />,
    allow: ["view", "create", "detail"],
  },
  {
    id: "4",
    text: "Modify",
    icon: <CreateOutlined />,
    allow: ["view", "create", "edit", "detail", "change status"],
  },
  {
    id: "5",
    text: "Full access",
    icon: <GradeOutlined />,
    allow: ["view", "create", "edit", "detail", "change status", "delete"],
  },
];

export const PermissionRoleEnums = [
  { roleName: "Class Admin", id: "AD" },
  { roleName: "Trainer", id: "TR" },
  { roleName: "Super Admin", id: "SA" },
];
