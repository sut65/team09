import React, { useEffect, useState } from "react";
import { TypeInterface } from "../../models/IType"; 
import { StatusInterface } from "../../models/IStatus";
import { MedicalDeviceInterface } from "../../models/IMedicaldevice";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Snackbar, Select, Typography, Button, FormGroup, Checkbox, FormControlLabel } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
//import { GetAdminByID } from "../services/HttpClientService";

//api
import { 
  GetType,
  GetStatus,
  CreateMedicalDevice
 } from '../../services/HttpClientService' ;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
})

function MedicalDevice() {
    const [medicaldevice, setMedicalDevice] = useState<MedicalDeviceInterface>({});
    const [ttype, setType] = useState<TypeInterface[]>([]);
    const [status, setStatus] = useState<StatusInterface[]>([]);
    const [amount, setAmount] = useState<number>(0);
    const [device_name, setDevice_Name] = useState<string>("");
    // const [admin, setAdmin] = useState<Partial<AdminInterface>>({ Name: "" });
    const [success, setSuccess] = useState(false);
    const [date, setDate] = useState<Date | null>(new Date());
    const [error, setError] = useState(false);

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

    const convertType = (data: string | number | undefined) => {
      let val = typeof data === "string" ? parseInt(data) : data;
      return val;
    };

    // insert data to db
    const submit = async () => {
      let data = {
        //EmployID: convertType(medicaldevice.EmployeeID),
        Type_ID: convertType(medicaldevice.TypeID),
        Status_ID: convertType(medicaldevice.StatusID),
        Device_Name: medicaldevice.Device_Name,
        Date: medicaldevice.Date,
      };

    let res = await CreateMedicalDevice(data);
    res ? setSuccess(true) : setError(true);
    window.location.href = "/articles"
  };
  
    useEffect(() => {
      fetchTypes();
      fetchStatuses();
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
                        open={success}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    >
                        <Alert onClose={handleClose} severity="success">
                        บันทึกข้อมูลสำเร็จ
                        </Alert>
                    </Snackbar>

                    <Snackbar
                        open={error}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    >
                        <Alert onClose={handleClose} severity="error">
                        บันทึกข้อมูลไม่สำเร็จ
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
                                name: "Type_ID",
                                }}
                            >
                                <option aria-label="None" value="">
                                Type
                                </option>
                                {ttype.map((item: TypeInterface) => (
                                <option value={item.ID}>{item.ID}</option>
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
                                name: "Status_ID",
                                }}
                            >
                                <option aria-label="None" value="">
                                Status
                                </option>
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
                              placeholder="Device Name" //ข้อความข้างใน
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
                              placeholder="Amount" //ข้อความข้างใน
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
                              label="Date"
                              value={date}
                              onChange={(newValue) => {
                                setDate(newValue);
                              }}
                            />
                          </LocalizationProvider>
                        </Box>
                    </Box>

                    {/* Btn submit */}
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                      <Button
                        style={{ fontSize: "1rem" }}
                        onClick={submit}
                        variant="contained"
                        color="primary"
                      >
                        Back
                      </Button>

                      <Button
                        style={{ fontSize: "1rem", marginLeft: 100 }}
                        onClick={submit}
                        variant="contained"
                        color="primary"
                      >
                        Create Medical Device
                      </Button>
                    </Box>
                </Box>
            </Box>
          </div>
      );   
}

export default MedicalDevice;