import React, { useEffect, useState } from "react";
import { EmployeeInterface } from "../../models/IEmployee";
import { DamageLevelInterface } from "../../models/IDamageLevel";
import { RepairInterface } from "../../models/IRepair";
import { MedicalDeviceInterface } from "../../models/IMedicaldevice";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Snackbar, Select, Typography, Button, FormGroup, Checkbox, FormControlLabel } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Link as RouterLink } from "react-router-dom";
//import { GetAdminByID } from "../services/HttpClientService";

//api
import {
    GetDamageLevel,
    GetMedicalDevice,
    GetEmployee,
    CreateRepair
  } from '../../services/HttpClientService';

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  })
  
  function Repair() {
    const [repair, setRepair] = useState<RepairInterface>({});
    const [damageLevel, setDamageLevel] = useState<DamageLevelInterface[]>([]);
    const [employee, setEmployee] = useState<EmployeeInterface[]>([]);
    const [medicaldevice, setMedicalDevice] = useState<MedicalDeviceInterface[]>([]);
    // const [admin, setAdmin] = useState<Partial<AdminInterface>>({ Name: "" });
    const [success, setSuccess] = useState(false);
    const [date] = useState<Date | null>(new Date());
    const [error, setError] = useState(false);
    const [message, setAlertMessage] = React.useState("");
  
    const handleClose = (
      event?: React.SyntheticEvent | Event,
      reason?: string
    ) => {
      if (reason === "clickaway") {
        return;
      }
      setSuccess(false);
      setError(false);
    };
  
    const handleChange = (event: SelectChangeEvent) => {
      const name = event.target.name as keyof typeof repair;
      console.log(name)
      setRepair({
        ...repair,
        [name]: event.target.value,
      });
    };
  
    const handleInputChange = (event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
      const id = event.target.id as keyof typeof Repair;
      const { value } = event.target;
      setRepair({ ...repair, [id]: value });
    };
  
    // fetch POST
    const fetchDamageLevel = async () => {
      let res = await GetDamageLevel();
      res && setDamageLevel(res);
    };
  
    const fetchMedicalDevice = async () => {
      let res = await GetMedicalDevice();
      res && setMedicalDevice(res);
    };
  
    const convertType = (data: string | number | undefined) => {
      let val = typeof data === "string" ? parseInt(data) : data;
      return val;
    };
  
    //ทดสอบข้อมูล
    const fetchEmployees = async () => {
      let res = await GetEmployee();
      res && setEmployee(res);
    };
  
    // insert data to db
    const submit = async () => {
      let data = {
        EmployeeID: convertType(repair.EmployeeID),
        MedicalDeviceID: convertType(repair.MedicalDeviceID),
        DamageLevelID: convertType(repair.DamageLevelID),
        Repair_Note: repair.Repair_Note,
        Date_Of_Repair: date,
      };
  
      console.log("data", data)
  
      let res = await CreateRepair(data);
      if (res.status) {
        setAlertMessage("บันทึกข้อมูลสำเร็จ");
        setSuccess(true);
      } else {
        setAlertMessage(res.message);
        setError(true);
      }
      // window.location.href = "/MedicalDevice"
    };
  
    useEffect(() => {
      fetchMedicalDevice();
      fetchDamageLevel();
      fetchEmployees();
      //fetchEmployeeID();
    }, []);

    return (
        <div>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                mt: 2
              }}
            >
              <Snackbar
                id="success"
                open={success}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <Alert onClose={handleClose} severity="success">
                  {message}
                </Alert>
              </Snackbar>
    
              <Snackbar
                id="error"
                open={error}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <Alert onClose={handleClose} severity="error">
                  {message}
                </Alert>
              </Snackbar>
    
              <Typography
                variant="h4"
                style={{ textAlign: "center", color: "#333" }}
              >
                Repair
              </Typography>
              <hr style={{ width: "400px", opacity: "0.5" }} />
              
              {/*Employee ID รอดึงข้อมูลจากผูู้ login*/ }
              <Box
                sx={{
                  display: "flex",
                  mt: 2,
                }}
              >
                <Box
                  sx={{
                    width: "400px"
                  }}
                >
                  <Select
                    native
                    fullWidth
                    value={repair.EmployeeID + ""}
                    onChange={handleChange}
                    inputProps={{
                      name: "EmployeeID",
                    }}
                  >
                    <option aria-label="None" value="">
                      Employee
                    </option>
                    {employee.map((item: EmployeeInterface) => (
                      <option value={item.ID}>{item.ID}</option>
                    ))}
                  </Select>
                </Box>
              </Box>
    
              {/*MeaicalDevice ID*/}
              <Box
                sx={{
                  display: "flex",
                  mt: 2,
                }}
              >
                <Box
                  sx={{
                    width: "400px"
                  }}
                >
                  <Select
                    native
                    fullWidth
                    value={repair.MedicalDeviceID + ""}
                    onChange={handleChange}
                    inputProps={{
                      name: "MedicalDeviceID",
                    }}
                  >
                    <option aria-label="None" value="">
                      MedicalDevice
                    </option>
                    {medicaldevice.map((item: MedicalDeviceInterface) => (
                      <option value={item.ID}>{item.Device_Name}</option>
                    ))}
                  </Select>
                </Box>
              </Box>
    
              {/*DamageLevel*/}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  // gap: "2rem",
                  mt: 2,
                }}>
                <Box
                  sx={{
                    width: "400px"
                  }}>
                  <Select
                    native
                    fullWidth
                    value={repair.DamageLevelID + ""}
                    onChange={handleChange}
                    inputProps={{
                      name: "DamageLevelID",
                    }}
                  >
                    <option aria-label="None" value="">
                      DamageLevel
                    </option>
                    {damageLevel.map((item: DamageLevelInterface) => (
                      <option value={item.ID}>{item.Damage_Choice}</option>
                    ))}
                  </Select>
                </Box>
              </Box>
    
              {/*Repair_Note*/}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  // gap: "2rem",
                  mt: 2,
                }}>
                <TextField
                  id="Repair_Note"
                  name="Repair_Note"
                  value={repair.Repair_Note}
                  onChange={handleInputChange}
                  //multiline
                  placeholder="Repair Note" //ข้อความข้างใน
                  minRows={8}
                  sx={{
                    fontSize: "1.5rem",
                    Width: "400px",
                    //minHeight: 200,
                  }}
                />
              </Box>
    
              {/* Date */}
              {/* <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  // gap: "2rem",
                  mt: 2,
                }}>
                <Box
                  sx={{
                    width: "400px"
                  }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                      renderInput={(props) => <TextField
                        required
                        fullWidth
                        {...props} />}
                      label="TimeStamp"
                      value={date}
                      onChange={(newValue) => {
                        setDate(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Box>
              </Box> */}
    
              {/* Btn submit and back */}
              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Button
                   component={RouterLink}
                   to="/repair"
                   variant="contained"
                   color="error"
                >
                  Back
                </Button>
    
                <Button
                  style={{ fontSize: "1rem", marginLeft: 100 }}
                  onClick={submit}
                  variant="contained"
                  color="primary"
                >
                  Repair
                </Button>
              </Box>
            </Box>
          </Box>
        </div>
      );
}

export default Repair;