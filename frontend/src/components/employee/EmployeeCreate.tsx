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

import { RoleInterface } from "../../models/IRole";
import { GenderInterface } from "../../models/IGender";
import { ProvinceInterface } from "../../models/IProvince";
import { EmployeeInterface } from "../../models/IEmployee";
import { DistrictInterface } from "../../models/IDistrict";
import { Sub_districtInterface } from "../../models/ISub_district";

import {
  GetEmployee,
  GetRole,
  GetGender,
  GetProvince,
  // GetDistrict,
  // GetSubdistrict,
  CreateEmployee,
} from "../../services/HttpClientService";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function EmployeeCreate() {
  const [gender, setGender] = useState<GenderInterface[]>([]);
  const [role, setRole] = useState<RoleInterface[]>([]);
  const [province, setProvince] = React.useState<ProvinceInterface[]>([]);
  const [district, setDistrict] = React.useState<DistrictInterface[]>([]);
  const [subdistrict, setSubdistrict] = React.useState<Sub_districtInterface[]>([]);
  const [employee, setEmployee] = useState<Partial<EmployeeInterface>>({});
  const [provinceId, setProvinceId] = useState('0');
  const [districtId, setDistrictId] = useState('0');

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setAlertMessage] = React.useState("");

  const apiUrl = "http://localhost:8080";
  const requestOptions = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  };
  

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

    const handleChangeProvince = (event: SelectChangeEvent) => {
      setProvinceId(event.target.value);
      console.log(event.target.value)
      getDistrict();
      const name = event.target.name as keyof typeof EmployeeCreate;
      setEmployee({
      ...employee,
      [name]: event.target.value,
    });
    }
    const handleChangeDistrict = (event: SelectChangeEvent) => {
      setDistrictId(event.target.value);
      console.log(event.target.value)
      getSubdistrict();
      const name = event.target.name as keyof typeof EmployeeCreate;
      setEmployee({
      ...employee,
      [name]: event.target.value,
    });
    }

    const clickChang = () => {
      getDistrict();
      getSubdistrict();
    }

    //combobox
    const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof EmployeeCreate;
    setEmployee({
      ...employee,
      [name]: event.target.value,
    });
  };

  //text field
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof employee;
    const { value } = event.target;
    setEmployee({ ...employee, [id]: value });
  };
  
  const getGender = async () => {
    let res = await GetGender();
    if (res) {
      setGender(res);
    }
  };

  const getRole = async () => {
    let res = await GetRole();
    if (res) {
      setRole(res);
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

  useEffect(() => {
    getGender();
    getRole();
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
      Employee_number: employee.Employee_number,
      FirstName: employee.FirstName,
      LastName: employee.LastName,
      Personal_id: employee.Personal_id,
      Password: employee.Password,
      Phone: employee.Phone,
      House_no: employee.House_no,
      RoleID: convertType(employee.RoleID),
      GenderID: convertType(employee.GenderID),
      ProvinceID: convertType(employee.ProvinceID),
      DistrictID: convertType(employee.DistrictID),
      Sub_districtID: convertType(employee.Sub_districtID),
    };
    console.log(data);

    let res = await CreateEmployee(data);
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
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
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
              สร้างข้อมูลพนักงาน
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>

        <Grid item xs={6}>
            <p>รหัสพนักงาน</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Employee_number"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกรหัสพนักงาน"
                value={employee.Employee_number || ""}
                onChange={handleInputChange}
                inputProps={{maxLength :8}}
              />
            </FormControl>
        </Grid>

        <Grid item xs={6}>
            <p>บัตรประจำตัวประชาชน</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Personal_id"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกบัตรประชาชน"
                value={employee.Personal_id || ""}
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
                value={employee.FirstName || ""}
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
                value={employee.LastName || ""}
                onChange={handleInputChange}
              />
            </FormControl>
        </Grid>
        
        <Grid item xs={6}>
            <p>รหัสผ่าน</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Password"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกรหัสผ่าน"
                value={employee.Password?.replace(/./g, "*") || ""}
                onChange={handleInputChange}
              />
            </FormControl>
        </Grid>

        <Grid item xs={6}>
            <p>เบอร์โทรศัพท์</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Phone"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกเบอร์โทรศัพท์"
                value={employee.Phone || ""}
                onChange={handleInputChange}
                inputProps={{maxLength :10}}
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
                value={employee.House_no || ""}
                onChange={handleInputChange}
              />
            </FormControl>
        </Grid>
        
        <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>จังหวัด</p>
              <Select
                native
                value={employee.ProvinceID + ""}
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
              {/* {provinceId && <div>Selected province id: {provinceId}</div>} */}
            </FormControl>
        </Grid>

        <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>อำเภอ</p>
              <Select
                native
                value={employee.DistrictID + ""}
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
              {/* {districtId && <div>Selected district id: {districtId}</div>} */}
            </FormControl>
        </Grid>

        <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>ตำบล</p>
              <Select
                native
                value={employee.Sub_districtID + ""}
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
                value={employee.GenderID + ""}
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
              <p>ตำแหน่งงาน</p>
              <Select
                native
                value={employee.RoleID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "RoleID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกบทบาท
                </option>
                {role.map((item: RoleInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Role_name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Button
              component={RouterLink}
              to="/employees"
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

export default EmployeeCreate;
