import React, { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
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
  GetGender,
  GetProvince,
//   GetDistrict,
//   GetSubdistrict,
  CreateEmployee,
  GetEmployeeByUID,
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
  const [provinceId, setProvinceId] = useState('0');
  const [districtId, setDistrictId] = useState('0');

  //เพิ่มเพื่อรับข้อมูลมาโชว์ตอนอัพเดต
  const [personal, setPersonal] = React.useState<string>("");
  const [firstname, setfn] = React.useState<string>("");
  const [lastname, setLn] = React.useState<string>("");
  const [old, setOld] = React.useState(0);
  const [weight, setWeight] = React.useState(0);
  const [height, setHeight] = React.useState(0);
  const [ud, setUd] = React.useState<string>("");
  const [drug, setDrug] = React.useState<string>("");
  const [house, setHouse] = React.useState<string>("");
  const [sn, setSn] = React.useState<string>("");

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false)

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };

  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:8080/patients/${id}`)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                setPersonal(res.data.Personal_id.toString());
                setfn(res.data.FirstName.toString());
                setLn(res.data.LastName.toString());
                setOld(res.data.Old);
                setWeight(res.data.Weight);
                setHeight(res.data.Height);
                setUd(res.data.Underlying_disease.toString());
                setDrug(res.data.Drug_alergy.toString());
                setHouse(res.data.House_no .toString());
                setSn(res.data.Symptom_name.toString());
            }
        }
        )
}, [id])

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

  //เพิ่มเมื่อมีการเปลี่ยนแปลงของจังหวัดส่ง id จังหวัดไปที่อ ำเภอ
  const handleChangeProvince = (event: SelectChangeEvent) => {
    setProvinceId(event.target.value);
    console.log(event.target.value)
    //เลือกใช้เพื่อส่งข้อมูลแบบ realtime
    getDistrict();
    //เพื่อบันทึกลง employee
    const name = event.target.name as keyof typeof PaitentCreate;
    setPatient({
      ...patient,
      [name]: event.target.value,
    });
  }

  const clickChang = () => {
    getDistrict();
    getSubdistrict();
  }

  //เพิ่มเมื่อมีการเปลี่ยนแปลงของอำเภอส่ง id จังหวัดไปที่ตำบล
  const handleChangeDistrict = (event: SelectChangeEvent) => {
    setDistrictId(event.target.value);
    console.log(event.target.value)
    getSubdistrict();
    const name = event.target.name as keyof typeof PaitentCreate;
    setPatient({
      ...patient,
      [name]: event.target.value,
    });
  }
  
  const openChange = (event: SelectChangeEvent) => {
    console.log(event.target.value)
    const value = event.target.value;
    if (value === "1" || value === "3") {
      setOpen(true);
    } else if (value === "2") {
      setOpen(false);
    }
    console.log(open)
    const name = event.target.name as keyof typeof PaitentCreate;
    setPatient({
      ...patient,
      [name]: event.target.value,
    });
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
    let id = provinceId
    fetch(`${apiUrl}/district/${id}`, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return setDistrict(res.data);
        } else {
          return false;
        }
      });
  };

  const getSubdistrict = async () => {
    let id = districtId
    fetch(`${apiUrl}/subdistrict/${id}`)
      .then((response) => response.json())
      .then((res) => {
        if (res.data) {
          return setSubdistrict(res.data);
        } else {
          return false;
        }
      });
  
  };

  const getPatient = async () => {
    let res = await GetPatient();
    if (res) {
      setPatient(res);
    }
  };

  // const getEmployeeByUID = async ()=>{
  //   let res = await GetEmployeeByUID();
  //   patient.EmployeeID = res.ID;
  //   if (res) {
  //     setEmployee(res);
  //   }
  // }


  useEffect(() => {
    getPatient();
    getGender();
    getSymptom();
    getProvince();
    getDistrict();
    getSubdistrict();
    // getEmployeeByUID();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };


  
  async function submit() {
    let data = {
      FirstName: firstname,
      LastName: lastname,
      Personal_id: personal,
      Symptom_name: sn || "-",
      Old: convertType(old),
      Weight: convertType(weight),
      Height: convertType(height),
      Underlying_disease: ud,
      Drug_alergy: drug,
      House_no: house,
      SymptomID: convertType(patient.SymptomID),
      GenderID: convertType(patient.GenderID),
      ProvinceID: convertType(patient.ProvinceID),
      DistrictID: convertType(patient.DistrictID),
      Sub_districtID: convertType(patient.Sub_districtID),
      EmployeeID: convertType(patient.EmployeeID),
    };

    const requestOptions = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/patients/${id}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            if (res.data) {
                setSuccess(true);
            } else {
                setError(true);
            }
        });
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
            อัปเดตข้อมูลสำเร็จ
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error">
            อัปเดตข้อมูลไม่สำเร็จ
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
                value={personal}
                onChange={(event) => setPersonal(event.target.value)}
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
                value={firstname}
                onChange={(event) => setfn(event.target.value)}
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
                value={lastname}
                onChange={(event) => setLn(event.target.value)}
              />
            </FormControl>
        </Grid>
        
        <Grid item xs={6}>
            <p>อายุ</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Old"
                variant="outlined"
                type="number"
                size="medium"
                InputProps={{ inputProps: { min: 1 } }}
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="กรุณากรอกอายุ"
                value={patient.Old || "" || old}
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
                type="number"
                size="medium"
                InputProps={{ inputProps: { min: 1 } }}
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="กรุณากรอกน้ำหนัก"
                value={patient.Weight || "" || weight}
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
                type="number"
                size="medium"
                InputProps={{ inputProps: { min: 1 } }}
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="กรุณากรอกส่วนสูง"
                value={patient.Height || "" || height}
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
                value={ud}
                onChange={(event) => setUd(event.target.value)}
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
                value={drug}
                onChange={(event) => setDrug(event.target.value)}
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
                value={house}
                onChange={(event) => setHouse(event.target.value)}
              />
            </FormControl>
        </Grid>
        
        <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>จังหวัด</p>
              <Select
                native
                value={patient.ProvinceID + ""}
                onChange={handleChangeProvince}
                onClick={clickChang}
                inputProps={{
                  name: "ProvinceID",
                }}
              >
                <option aria-label="None" value="0">
                  กรุณาเลือกจังหวัด
                </option>
                {province.map((item: ProvinceInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Province_name}
                  </option>
                ))}
              </Select>
              {provinceId && <div>Selected province id: {provinceId}</div>}
            </FormControl>
        </Grid>

        <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>อำเภอ</p>
              <Select
                native
                value={patient.DistrictID + ""}
                onChange={handleChangeDistrict}
                onClick={clickChang}
                inputProps={{
                  name: "DistrictID",
                }}
              >
                <option aria-label="None" value="0">
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
                <option aria-label="None" value="0">
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
                onChange={openChange}
                inputProps={{
                  name: "SymptomID",
                }}
              >
              <option aria-label="None" value="">
                  กรุณาเลือกอาการเบื้องต้น
              </option>
                {symptom.map((item: SymptomInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Symptom_choice}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* {ถ้า open เป็นจริงถึงทำ */}
          {open && (
              <Grid item xs={12} >
              <p>รายละเอียดเพิ่มเติม</p>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    id="Symptom_name"
                    variant="outlined"
                    type="string"
                    size="medium"
                    placeholder="กรุณากรอกรายละเอียด"
                    value={sn}
                    onChange={(event) => setSn(event.target.value)}
                  />
                </FormControl>
              </Grid>
          )}

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
               อับเดตข้อมูล
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default PaitentCreate;