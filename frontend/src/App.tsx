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
import CoPresentIcon from '@mui/icons-material/CoPresent';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';

import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import PersonAddAltRoundedIcon from '@mui/icons-material/PersonAddAltRounded';
import HandymanIcon from '@mui/icons-material/Handyman';

import Home from "./components/Home";
import SignIn from "./components/SignIn";

import EmployeeList from "./components/employee/EmployeeList";
import EmployeeCreate from "./components/employee/EmployeeCreate";
import EmployeeUpdate from "./components/employee/EmployeeUpdate";

import PatientSchedule from "./components/patienschedulcompo/PatientSchedule";
import PatientScheduleHome from "./components/patienschedulcompo/PatienScheduleHome";
import PatientScheduleUpdate from "./components/patienschedulcompo/PatientScheduleUpdate";

import DentistScheduleCreate from "./components/dentistschedule/DentistScheduleCreate";
import DentistSchedule from "./components/dentistschedule/DentistSchedule";
import DentistScheduleUpdate from "./components/dentistschedule/DentistScheduleUpdate";

import CreateMedicalDevice from "./components/MedicalDevice/CreateMedicalDevice"
import MedicalDeviceList from "./components/MedicalDevice/MedicalDeviceList";

import PatientList from "./components/patient/PatientList";
import PatientCreate from "./components/patient/PatientCreate";
import PatientUpdate from "./components/patient/PatientUpdate";

import Dentists from "./components/dentist/DentistsList"; 
import DentistCreate from "./components/dentist/DentistCreate";
import DentistUpdate from "./components/dentist/DentistUpdate";

import Room_Details from "./components/room/Room_DetailList";
import Room_DetailCreate from "./components/room/Room_DetailCreate";

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
import PrescriptionUpdate from "./components/prescription/PrescriptionUpdate";

import PaymentList from "./components/payment/PaymentList";
import PaymentCreate from "./components/payment/PaymentCreate";
import PaymentUpdate from "./components/payment/PaymentUpdate";

import CreateRepair from "./components/repair/CreateRepair";
import RepairList from "./components/repair/RepairList";
import RepairUpdate from "./components/repair/RepairUpdate";


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
    background : '#FEC8D8',
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
  { name: "หน้าแรก", icon: <HomeIcon />, path: "/Home" , role: "Admin"},
  { name: "หน้าแรก", icon: <HomeIcon />, path: "/Home" , role: "Nurse"},
  { name: "หน้าแรก", icon: <HomeIcon />, path: "/Home" , role: "Dentist"},

  { name: "พนักงาน", icon: <PeopleIcon htmlColor="#7B68EE" />, path: "/employees" ,  role: "Admin"},

  { name: "ผู้ป่วย", icon: <PeopleIcon htmlColor="#7B68EE"/>, path: "/patients" ,   role: "Dentist" },
  { name: "ผู้ป่วย", icon: <PeopleIcon htmlColor="#7B68EE"/>, path: "/patients" ,   role: "Nurse" },

  { name: "เครื่องมือแพทย์", icon: <BuildCircleIcon />, path: "/MedicalDevice" ,  role: "Admin"},

  { name: "แจ้งซ่อมเครื่องมือแพทย์", icon: <HandymanIcon />, path: "/Repair" ,  role: "Dentist"},
  { name: "แจ้งซ่อมเครื่องมือแพทย์", icon: <HandymanIcon />, path: "/Repair" ,  role: "Nurse"},

  { name: "ตารางนัดผู้ป่วย", icon: <CalendarMonthIcon />, path: "/PatientSchedule/home" , role: "Dentist"},
  { name: "ตารางนัดผู้ป่วย", icon: <CalendarMonthIcon />, path: "/PatientSchedule/home" , role: "Nurse"},

  { name: "ตารางงานแพทย์", icon: <WorkHistoryIcon />, path: "/DentistSchedule/home" ,  role: "Dentist"},
  { name: "ตารางงานแพทย์", icon: <WorkHistoryIcon />, path: "/DentistSchedule/home" ,  role: "Nurse"},

  { name: "การรักษา", icon: <MedicalServicesIcon />, path: "/treatmentlistshow" ,  role: "Dentist"},

  { name: "แผนการรักษา", icon: <PlaylistAddCheckIcon />, path: "/treatmentplanlistshow" ,  role: "Dentist"},

  { name: "สั่งจ่ายยา", icon: <MedicationLiquidIcon />, path: "/prescription" , role: "Dentist"},
  { name: "สั่งจ่ายยา", icon: <MedicationLiquidIcon />, path: "/prescription" , role: "Nurse"},

  { name: "จัดการข้อมูลทันตแพทย์", icon: <PersonAddAltRoundedIcon />, path: "/dentists" ,   role: "Admin"},

  { name: "จัดการข้อมูลห้อง", icon: <BuildCircleIcon />, path: "/room_details" ,  role: "Admin"},

  { name: "แจ้งยอดชำระ", icon: <PaymentsIcon />, path: "/payment" , role: "Admin"},

];

function App() {
  const [token, setToken] = useState<String>("");
  const [open, setOpen] = React.useState(true);

  //รับ Role
  const [role, setRole] = useState<String | null>("");  

  const toggleDrawer = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token) {
      setToken(token);
      setRole(role); 
    }
  }, []);

  if (!token) {  //pass token
    return <SignIn />;
  }

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
                background : '#FEC8D8',
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
                color="#00008B"
                noWrap
                sx={{ flexGrow: 1 }}
              >
                Team09-ระบบทันตกรรม
              </Typography>
              <Button  color="inherit" onClick={signout} startIcon={<LogoutSharpIcon />}>
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
                role === item.role && (
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
              ))}
            </List>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              background : '#FFF0F5',
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Routes>
                <Route path="/Home" element={<Home />} />
                <Route path="/patients" element={<PatientList />} />
                <Route path="/patients/create" element={<PatientCreate />} />
                <Route path="/patients_update/:id" element={<PatientUpdate />} />
                <Route path="/employees" element={<EmployeeList />} />
                <Route path="/employee/create" element={<EmployeeCreate />} />
                <Route path="/employee_update/:id" element={<EmployeeUpdate />} />
                <Route path="/PatientSchedule/create" element={<PatientSchedule />} />
                <Route path="/PatientSchedule/home" element={<PatientScheduleHome />} />
                <Route path="/PatientSchedule/Update/:id" element={<PatientScheduleUpdate />} />
                <Route path="/DentistSchedule/create" element={<DentistScheduleCreate />} />
                <Route path="/DentistSchedule/home" element={<DentistSchedule />} />
                <Route path="/DentistSchedule/Update/:id" element={<DentistScheduleUpdate />} />
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
                <Route path="/dentist_update/:id" element={<DentistUpdate />} />
                <Route path="/room_details" element={<Room_Details />} />
                <Route path="/room_detail/create" element={<Room_DetailCreate />} />
                <Route path="/prescription" element={<PrescriptionList />} />
                <Route path="/prescription/create" element={<PrescriptionCreate />} />
                <Route path="/prescription/update/:id" element={<PrescriptionUpdate />} />
                <Route path="/payment" element={<PaymentList />} />
                <Route path="/payment/create" element={<PaymentCreate />} />
                <Route path="/payment/update/:id" element={<PaymentUpdate />} />
                <Route path="/Repair/create" element={<CreateRepair />} />
                <Route path="/Repair" element={<RepairList />} />
                <Route path="/Repair/update/:id" element={<RepairUpdate />} />
            </Routes>
            </Container>
        </Box>
        </Box>
      </ThemeProvider>
    </Router>
  );
}

export default App;