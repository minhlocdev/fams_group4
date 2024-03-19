import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Box, IconButton } from "@mui/material";
import { Menu, ExpandMoreOutlined } from "@mui/icons-material";
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
import { Collapse, Link } from "@mui/material";
import { ExpandMore } from "../lib/CustomMUI";
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
    to: "",
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
    to: "",
    title: "Tranning Program",
    submenu: [
      {
        to: "/tranning/list",
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
    to: "",
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
    to: "/calendar",
    icon: <CalendarIcon />,
    title: "Training Calendar",
  },
  {
    id: "6",
    icon: <GroupIcon />,
    title: "User Management",
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
export default function MobileSidebar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const [openSubmenu, setOpenSubmenu] = React.useState(null);

  const handleOpenSubmenu = (index) => {
    setOpenSubmenu((prevIndex) => (prevIndex === index ? null : index));
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const DrawerList = (
    <List onClick={() => !open && handleDrawerOpen()}>
      {menus.map((menu, index) => (
        <ListItem
          key={menu.id}
          disablePadding
          sx={{ display: "block" }}
          id={menu.id}
          onClick={() => handleOpenSubmenu(index)}
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

            {open && menu.submenu && (
              <ExpandMore
                expand={openSubmenu === index}
                aria-expanded={openSubmenu === index}
                aria-label="show more"
              >
                <ExpandMoreOutlined />
              </ExpandMore>
            )}
          </ListItemButton>
          <Collapse
            in={openSubmenu === index && menu?.submenu !== undefined}
            timeout="auto"
            unmountOnExit
          >
            {openSubmenu === index && open && (
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
            )}
          </Collapse>
        </ListItem>
      ))}
    </List>
  );
  return (
    <Box
      sx={{
        display: { xs: "block", lg: "none" },
        width: { xs: "fit-content", lg: 0 },
      }}
    >
      <IconButton onClick={toggleDrawer(true)}>
        <Menu
          sx={{
            color: "#fff",
          }}
        />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor={"left"}>
        <img
          className="logo"
          style={{ width: 70, height: 40, margin: "10px auto" }}
          src="/img/logo.png"
          alt="logo fpt"
        />
        {DrawerList}
      </Drawer>
    </Box>
  );
}
