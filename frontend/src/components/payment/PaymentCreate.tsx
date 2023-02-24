import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SearchIcon from '@mui/icons-material/Search';
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

import { EmployeeInterface } from "../../models/IEmployee"; 
import { PatientInterface } from "../../models/IPatient";
import { Payment_statusInterface } from "../../models/IPayment_status";
import { PaymentInterface } from "../../models/IPayment";
import { PrescriptionInterface } from "../../models/IPrescription";
import { TreatmentsInterface } from "../../models/ITreatment";

import {
  GetPayment,
  GetPayment_status,
  GetEmployee,
  GetPatient,
  CreatePayment,
  GetPrescription,
  GetTreatment,
} from "../../services/HttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PaymentCreate() {
    const [employee, setEmployee] = React.useState<EmployeeInterface[]>([]); //React.useState<DentistsInterface>();
    const [patient, setPatient] = React.useState<PatientInterface[]>([]);
    const [prescription, setPrescription] = React.useState<PrescriptionInterface[]>([]);
    const [treatment, setTreatment] = React.useState<TreatmentsInterface[]>([]);
    const [payment_status, setPayment_status] = React.useState<Payment_statusInterface[]>([]);
    const [payment, setPayment] = React.useState<PaymentInterface>({DateTimePayment: new Date(), });
    const [message, setAlertMessage] = React.useState("");

    const [reportincome, setReportincome] = useState(0);
    const [report1, setReport1] = useState(0);
    const [report2, setReport2] = useState(0);

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
    //text field
    const handleInputChange = (
      event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
      const id = event.target.id as keyof typeof PaymentCreate;
      const { value } = event.target;
      setPayment({ ...payment, [id]: value });
      let num1: number = 0;
      let num2: number = 0;
      for (let i = 0; i < Prescription_code.length; i++) {
        if (Prescription_code[i] === (value)) {
          num1 += Prescription111[i]! * Prescription222[i]!;
        }
      }
      for (let i = 0; i < treatment_code.length; i++) {
        if (treatment_code[i] === (value)) {
          num2 += treatment111[i]! * treatment222[i]!;
        }
      }
      setReport1(num1)
      setReport2(num2)
      setReportincome(num1+num2)
  };
    const handleInputChange1 = (
      event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
      const id = event.target.id as keyof typeof payment;
      const { value } = event.target;
      setPayment({ ...payment, [id]: value });
    };

    //combobox
    const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof PaymentCreate;
    setPayment({
      ...payment,
      [name]: event.target.value,
    });
  };    
  
  const getPatient = async () => {
    let res = await GetPatient();
    if (res) {
      setPatient(res);
    }
  };

  const getEmployee = async () => {
    let res = await GetEmployee();
    if (res) {
      setEmployee(res);
    }
  };

  const getPayment_status = async () => {
    let res = await GetPayment_status();
    if (res) {
      setPayment_status(res);
    }
  };

  const Prescription_code = prescription.map(prescription=>prescription.Prescription_code)
  const Prescription111 = prescription.map(prescription=>prescription.Medicine?.Medicine_price)
  const Prescription222 = prescription.map(prescription=>prescription.Qty)
  const treatment_code = treatment.map(treatment=>treatment.treatment_code)
  const treatment111 = treatment.map(treatment=>treatment.price)
  const treatment222 = treatment.map(treatment=>treatment.number_of_treatment)

  const getPayment = async () => {
    let res = await GetPayment();
    if (res) {
      setPayment(res);
    }
  };

  const getPrescription = async () => {
    let res = await GetPrescription();
    if (res) {
      setPrescription(res);
    }
  };

  const getTreatment = async () => {
    let res = await GetTreatment();
    if (res) {
      setTreatment(res);
    }
  };

  useEffect(() => {
    getPatient();
    getEmployee();
    getPayment_status();
    getPayment();
    getPrescription();
    getTreatment();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };
 
  async function submit() {
    let data = {
        PatientID: convertType(payment.PatientID),
        EmployeeID: convertType(payment.EmployeeID),
        Payment_statusID: convertType(payment.Payment_statusID),
        Total_price: typeof payment.Total_price === "string" ? parseInt(payment.Total_price) : 0,
        Payment_code: payment.Payment_code ?? "",
        DateTimePayment: payment.DateTimePayment,
    };
    console.log(data);

    let res = await CreatePayment(data);
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
              สร้างข้อมูลแจ้งยอดชำระ
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
                value={payment.PatientID + ""}
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
              <p>พนักงาน</p>
              <Select
                native
                value={payment.EmployeeID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "EmployeeID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกชื่อ
                </option>
                {employee.map((item: EmployeeInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.FirstName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">ราคารวม</p>
                            <TextField
                                id="Total_price"
                                variant="outlined"
                                type="number"
                                size="medium"
                                value={payment.Total_price || ""}
                                onChange={handleInputChange1}
                            />
                        </FormControl>
                    </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>สถานนะการชำระ</p>
              <Select
                native
                value={payment.Payment_statusID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "Payment_statusID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกสถานะ
                </option>
                {payment_status.map((item: Payment_statusInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Payment_status_name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p className="good-font">รหัสแจ้งยอดชำระ</p>
              <TextField
                id="Note"
                variant="outlined"
                type="string"
                size="medium"
                value={payment.Payment_code || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p className="good-font">เวลาการแจ้งยอดชำระ</p>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  value={payment.DateTimePayment}
                  onChange={(newValue) => {
                    setPayment({
                      ...payment,
                      DateTimePayment: newValue,
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <li>ค่าการรักษาทั้งหมด<span>{report2}</span></li>,
            <li>ค่ายาทั้งหมด{report1}</li>
            <Button
              size="large"
              variant="contained"
              color="secondary"
              >{reportincome} <SearchIcon />
            </Button>

          </Grid>

          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/payment"
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

export default PaymentCreate;