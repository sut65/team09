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
import { EmployeeInterface } from "../../models/IEmployee"; 
import { PatientInterface } from "../../models/IPatient";
import { Payment_statusInterface } from "../../models/IPayment_status";
import { PaymentInterface } from "../../models/IPayment";
import { PrescriptionInterface } from "../../models/IPrescription";
import { TreatmentsInterface } from "../../models/ITreatment";

//API
import {
    GetEmployee,
    GetPayment_status,
    GetPatient,
    UpdatePayment,
    GetPrescription,
    GetTreatment,
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

function PaymentUpdate() {
    const { id } = useParams();
    const [employee, setEmployee] = React.useState<EmployeeInterface[]>([]); //React.useState<DentistsInterface>();
    const [patient, setPatient] = React.useState<PatientInterface[]>([]);
    const [payment_status, setPayment_status] = React.useState<Payment_statusInterface[]>([]);
    const [payment, setPayment] = React.useState<PaymentInterface>({ DateTimePayment: new Date(), });
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [image, setImage] = useState({ name: "", src: "" });
    const [message, setAlertMessage] = React.useState("");
    const [employeename, setEmployeeName] = React.useState("");
    const [patientname, setPatientName] = React.useState("");
    const [payment_statusname, setPayment_statusName] = React.useState("");
    const [payment_code, setPayment_code] = React.useState<string>("");
    const [total_price, setTotal_price] = React.useState(0);
    const [prescription, setPrescription] = React.useState<PrescriptionInterface[]>([]);
    const [treatment, setTreatment] = React.useState<TreatmentsInterface[]>([]);

    const Prescription_code = prescription.map(prescription=>prescription.Prescription_code)
    const Prescription111 = prescription.map(prescription=>prescription.Medicine?.Medicine_price)
    const Prescription222 = prescription.map(prescription=>prescription.Qty)
    const treatment_code = treatment.map(treatment=>treatment.treatment_code)
    const treatment111 = treatment.map(treatment=>treatment.price)
    const treatment222 = treatment.map(treatment=>treatment.number_of_treatment)

    const [reportincome, setReportincome] = useState(0);
    const [report1, setReport1] = useState(0);
    const [report2, setReport2] = useState(0);

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

const handleInputChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    console.log(name);
    setPayment({ ...payment, [name]: e.target.value });
  };

  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
) => {
    const id = event.target.id as keyof typeof PaymentUpdate;
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

  const handleSelectChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof payment;
    setPayment({
      ...payment,
      [name]: event.target.value,
    });
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

  const getPayment_status = async () => {
    let res = await GetPayment_status();
    if (res) {
      setPayment_status(res);
    }
  };

  const getEmployee = async () => {
    let res = await GetEmployee();
    if (res) {
      setEmployee(res);
    }
  };

useEffect(() => {
    getPrescription();
    getTreatment();
    fetch(`http://localhost:8080/payment/${id}`)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                setPayment_code(res.data.Payment_code.toString());
                setTotal_price(res.data.Total_price.toString());
            }

            fetch(`http://localhost:8080/employee/${res.data.EmployeeID}`)
                .then((response) => response.json())
                .then((res) => {
                    if (res.data) {
                        setEmployeeName(res.data.FirstName)
                        payment.EmployeeID = res.data.ID
                    }
                }
                )

            fetch(`http://localhost:8080/payment_status/${res.data.Payment_statusID}`)
                .then((response) => response.json())
                .then((res) => {
                    if (res.data) {
                        setPayment_statusName(res.data.Payment_status_name)
                        payment.Payment_statusID = res.data.ID
                    }
                }
                )

            fetch(`http://localhost:8080/patients/${res.data.PatientID}`)
                .then((response) => response.json())
                .then((res) => {
                    if (res.data) {
                        setPatientName(res.data.FirstName)
                        payment.PatientID = res.data.ID
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
        PatientID: convertType(payment.PatientID),
        EmployeeID: convertType(payment.EmployeeID),
        Payment_statusID: convertType(payment.Payment_statusID),
        Total_price: typeof total_price === "string" ? parseInt(total_price) : 0,
        Payment_code:payment_code ?? "",
        DateTimePayment: payment.DateTimePayment,
    };

    let res = await UpdatePayment(newdata);
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
    getEmployee();
    getPayment_status();

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
                            แก้ไขแจ้งยอดชำระ ID : {id}
                        </div>
                    </Typography>
                </Box>
            </Box>
            <Divider />
            <Grid container spacing={3} sx={{ padding: 2 }}>

                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <p className="good-font">พนักงาน</p>
                        <Select
                            native
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={payment.EmployeeID + ""}
                            onChange={handleSelectChange}
                            inputProps={{
                                name: "EmployeeID",
                            }}
                        >
                            <option aria-label="None" value="">
                                {employeename}
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
                        <p className="good-font">ผู้ป่วย</p>
                        <Select
                            native
                            
                            id="patientname"
                            value={payment.PatientID + ""}
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
                            <p className="good-font">ราคารวม</p>
                            <TextField
                                id="total_price"
                                variant="outlined"
                                name='Total_price'
                                type="number"
                                size="medium"
                                InputProps={{ inputProps: { min: 1 } }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={payment.Total_price || "" || total_price}
                                onChange={handleInputChange1}
                            />
                        </FormControl>
                    </Grid>

                <Grid item xs={6}>
                    <FormControl fullWidth variant="outlined">
                        <p className="good-font">สถานะการชำระ</p>
                        <Select
                            native
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={payment.Payment_statusID + ""}
                            onChange={handleSelectChange}
                            inputProps={{
                                name: "Payment_statusID",
                            }}
                        >
                            <option aria-label="None" value={payment_statusname}>
                                {payment_statusname}
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
                                value={payment_code}
                                onChange={handleInputChange1} 
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

                  <Grid item xs={4}>
              <p className="good-font">กรอกรหัส ถ้าจำราคารวมไม่ได้</p>
              <TextField
                id="Note"
                variant="outlined"
                type="string"
                size="medium"
                value={payment.Payment_code}
                onChange={handleInputChange}
              /> 
          </Grid>

          <Grid item xs={2.5}>
            <p className="good-font">ค่าการรักษา</p>
            <TextField
              variant="outlined"
              type="string"
              size="medium"
              value={report2}
            />
          </Grid>
          
          <Grid item xs={2.5}>
            <p className="good-font">ค่ายา</p>
            <TextField
              variant="outlined"
              type="string"
              size="medium"
              value={report1}
            />
          </Grid>
          <Grid item xs={3}>
            <p className="good-font">รวมทั้งหมด</p>
            <TextField

              variant="outlined"
              type="string"
              size="medium"
              value={reportincome}
            />
          </Grid>

                <Grid item xs={12}>
                    <Button component={RouterLink} to="/payment" variant="contained">
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

export default PaymentUpdate;