import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import PaymentsIcon from '@mui/icons-material/Payments';

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';

// import Home from "./components/Home";
import EmployeeList from "./components/employee/EmployeeList";
import EmployeeCreate from "./components/employee/EmployeeCreate";
import EmployeeUpdate from "./components/employee/EmployeeUpdate";

import PatientSchedule from "./components/patienschedulcompo/PatientSchedule";
import PatientScheduleHome from "./components/patienschedulcompo/PatienScheduleHome";

import DentistScheduleCreate from "./components/dentistschedule/DentistScheduleCreate";
import DentistSchedule from "./components/dentistschedule/DentistSchedule";

import CreateMedicalDevice from "./components/MedialDevice/CreateMedicalDevice";
import MedicalDeviceList from "./components/MedialDevice/MedicalDeviceList";

import PatientList from "./components/patient/PatientList";
import PatientCreate from "./components/patient/PatientCreate";

import Dentists from "./components/dentist/DentistsList"; 
import DentistCreate from "./components/dentist/DentistCreate";

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';

import Treatment from "./components/treatment/Treatment";
import TreatmentCreate from "./components/treatment/TreatmentCreate";
import TreatmentUpdate from "./components/treatment/TreatmentUpdate";

import Treatment_plan from "./components/treatment_plan/Treatment_plan";
import TreatmentPlanCreate from "./components/treatment_plan/TreatmentPlanCreate";
import TreatmentPlanUpdate from "./components/treatment_plan/TreatmentPlanUpdate";

import PrescriptionList from "./components/prescription/PrescriptionList";
import PrescriptionCreate from "./components/prescription/PrescriptionCreate";

import PaymentList from "./components/payment/PaymentList";



// import Students from "./components/Student";
// import StudentCreate from "./components/StudentCreate";
// import SignIn from "./components/SignIn";

const drawerWidth = 240;


interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

const menu = [
  { name: "หน้าแรก", icon: <HomeIcon />, path: "/" ,},
  { name: "พนักงาน", icon: <PeopleIcon />, path: "/employees" ,},
  { name: "ผู้ป่วย", icon: <PeopleIcon />, path: "/patients" ,},
  { name: "เครื่องมือแพทย์", icon: <BuildCircleIcon />, path: "/MedicalDevice" ,},
  { name: "ตารางนัดผู้ป่วย", icon: <CalendarMonthIcon />, path: "/PatientSchedule/home" ,},
  { name: "ตารางงานแพทย์", icon: <WorkHistoryIcon />, path: "/DentistSchedule/home" ,},
  { name: "การรักษา", icon: <WorkHistoryIcon />, path: "/treatmentlistshow" ,},
  { name: "แผนการรักษา", icon: <WorkHistoryIcon />, path: "/treatmentplanlistshow" ,},
  { name: "สั่งจ่ายยา", icon: <MedicationLiquidIcon />, path: "/prescription" ,},
  { name: "จัดการข้อมูลแพทย์", icon: <PersonAddAltRoundedIcon />, path: "/dentists" ,},
  { name: "แจ้งยอดชำระ", icon: <PaymentsIcon />, path: "/payment" ,},

];

function App() {
  const [token, setToken] = useState<String>("");
  const [open, setOpen] = React.useState(true);
  //รับ Position
  const [position, setPosition] = useState<String | null>("");

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const position = localStorage.getItem("position");

    if (token) {
      setToken(token);
      setPosition(position);
    }
  }, []);

  // if (!token) {  //pass token
  //   return <SignIn />;
  // }

  const signout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <Router>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar position="absolute" open={open}>
            <Toolbar
              sx={{
                pr: "24px", // keep right padding when drawer closed
              }}
            >
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: "36px",
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Team09-ระบบทันตกรรม
              </Typography>
              <Button color="inherit" onClick={signout}>
                ออกจากระบบ
              </Button>
            </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                px: [1],
              }}
            >
              <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
              </IconButton>
            </Toolbar>
            <Divider />
            <List>
              {menu.map((item, index) => 
                
                <Link
                  to={item.path}
                  key={item.name}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem button>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItem>
                </Link>
              )}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Routes>
                {/* <Route path="/" element={<Home />} /> */}
                <Route path="/patients" element={<PatientList />} />
                <Route path="/patients/create" element={<PatientCreate />} />
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/employee/create" element={<EmployeeCreate />} />
                <Route path="/employee_update/:id" element={<EmployeeUpdate />} />
                <Route path="/PatientSchedule/create" element={<PatientSchedule />} />
                <Route path="/PatientSchedule/home" element={<PatientScheduleHome />} />
                <Route path="/DentistSchedule/create" element={<DentistScheduleCreate />} />
                <Route path="/DentistSchedule/home" element={<DentistSchedule />} />
                <Route path="/MedicalDevice/create" element={<CreateMedicalDevice />} />
                <Route path="/MedicalDevice" element={<MedicalDeviceList />} />
                <Route path="/treatmentlistshow" element={<Treatment />} />
                <Route path="/treatmentscreate" element={<TreatmentCreate />} />
                <Route path="/treatmentupdate" element={<TreatmentUpdate />} />
                <Route path="/treatmentsupdate/:id" element={<TreatmentUpdate />} />
                <Route path="/treatmentplanlistshow" element={<Treatment_plan />} />
                <Route path="/treatment_plan_create" element={<TreatmentPlanCreate />} />
                <Route path="/treatmentplan_update/:id" element={<TreatmentPlanUpdate />} />         
                <Route path="/dentists" element={<Dentists />} />
                <Route path="/dentist/create" element={<DentistCreate />} />
                <Route path="/prescription" element={<PrescriptionList />} />
                <Route path="/prescription/create" element={<PrescriptionCreate />} />
                <Route path="/payment" element={<PaymentList />} />
              </Routes>
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;