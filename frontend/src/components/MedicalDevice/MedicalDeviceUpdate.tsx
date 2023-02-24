import React, { useEffect, useState } from "react";
import { EmployeeInterface } from "../../models/IEmployee";
import { TypeInterface } from "../../models/IType";
import { StatusInterface } from "../../models/IStatus";
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
  GetType,
  GetStatus,
  GetEmployeeByUID,
  UpdateMedicalDevice,
  GetMedicalDeviceByID,
} from '../../services/HttpClientService';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

function MedicalDevice() {
  //const [medicaldevice, setMedicalDevice] = useState<MedicalDeviceInterface>({});
  const [medicaldevice, setMedicalDevice] = useState<Partial<MedicalDeviceInterface>>({});
  const [type, setType] = useState<TypeInterface[]>([]);
  const [status, setStatus] = useState<StatusInterface[]>([]);
  const [amount, setAmount] = useState<number>(0);
  const [device_name, setDevice_Name] = useState<string>("");
  // const [admin, setAdmin] = useState<Partial<AdminInterface>>({ Name: "" });
  const [success, setSuccess] = useState(false);
  const [date, setDate] = useState<Date | null>(new Date());
  const [error, setError] = useState(false);
  const [message, setAlertMessage] = React.useState("");
  const [employee, setEmployee] = useState<EmployeeInterface[]>([]);
  const {id} = useParams();
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
    const name = event.target.name as keyof typeof medicaldevice;
    console.log(name)
    setMedicalDevice({
      ...medicaldevice,
      [name]: event.target.value,
    });
  };

  const handleInputChange = (event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof MedicalDevice;
    const { value } = event.target;
    setMedicalDevice({ ...medicaldevice, [id]: value });
  };

  // fetch POST
  const fetchTypes = async () => {
    let res = await GetType();
    res && setType(res);
  };

  const fetchStatuses = async () => {
    let res = await GetStatus();
    res && setStatus(res);
  };

  const fetchMedicalDevice = async () => {
    let res = await GetMedicalDeviceByID(id);
    res && setMedicalDevice(res);
  };

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const fetchEmployeeByUID = async () => {
    let res = await GetEmployeeByUID();
    medicaldevice.EmployeeID = res.ID;
  };

  const convertTypes = (data: string | number | undefined | null) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  useEffect(() => {
    fetch(`http://localhost:8080/medicaldevices/${id}`)
        .then((response) => response.json())
        .then((res) => {
            fetch(`http://localhost:8080/employee/${res.data.EmployeeID}`)
                .then((response) => response.json())
                .then((res) => {
                    if (res.data) {
                        setEmployee(res.data.FirstName)
                        medicaldevice.EmployeeID = res.data.ID
                    }
                }
                )

            fetch(`http://localhost:8080/ttype/${res.data.TypeID}`)
                .then((response) => response.json())
                .then((res) => {
                    if (res.data) {
                        setType(res.data.Type_Name)
                        medicaldevice.TypeID = res.data.ID
                    }
                }
                )

            fetch(`http://localhost:8080/status/${res.data.StatusID}`)
                .then((response) => response.json())
                .then((res) => {
                    if (res.data) {
                        setStatus(res.data.Status_Choice)
                        medicaldevice.StatusID = res.data.ID
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
      TypeID: convertType(medicaldevice.TypeID),
      StatusID: convertType(medicaldevice.StatusID),
      Device_Name: medicaldevice.Device_Name,
      Amount: convertType(medicaldevice.Amount),
      Record_Date: date,
    };

    console.log("data", newdata)

    let res = await UpdateMedicalDevice(newdata);
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
    fetchTypes();
    fetchStatuses();
    fetchEmployeeByUID();
    fetchMedicalDevice();
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
            Medical Device
          </Typography>
          <hr style={{ width: "400px", opacity: "0.5" }} />

          {/*Type ID*/}
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
                value={medicaldevice.TypeID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "TypeID",
                }}
              >
                {type.map((item: TypeInterface) => (
                  <option value={item.ID}>{item.Type_Name}</option>
                ))}
              </Select>
            </Box>
          </Box>

          {/*Status*/}
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
                value={medicaldevice.StatusID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "StatusID",
                }}
              >
                {status.map((item: StatusInterface) => (
                  <option value={item.ID}>{item.Status_Choice}</option>
                ))}
              </Select>
            </Box>
          </Box>

          {/*Device_Name*/}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              // gap: "2rem",
              mt: 2,
            }}>
            <TextField
              id="Device_Name"
              name="Device_Name"
              value={medicaldevice.Device_Name}
              onChange={handleInputChange}
              //multiline
            //   placeholder="Device Name" //ข้อความข้างใน
              minRows={8}
              sx={{
                fontSize: "1.5rem",
                Width: "400px",
                //minHeight: 200,
              }}
            />
          </Box>

          {/*Amount*/}
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
              <TextField
                required
                fullWidth
                type="number"
                id="Amount"
                name="Amount"
                value={medicaldevice.Amount}
                onChange={handleInputChange}
                //multiline
                // placeholder="Amount" //ข้อความข้างใน
                //minRows={8}
                sx={{
                  fontSize: "1.5rem",
                }}
              />
            </Box>
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
                  label="TimeStamp"
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
               to="/MedicalDevice"
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
              Update Medical Device
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
}

export default MedicalDevice;