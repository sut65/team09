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
//import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
//import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
//import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { SymptomInterface } from "../../models/ISymptom";
import { RoleInterface } from "../../models/IRole";
import { GenderInterface } from "../../models/IGender";
import { ProvinceInterface } from "../../models/IProvince";
import { EmployeeInterface } from "../../models/IEmployee";
import { PatientInterface } from "../../models/IPatient";
import { DistrictInterface } from "../../models/IDistrict";
import { Sub_districtInterface } from "../../models/ISub_district";

import {
  GetPatient,
  CreatePatient,
  GetSymptom,
  GetEmployee,
  GetRole,
  GetGender,
  GetProvince,
  GetDistrict,
  GetSubdistrict,
  CreateEmployee,
} from "../../services/HttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PaitentCreate() {
  const [symptom, setSymptom] = useState<SymptomInterface[]>([]);
  const [gender, setGender] = useState<GenderInterface[]>([]);
  const [province, setProvince] = React.useState<ProvinceInterface[]>([]);
  const [district, setDistrict] = React.useState<DistrictInterface[]>([]);
  const [subdistrict, setSubdistrict] = React.useState<Sub_districtInterface[]>([]);
  const [employee, setEmployee] = useState<Partial<EmployeeInterface>>({});
  const [patient, setPatient] = useState<Partial<PatientInterface>>({});

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
    const name = event.target.name as keyof typeof PaitentCreate;
    setPatient({
      ...patient,
      [name]: event.target.value,
    });
  };

  //text field
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof patient;
    const { value } = event.target;
    setPatient({ ...patient, [id]: value });
  };
  
  const getGender = async () => {
    let res = await GetGender();
    if (res) {
      setGender(res);
    }
  };

  const getSymptom = async () => {
    let res = await GetSymptom();
    if (res) {
      setSymptom(res);
    }
  };

  const getProvince = async () => {
    let res = await GetProvince();
    if (res) {
      setProvince(res);
    }
  };

  const getDistrict = async () => {
    let res = await GetDistrict();
    if (res) {
      setDistrict(res);
    }
  };

  const getSubdistrict = async () => {
    let res = await GetSubdistrict();
    if (res) {
      setSubdistrict(res);
    }
  };

  useEffect(() => {
    getGender();
    getSymptom();
    getProvince();
    getDistrict();
    getSubdistrict();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };


  
  async function submit() {
    let data = {
      FirstName: patient.FirstName,
      LastName: patient.LastName,
      Personal_id: patient.Personal_id,
      Old: patient.Old,
      Weight: patient.Weight,
      Height: patient.Height,
      Underlying_disease: patient.Underlying_disease,
      Drug_alergy: patient.Drug_alergy,
      House_no: patient.House_no,
      SymptomID: convertType(patient.SymptomID),
      GenderID: convertType(patient.GenderID),
      ProvinceID: convertType(patient.ProvinceID),
      DistrictID: convertType(patient.DistrictID),
      Sub_districtID: convertType(patient.Sub_districtID),
      EmployeeID: convertType(patient.EmployeeID),
    };
    console.log(data);

    let res = await CreatePatient(data);
    console.log(res);
    if (res) { 
      setSuccess(true);
    } else {
      setError(true);
    }
  }

  return (
    <Container maxWidth="md">
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="success">
          บันทึกข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
          บันทึกข้อมูลไม่สำเร็จ
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
              สร้างข้อมูลผู้ป่วย
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>

        <Grid item xs={6}>
            <p>บัตรประจำตัวประชาชน</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Personal_id"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกบัตรประชาชน"
                value={patient.Personal_id || ""}
                onChange={handleInputChange}
                inputProps={{maxLength :13}}
              />
            </FormControl>
        </Grid>

        <Grid item xs={6}>
            <p>ชื่อ</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="FirstName"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกชื่อ"
                value={patient.FirstName || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>
        
          <Grid item xs={6}>
            <p>นามสกุล</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="LastName"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกนามสกุล"
                value={patient.LastName || ""}
                onChange={handleInputChange}
              />
            </FormControl>
        </Grid>
        
        <Grid item xs={6}>
            <p>อายุ</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Old"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกอายุ"
                value={patient.Old || ""}
                onChange={handleInputChange}
              />
            </FormControl>
        </Grid>

        <Grid item xs={6}>
            <p>น้ำหนัก</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Weight"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกน้ำหนัก"
                value={patient.Weight || ""}
                onChange={handleInputChange}
              />
            </FormControl>
        </Grid>

        <Grid item xs={6}>
            <p>ส่วนสูง</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Height"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกส่วนสูง"
                value={patient.Height || ""}
                onChange={handleInputChange}
              />
            </FormControl>
        </Grid>

        <Grid item xs={6}>
            <p>โรคประจำตัว</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Underlying_disease"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกโรคประจำตัว"
                value={patient.Underlying_disease || ""}
                onChange={handleInputChange}
              />
            </FormControl>
        </Grid>

        <Grid item xs={6}>
            <p>การแพ้ยา</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Drug_alergy"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกการแพ้ยา"
                value={patient.Drug_alergy  || ""}
                onChange={handleInputChange}
              />
            </FormControl>
        </Grid>

        <Grid item xs={6}>
            <p>ที่อยู่</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="House_no"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกที่อยู่"
                value={patient.House_no || ""}
                onChange={handleInputChange}
              />
            </FormControl>
        </Grid>
        
        <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>จังหวัด</p>
              <Select
                native
                value={patient.ProvinceID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "ProvinceID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกจังหวัด
                </option>
                {province.map((item: ProvinceInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Province_name}
                  </option>
                ))}
              </Select>
            </FormControl>
        </Grid>

        <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>อำเภอ</p>
              <Select
                native
                value={patient.DistrictID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "DistrictID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกอำเภอ
                </option>
                {district.map((item: DistrictInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.District_name}
                  </option>
                ))}
              </Select>
            </FormControl>
        </Grid>

        <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ตำบล</p>
              <Select
                native
                value={patient.Sub_districtID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "Sub_districtID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกตำบล
                </option>
                {subdistrict.map((item: Sub_districtInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Sub_district_name}
                  </option>
                ))}
              </Select>
            </FormControl>
        </Grid>

        <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เพศ</p>
              <Select
                native
                value={patient.GenderID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "GenderID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกเพศ
                </option>
                {gender.map((item: GenderInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Gender_name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>อาการเบื้องต้น</p>
              <Select
                native
                value={patient.SymptomID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "SymptomID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกอาการเบื้องต้น
                </option>
                {symptom.map((item: SymptomInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Symptom_name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/patients"
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

export default PaitentCreate;
