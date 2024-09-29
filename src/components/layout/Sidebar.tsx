import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ReactElement, ReactNode, useState } from "react";
import { MenuIcon } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/images/MBooking.png";
import { CgProfile } from "react-icons/cg";
import { TbBrandBooking } from "react-icons/tb";
import {
  MdExpandLess,
  MdExpandMore,
  MdMeetingRoom,
  MdMenu,
  MdMenuOpen,
} from "react-icons/md";

import "../../styles/sidebar/side.css";
import { Collapse } from "@mui/material";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { PiBookmarksSimpleFill } from "react-icons/pi";

const drawerWidth = 220;

type TMenu = {
  text?: string;
  path?: string | string[];
  icon?: ReactElement;
  child?: TMenu[];
};

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
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
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

const Sidebar = ({
  children,
  role,
}: {
  children: ReactNode;
  role: string | undefined;
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleClick = (index: number | null) => {
    setDrawerOpen(true);
    // Toggle: if clicked item is already open, close it; otherwise, open it
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    handleClick(null);
    setDrawerOpen(false);
  };

  const location = useLocation();

  const userMenu = [
    { text: "Profile", path: "/dashboard/profile", icon: <CgProfile /> },
    {
      text: "My Bookings",
      path: "/dashboard/my-bookings",
      icon: <TbBrandBooking />,
    },
  ];

  const adminMenu = [
    { text: "Profile", path: "/dashboard/profile", icon: <CgProfile /> },
    {
      text: "Room Management",
      icon: <MdMeetingRoom />,
      path: ["/dashboard/create-room", "/dashboard/rooms"],
      child: [
        {
          text: "Create Room",
          path: "/dashboard/create-room",
        },
        {
          text: "All Rooms",
          path: "/dashboard/rooms",
        },
      ],
    },
    {
      text: "Slot Management",
      icon: <RiCalendarScheduleLine />,
      path: ["/dashboard/create-slot", "/dashboard/slots"],
      child: [
        {
          text: "Create Slot",
          path: "/dashboard/create-slot",
        },
        {
          text: "All slots",
          path: "/dashboard/slots",
        },
      ],
    },
    {
      text: "Booking Management",
      path: "/dashboard/booking-management",
      icon: <PiBookmarksSimpleFill />,
    },
  ];

  let mainMenu: Partial<TMenu>[] = [];

  if (role) {
    mainMenu = role === "admin" ? adminMenu : userMenu;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        sx={{
          backgroundColor: "white",
          color: "black",
          padding: "8px",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        }}
        position="fixed"
        open={drawerOpen}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              drawerOpen && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="button" noWrap component="button">
            <NavLink to="/">
              <img className="w-20 h-10 md:w-32 md:h-16" src={logo} alt="" />
            </NavLink>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={drawerOpen}>
        <DrawerHeader
          sx={{
            padding: "20px",
          }}
        >
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <MdMenu style={{ color: "black" }} />
            ) : (
              <MdMenuOpen style={{ color: "black" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <List>
          {mainMenu.map((menu, index) => {
            if (!menu?.child) {
              return (
                <ListItem key={index} disablePadding sx={{ display: "block" }}>
                  <NavLink to={menu?.path as string}>
                    <ListItemButton
                      className={`${
                        location.pathname === menu?.path ? "side-marked" : ""
                      }`}
                      sx={[
                        {
                          minHeight: 48,
                          px: 2.5,
                        },
                        drawerOpen
                          ? {
                              justifyContent: "initial",
                            }
                          : {
                              justifyContent: "center",
                            },
                      ]}
                    >
                      <ListItemIcon
                        className={`${
                          location.pathname === menu?.path ? "side-marked" : ""
                        }`}
                        sx={[
                          {
                            minWidth: 0,
                            justifyContent: "center",
                          },
                          drawerOpen
                            ? {
                                mr: 1,
                              }
                            : {
                                mr: "auto",
                              },
                        ]}
                      >
                        {menu?.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={menu?.text}
                        sx={[
                          drawerOpen
                            ? {
                                opacity: 1,
                              }
                            : {
                                opacity: 0,
                              },
                        ]}
                      />
                    </ListItemButton>
                  </NavLink>
                </ListItem>
              );
            } else {
              return (
                <>
                  <ListItem
                    key={index}
                    disablePadding
                    sx={{ display: "block" }}
                  >
                    <ListItemButton
                      onClick={() => {
                        handleClick(index);
                      }}
                      className={`${
                        menu?.path?.includes(location.pathname)
                          ? "side-marked"
                          : ""
                      }`}
                      sx={[
                        {
                          minHeight: 48,
                          px: 2.5,
                        },
                        drawerOpen
                          ? {
                              justifyContent: "initial",
                            }
                          : {
                              justifyContent: "center",
                            },
                      ]}
                    >
                      <ListItemIcon
                        className={`${
                          menu?.path?.includes(location.pathname)
                            ? "side-marked"
                            : ""
                        }`}
                        sx={[
                          {
                            minWidth: 0,
                            justifyContent: "center",
                          },
                          drawerOpen
                            ? {
                                mr: 1,
                              }
                            : {
                                mr: "auto",
                              },
                        ]}
                      >
                        {menu?.icon}
                      </ListItemIcon>
                      <ListItemText
                        sx={[
                          drawerOpen
                            ? {
                                opacity: 1,
                              }
                            : {
                                opacity: 0,
                              },
                        ]}
                      >
                        {menu?.text}{" "}
                        {openIndex === index ? (
                          <MdExpandLess className="inline" />
                        ) : (
                          <MdExpandMore className="inline" />
                        )}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                  <Collapse
                    in={openIndex === index}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List>
                      {menu?.child?.map((ch) => (
                        <ListItem
                          key={ch?.text}
                          disablePadding
                          sx={{ display: "block" }}
                        >
                          <NavLink to={ch?.path as string}>
                            <ListItemButton
                              onClick={() => {
                                menu.path = ch?.path;
                              }}
                              className={`${
                                location.pathname === ch?.path
                                  ? "child-marked"
                                  : ""
                              }`}
                              sx={[
                                {
                                  minHeight: 48,
                                  px: 2.5,
                                },
                                drawerOpen
                                  ? {
                                      justifyContent: "initial",
                                    }
                                  : {
                                      justifyContent: "center",
                                    },
                              ]}
                            >
                              <ListItemText
                                primary={ch?.text}
                                sx={[
                                  {
                                    textAlign: "center",
                                  },
                                  drawerOpen
                                    ? {
                                        opacity: 1,
                                      }
                                    : {
                                        opacity: 0,
                                      },
                                ]}
                              />
                            </ListItemButton>
                          </NavLink>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </>
              );
            }
          })}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default Sidebar;
