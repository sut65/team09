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
import { Link as RouterLink, useParams } from "react-router-dom";
//import { GetAdminByID } from "../services/HttpClientService";

//api
import {
    GetDamageLevel,
    GetMedicalDevice,
    GetEmployeeByUID,
    UpdateRepairs,
    GetRepairByID,
  } from '../../services/HttpClientService';

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  })
  
  function UpdateRepair() {
    const {id} = useParams();
    const [repair, setRepair] = useState<Partial<RepairInterface>>({});
    const [damageLevel, setDamageLevel] = useState<DamageLevelInterface[]>([]);
    const [employee, setEmployee] = useState<EmployeeInterface[]>([]);
    const [medicaldevice, setMedicalDevice] = useState<MedicalDeviceInterface[]>([]);
    // const [admin, setAdmin] = useState<Partial<AdminInterface>>({ Name: "" });
    const [success, setSuccess] = useState(false);
    const [date, setDate] = useState<Date | null>(new Date());
    const [error, setError] = useState(false);
    const [message, setAlertMessage] = React.useState("");
    const [Repair_Note, setRepair_Note] = useState<string>("");
    const id_emp = localStorage.getItem("uid")
  
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
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.name;
        console.log(name);
        setRepair({ ...repair, [name]: e.target.value });
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

    const fetchRepair = async () => {
      let res = await GetRepairByID(id);
      res && setRepair(res);
    };
  
    const convertType = (data: string | number | undefined) => {
      let val = typeof data === "string" ? parseInt(data) : data;
      return val;
    };

    const fetchEmployeeByUID = async () => {
      let res = await GetEmployeeByUID();
      res && setEmployee(res);
    };

    const convertTypes = (data: string | number | undefined | null) => {
      let val = typeof data === "string" ? parseInt(data) : data;
      return val;
    };

    useEffect(() => {
      fetch(`http://localhost:8080/repairs/${id}`)
          .then((response) => response.json())
          .then((res) => {
              fetch(`http://localhost:8080/employee/${res.data.EmployeeID}`)
                  .then((response) => response.json())
                  .then((res) => {
                      if (res.data) {
                          setEmployee(res.data.FirstName)
                          repair.EmployeeID = res.data.ID
                      }
                  }
                  )
  
              fetch(`http://localhost:8080/medicaldevice/${res.data.MedicalDeviceID}`)
                  .then((response) => response.json())
                  .then((res) => {
                      if (res.data) {
                          setMedicalDevice(res.data.Device_Name)
                          repair.MedicalDeviceID = res.data.ID
                      }
                  }
                  )
  
              fetch(`http://localhost:8080/damagelevel/${res.data.DamageLevelID}`)
                  .then((response) => response.json())
                  .then((res) => {
                      if (res.data) {
                          setDamageLevel(res.data.Damage_Choice)
                          repair.DamageLevelID = res.data.ID
                      }
                  }
                  )
          }
          )
  }, [id])

    // insert data to db
    const submit = async () => {
      let newdata = {
        ID: convertType(id),
        EmployeeID: convertTypes(id_emp),
        MedicalDeviceID: convertType(repair.MedicalDeviceID),
        DamageLevelID: convertType(repair.DamageLevelID),
        Repair_Note: repair.Repair_Note,
        Date_Of_Repair: date,
      };
  
      console.log("data", newdata)
  
      let res = await UpdateRepairs(newdata);
      if (res.status) {
        setAlertMessage("แก้ไขข้อมูลสำเร็จ");
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
      fetchEmployeeByUID();
      fetchRepair();
    }, []);
    console.log(repair)
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
                Update-Repair: {id}
              </Typography>
              <hr style={{ width: "400px", opacity: "0.5" }} />
    
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
                  value={repair.Repair_Note || "" || Repair_Note}
                  onChange={handleInputChange}
                  //multiline
                  //placeholder="Repair Note" //ข้อความข้างใน
                  minRows={8}
                  sx={{
                    fontSize: "1.5rem",
                    Width: "400px",
                    //minHeight: 200,
                  }}
                />
              </Box>
    
              {/* Date */}
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
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                      renderInput={(props) => <TextField
                        required
                        fullWidth
                        {...props} />}
                      label="Date_Of_Repair"
                      value={date}
                      onChange={(newValue) => {
                        setDate(newValue);
                      }}
                    />
                  </LocalizationProvider>
                </Box>
              </Box>
    
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
                  Update-Repair
                </Button>
              </Box>
            </Box>
          </Box>
        </div>
      );
}

export default UpdateRepair;