import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { DentistInterface } from "../../models/IDentist"; 
import { PatientInterface } from "../../models/IPatient";
import { MedicineInterface } from "../../models/IMedicine";
import { Medicine_statusInterface } from "../../models/IMedicine_status";
import { PrescriptionInterface } from "../../models/IPrescription";


import {
  GetPrescription,
  GetMedicine_status,
  GetMedicine,
  GetPatient,
  GetDentists,
  CreatePrescription,
} from "../../services/HttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PrescriptionCreate() {
    const [dentist, setDentist] = React.useState<DentistInterface[]>([]); //React.useState<DentistsInterface>();
    const [patient, setPatient] = React.useState<PatientInterface[]>([]);
    const [medicine, setMedicine] = React.useState<MedicineInterface[]>([]);
    const [medicine_status, setMedicine_status] = React.useState<Medicine_statusInterface[]>([]);
    const [prescription, setPrescription] = React.useState<PrescriptionInterface>({ DateTimePrescription: new Date(), });
    const [message, setAlertMessage] = React.useState("");

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

   //เปิดปิดตัว alert
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
    //combobox
    const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof PrescriptionCreate;
    setPrescription({
      ...prescription,
      [name]: event.target.value,
    });
  };

  //text field
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof prescription;
    const { value } = event.target;
    setPrescription({ ...prescription, [id]: value });
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

  useEffect(() => {
    getPatient();
    getMedicine();
    getDentist();
    getMedicine_status();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };


  
  async function submit() {
    let data = {
        DentistID: convertType(prescription.DentistID),
        PatientID: convertType(prescription.PatientID),
        MedicineID: convertType(prescription.MedicineID),
        Medicine_statusID: convertType(prescription.Medicine_statusID),
        Qty: typeof prescription.Qty === "string" ? parseInt(prescription.Qty) : 0,
        Detail: prescription.Details ?? "",
        DateTimePrescription: prescription.DateTimePrescription,
    };
    console.log(data);

    let res = await CreatePrescription(data);
    console.log(res);
    if (res.status) {
      setAlertMessage("บันทึกข้อมูลสำเร็จ");
      setSuccess(true);
    } else {
      setAlertMessage(res.message);
      setError(true);
    }
  }

  return (
    <Container maxWidth="md">
      <Snackbar
      id = "success"
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
        {message}
        </Alert>
      </Snackbar>
      <Snackbar
       id = "error"
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
        {message}
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
              สร้างข้อมูลสั่งจ่ายยา
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>
        
        <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ผู้ป่วย</p>
              <Select
                native
                value={prescription.PatientID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "PatientID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกชื่อ
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
              <p>ทันตเเพทย์</p>
              <Select
                native
                value={prescription.DentistID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "DentistID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกชื่อ
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
              <p>ยา</p>
              <Select
                native
                value={prescription.MedicineID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "MedicineID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกยา
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
                value={prescription.Qty || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}></Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p className="good-font">รายละเอียด</p>
              <TextField
                id="Details"
                variant="outlined"
                type="string"
                size="medium"
                value={prescription.Details || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}></Grid>


          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>สถานนะยา</p>
              <Select
                native
                value={prescription.Medicine_statusID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "Medicine_statusID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกสถานะ
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
            <Button
              component={RouterLink}
              to="/prescription"
              variant="contained"
              color="inherit"
            >
              กลับ
            </Button>
            <Button
              style={{ float: "right" }}
              onClick={submit}
              variant="contained"
              color="primary"
            >
              บันทึก
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default PrescriptionCreate;
