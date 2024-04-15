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
import { ExpandMoreOutlined } from "@mui/icons-material";
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
import { Collapse } from "@mui/material";
import { Link } from "react-router-dom";

const drawerWidth = 256;
const menus = [
  {
    id: "1",
    title: "Home",
    to: "/",
    icon: <HomeIcon />,
  },
  {
    id: "2",
    icon: <BookIcon />,
    to: "#",
    title: "Syllabus",
    submenu: [
      {
        to: "/syllabus",
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
    // select view program -> traningProgramList
    to: "#",
    title: "Training Program",
    submenu: [
      {
        to: "/training",
        id: "1",
        title: "View Program",
      },
      {
        to: "/training/create",
        id: "2",
        title: "Create Program",
      },
    ],
  },
  {
    id: "4",
    icon: <SchoolIcon />,
    to: "#",
    title: "Class",
    submenu: [
      {
        id: "1",
        to: "/class",
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
    to: "/training/calendar",
    icon: <CalendarIcon />,
    title: "Training Calendar",
  },
  {
    id: "6",
    icon: <GroupIcon />,
    title: "User Management",
    to: "#",
    submenu: [
      {
        to: "/user",
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

const ExpandMoreIcon = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Sidebar({ open, setOpen }) {
  const theme = useTheme();
  const [openSubmenu, setOpenSubmenu] = React.useState(null);

  const handleOpenSubmenu = (index) => {
    setOpenSubmenu((prevIndex) => (prevIndex === index ? null : index));
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: { xs: "none", lg: "flex" } }}>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .css-12i7wg6-MuiPaper-root-MuiDrawer-paper": {
            backgroundColor: "#EDF2F7",
          },
        }}
      >
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
              onClick={() => handleOpenSubmenu(index)}
            >
              <Link
                to={menu.to === "" ? "#" : menu.to}
                style={{
                  textDecoration: "none",
                  color: "#000",
                }}
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
                    {menu.title}
                  </ListItemText>

                  {open && menu.submenu && (
                    <ExpandMoreIcon
                      expand={openSubmenu === index}
                      aria-expanded={openSubmenu === index}
                      aria-label="show more"
                    >
                      <ExpandMoreOutlined />
                    </ExpandMoreIcon>
                  )}
                </ListItemButton>
              </Link>
              <Collapse
                in={openSubmenu === index && menu?.submenu !== undefined}
                timeout="auto"
                unmountOnExit
              >
                <List>
                  {menus.at(index)?.submenu?.map((item) => (
                    <ListItem
                      key={item.id}
                      disablePadding={true}
                      sx={{
                        display: "block",
                        transition: "max-height 0.3s ease",
                      }}
                      id={item.id}
                      style={{
                        maxHeight: openSubmenu === index ? "45px" : "0",
                        overflow: "hidden",
                      }}
                    >
                      <Link
                        to={item.to}
                        style={{
                          textDecoration: "none",
                          color: "#000",
                        }}
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
                              color: "#000",
                              textDecoration: "none",
                              marginLeft: "60px",
                            }}
                          >
                            {item.title}
                          </ListItemText>
                        </ListItemButton>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
