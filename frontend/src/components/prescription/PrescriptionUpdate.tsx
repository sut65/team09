import React, { useEffect, useState } from 'react';
import { Container } from '@mui/system';
import { Link as RouterLink } from "react-router-dom";
import {
  TextField,
  SelectChangeEvent,
  Button,
  styled,
  Select,
  Box,
  Stack,
  Grid,
  Paper,
  Typography,
  Divider,
  Snackbar,
  FormControl,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { Link, useParams } from "react-router-dom";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

// Interface
import { DentistInterface } from "../../models/IDentist"; 
import { PatientInterface } from "../../models/IPatient";
import { MedicineInterface } from "../../models/IMedicine";
import { Medicine_statusInterface } from "../../models/IMedicine_status";
import { PrescriptionInterface } from "../../models/IPrescription";

//API
import {
    GetMedicine,
    GetMedicine_status,
    GetPatient,
    GetDentists,
    GetPrescriptionByID,
    UpdatePrescription,
} from '../../services/HttpClientService';

const ImgBox = styled(Box)({
  width: "280px",
});

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PrescriptionUpdate() {
    const { id } = useParams();
    const [dentist, setDentist] = React.useState<DentistInterface[]>([]); //React.useState<DentistsInterface>();
    const [patient, setPatient] = React.useState<PatientInterface[]>([]);
    const [medicine, setMedicine] = React.useState<MedicineInterface[]>([]);
    const [medicine_status, setMedicine_status] = React.useState<Medicine_statusInterface[]>([]);
    const [prescription, setPrescription] = React.useState<PrescriptionInterface>({ DateTimePrescription: new Date(), });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [image, setImage] = useState({ name: "", src: "" });
    const [message, setAlertMessage] = React.useState("");
    const [dentistname, setDentistName] = React.useState("");
    const [patientname, setPatientName] = React.useState("");
    const [medicine_statusname, setMedicine_statusName] = React.useState("");
    const [medicinename, setMedicineName] = React.useState("");
    const [details, setDetails] = React.useState<string>("");
    const [qty, setQty] = React.useState(0);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    console.log(name);
    setPrescription({ ...prescription, [name]: e.target.value });
  };

  const handleSelectChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof prescription;
    setPrescription({
      ...prescription,
      [name]: event.target.value,
    });
  };

  const handleChangeImages = (event: any, id?: string) => {
    const input = event.target.files[0];
    const name = event.target.name as keyof typeof prescription;

    var reader = new FileReader();
    reader.readAsDataURL(input);
    reader.onload = function () {
      const dataURL = reader.result;
      setImage({ name: input.name, src: dataURL?.toString() as string });
      if (event.target.name === "Image") {
        setPrescription({ ...prescription, [name]: dataURL?.toString() });
      }
    };
  };

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };

  const getPatient = async () => {
    let res = await GetPatient();
    if (res) {
      setPatient(res);
    }
  };

  const getMedicine = async () => {
    let res = await GetMedicine();
    if (res) {
      setMedicine(res);
    }
  };

  const getMedicine_status = async () => {
    let res = await GetMedicine_status();
    if (res) {
      setMedicine_status(res);
    }
  };

  const getDentist = async () => {
    let res = await GetDentists();
    if (res) {
      setDentist(res);
    }
  };

  //FetchAPI
//   const fetchFoodTypes = async () => {
//     let res = await GetFoodTypes();
//     res && setFoodTypes(res);
//   };

//   const fetchMainIngredients = async () => {
//     let res = await GetMainIngredients();
//     res && setMainIngredients(res);
//   };

//   const fetchAdminByID = async () => {
//     let res = await GetAdminByID();
//     foodinformation.AdminID = res.ID;
//     if (res) {
//       console.log(res)
//       setAdmin(res);
//     }
//   };

//   const fetchFoodInformation = async () => {
//     let res = await GetFoodInformationByID(id + "");
//     res && setFoodInformation(res);
//   };

