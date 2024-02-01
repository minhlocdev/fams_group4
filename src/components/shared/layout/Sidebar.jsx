import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  HomeIcon,
  Biotech,
  BookIcon,
  CalendarIcon,
  FolderIcon,
  GroupIcon,
  SchoolIcon,
  SettingIcon,
} from "../../../assets/icon";
import { Link } from "@mui/material";

const drawerWidth = 256;
const menus = [
  {
    id: "1",
    title: "Home",
    to: "/home",
    icon: <HomeIcon />,
  },
  {
    id: "2",
    icon: <BookIcon />,
    to: "/syllabus",
    title: "Syllabus",
    submenu: [
      {
        to: "/syllabus/view",
        id: "1",
        title: "View Syllabus",
      },
      {
        to: "/syllabus/create",
        id: "2",
        title: "Create Syllabus",
      },
    ],
  },
  {
    id: "3",
    icon: <Biotech />,
    to: "/tranning/list",
    title: "Tranning Program",
    submenu: [
      {
        to: "/tranning/view",
        id: "1",
        title: "View Program",
      },
      {
        to: "/tranning/create",
        id: "2",
        title: "Create Program",
      },
    ],
  },
  {
    id: "4",
    icon: <SchoolIcon />,
    to: "/class",
    title: "Class",
    submenu: [
      {
        id: "1",
        to: "/class/view",
        title: "View Class",
      },
      {
        to: "/class/create",
        id: "2",
        title: "Create Class",
      },
    ],
  },
  {
    id: "5",
    to: "/calendar",
    icon: <CalendarIcon />,
    title: "Tranning Calendar",
  },
  {
    id: "6",
    to: "/user/list",
    icon: <GroupIcon />,
    title: "User Management",
    submenu: [
      {
        to: "/user/list",
        id: "1",
        title: "User List",
      },
      {
        to: "/user/permission",
        id: "2",
        title: "User Permission",
      },
    ],
  },
  {
    id: "7",
    icon: <FolderIcon />,
    title: "Learning Materials",
  },
  {
    id: "8",
    icon: <SettingIcon />,
    title: "Settings",
    submenu: [
      {
        id: "1",
        title: "Calendar",
      },
    ],
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignsubmenu: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(1, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
  zIndex: 0,
}));
const SubMenu = ({ index, isOpen }) => {
  return (
    <List>
      {menus.at(index).submenu.map((item) => (
        <ListItem
          key={item.id}
          disablePadding={true}
          sx={{
            display: "block",
            transition: "max-height 0.3s ease",
          }}
          id={item.id}
          style={{ maxHeight: isOpen ? "45px" : "0", overflow: "hidden" }}
        >
          <ListItemButton
            sx={{
              minHeight: 30,
              px: 2.5,
            }}
          >
            <ListItemText
              sx={{
                opacity: 1,
                textAlign: "left",
                marginLeft: "60px",
              }}
            >
              <Link
                href={item.to}
                sx={{
                  textDecoration: "none",
                  color: "#000",
                }}
              >
                {item.title}
              </Link>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};

export default function Sidebar({ open, setOpen }) {
  const theme = useTheme();
  const [openSubmenu, setOpenSubmenu] = React.useState(-1);
  const handleOpenSubmenu = (i) => {
    setOpenSubmenu(i);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: "flex" }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader></DrawerHeader>
        <Divider />
        {open && (
          <IconButton onClick={handleDrawerClose} sx={{ marginRight: "auto" }}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon sx={{ mx: 1 }} />
            ) : (
              <ChevronLeftIcon sx={{ mx: 1 }} />
            )}
          </IconButton>
        )}
        {!open && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              margin: "0 auto",
            }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <List onClick={() => !open && handleDrawerOpen()}>
          {menus.map((menu, index) => (
            <ListItem
              key={menu.id}
              disablePadding
              sx={{ display: "block" }}
              id={menu.id}
              onClick={() =>
                openSubmenu !== index && menu.submenu
                  ? handleOpenSubmenu(index)
                  : handleOpenSubmenu(-1)
              }
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {menu.icon}
                </ListItemIcon>
                <ListItemText
                  sx={{
                    opacity: open ? 1 : 0,
                    textDecoration: "none",
                    color: "#000",
                  }}
                >
                  <Link
                    href={menu.to}
                    sx={{
                      textDecoration: "none",
                      color: "#000",
                    }}
                  >
                    {menu.title}
                  </Link>
                </ListItemText>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    ml: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {open &&
                    menu.submenu &&
                    (openSubmenu === index ? <ExpandLess /> : <ExpandMore />)}
                </ListItemIcon>
              </ListItemButton>
              {openSubmenu === index && open && (
                <SubMenu index={index} isOpen={openSubmenu} />
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