useEffect(() => {
    fetch(`http://localhost:8080/prescription/${id}`)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                setDetails(res.data.Details.toString());
                setQty(res.data.Qty.toString());
            }

            fetch(`http://localhost:8080/dentist/${res.data.DentistID}`)
                .then((response) => response.json())
                .then((res) => {
                    if (res.data) {
                        setDentistName(res.data.FirstName)
                        prescription.DentistID = res.data.ID
                    }
                }
                )

            fetch(`http://localhost:8080/patients/${res.data.PatientID}`)
                .then((response) => response.json())
                .then((res) => {
                    if (res.data) {
                        setPatientName(res.data.FirstName)
                        prescription.PatientID = res.data.ID
                    }
                }
                )
        }
        )
}, [id])

  // อัปเดตข้อมูลเข้า Database
  const submit = async () => {
    let newdata = {
        ID: convertType(id),
        DentistID: convertType(prescription.DentistID),
        PatientID: convertType(prescription.PatientID),
        MedicineID: convertType(prescription.MedicineID),
        Medicine_statusID: convertType(prescription.Medicine_statusID),
        Qty: typeof prescription.Qty === "string" ? parseInt(prescription.Qty) : 0,
        Details: prescription.Details ?? "",
        DateTimePrescription: prescription.DateTimePrescription,
    };

    let res = await UpdatePrescription(newdata);
    if (res.status) {
      setSuccess(true);
      setAlertMessage("อัปเตดสำเร็จ");
    //   window.location.href = "/admin/food-display"
    } else {
      setError(true);
      setAlertMessage(res.message);
    }
    console.log(JSON.stringify(newdata))
  };

  useEffect(() => {
    getPatient();
    getMedicine();
    getDentist();
    getMedicine_status();

  }, []);

  return (
    <Container maxWidth="md">
        <Snackbar
            id="success"
            open={success}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert onClose={handleClose} severity="success">
                <div className="good-font">
                    {message}
                </div>
            </Alert>
        </Snackbar>
        <Snackbar id="error"
            open={error}
            autoHideDuration={6000}
            onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                <div className="good-font">
                    {message}
                </div>
            </Alert>
        </Snackbar>
        <Paper>
            <Box
                display="flex"
                sx={{
                    marginTop: 2,
                }}
            >
                <Box sx={{ paddingX: 2, paddingY: 1 }}>
                    <Typography
                        component="h2"
                        variant="h6"
                        color="primary"
                        gutterBottom
                    >
                        <div className="good-font">
                            แก้ไขแผนการรักษา ID : {id}
                        </div>
                    </Typography>
                </Box>
            </Box>
            <Divider />
            <Grid container spacing={3} sx={{ padding: 2 }}>

                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <p className="good-font">ทันตแพทย์</p>
                        <Select
                            native
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={prescription.DentistID + ""}
                            onChange={handleSelectChange}
                            inputProps={{
                                name: "DentistID",
                            }}
                        >
                            <option aria-label="None" value="">
                                {dentistname}
                            </option>
                            {dentist.map((item: DentistInterface) => (
                                <option value={item.ID} key={item.ID}>
                                    {item.FirstName}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <p className="good-font">ผู้ป่วย</p>
                        <Select
                            native
                            
                            id="patientname"
                            value={prescription.PatientID + ""}
                            onChange={handleSelectChange}
                            inputProps={{
                                name: "PatientID",
                            }}
                        >
                            <option aria-label="None" value="">
                                {patientname}
                            </option>
                            {patient.map((item: PatientInterface) => (
                                <option value={item.ID} key={item.ID}>
                                    {item.FirstName}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <p className="good-font">ยา</p>
                        <Select
                            native
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={prescription.MedicineID + ""}
                            onChange={handleSelectChange}
                            inputProps={{
                                name: "MedicineID",
                            }}
                        >
                            <option aria-label="None" value={medicinename}>
                                {medicinename}
                            </option>
                            {medicine.map((item: MedicineInterface) => (
                                <option value={item.ID} key={item.ID}>
                                    {item.Medicine_name}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">จำนวน</p>
                            <TextField
                                id="Qty"
                                variant="outlined"
                                type="number"
                                size="medium"
                                InputProps={{ inputProps: { min: 1 } }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={prescription.Qty || "" || qty}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">รายละเอียด</p>
                            <TextField
                                id="Details"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={details}
                                onChange={(event) => setDetails(event.target.value)}
                            />
                        </FormControl>
                    </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <p className="good-font">สถานนะยา</p>
                        <Select
                            native
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={prescription.Medicine_statusID + ""}
                            onChange={handleSelectChange}
                            inputProps={{
                                name: "Medicine_statusID",
                            }}
                        >
                            <option aria-label="None" value={medicine_statusname}>
                                {medicine_statusname}
                            </option>
                            {medicine_status.map((item: Medicine_statusInterface) => (
                                <option value={item.ID} key={item.ID}>
                                    {item.Medicine_status_name}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                  <Grid item xs={6}>
                      <FormControl fullWidth variant="outlined">
                          <p className="good-font">เวลาการสั่งจ่าย</p>
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                              <DatePicker
                                  value={prescription.DateTimePrescription}
                                  onChange={(newValue) => {
                                      setPrescription({
                                          ...prescription,
                                          DateTimePrescription: newValue,
                                      });
                                  }}
                                  renderInput={(params) => <TextField {...params} />}
                              />
                          </LocalizationProvider>
                      </FormControl>
                  </Grid>

                <Grid item xs={12}>
                    <Button component={RouterLink} to="/prescription" variant="contained">
                        <div className="good-font">
                            กลับ
                        </div>
                    </Button>
                    <Button
                        style={{ float: "right" }}
                        onClick={submit}
                        variant="contained"
                        color="primary"
                    >
                        <div className="good-font">
                            อัปเดตข้อมูล
                        </div>
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    </Container>
);
}

export default PrescriptionUpdate;