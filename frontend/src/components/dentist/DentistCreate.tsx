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

import { GenderInterface } from "../../models/IGender";
import { SpecializedInterface } from "../../models/ISpecialized";
import { UniversityInterface } from "../../models/IUniversity";
import { RoleInterface } from "../../models/IRole";
import { ProvinceInterface } from "../../models/IProvince"; 

import {
  GetGender,
  GetSpecializeds,
  GetUniversitys,
  GetRole,
  GetProvince,
  CreateDentists,

} from "../../services/HttpClientService";
import { DentistInterface } from "../../models/IDentist";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function DentistCreate() {
  const [gender, setGenders] = useState<GenderInterface[]>([]);
  const [specialized, setSpecializeds] = useState<SpecializedInterface[]>([]);
  const [university, setUniversitys] = useState<UniversityInterface[]>([]);
  const [role, setRoles] = useState<RoleInterface[]>([]);
  const [province, setProvinces] = React.useState<ProvinceInterface[]>([]);
  const [dentist, setDentists] = useState<Partial<DentistInterface>>({});

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
    const name = event.target.name as keyof typeof DentistCreate;
    setDentists({
      ...dentist,
      [name]: event.target.value,
    });
  };

  //text field
  const handleInputChange = (
    event: React.ChangeEvent<{ id?: string; value: any }>
  ) => {
    const id = event.target.id as keyof typeof dentist;
    const { value } = event.target;
    setDentists({ ...dentist, [id]: value });
  };
  
  const getGenders = async () => {
    let res = await GetGender();
    if (res) {
      setGenders(res);
    }
  };

  const getSpecializeds = async () => {
    let res = await GetSpecializeds();
    if (res) {
      setSpecializeds(res);
    }
  };

  const getUniversitys = async () => {
    let res = await GetUniversitys();
    if (res) {
      setUniversitys(res);
    }
  };

  const getRoles = async () => {
    let res = await GetRole();
    if (res) {
      setRoles(res);
    }
  };


  const getProvinces = async () => {
    let res = await GetProvince();
    if (res) {
      setProvinces(res);
    }
  };

  useEffect(() => {
    getGenders();
    getSpecializeds();
    getUniversitys();
    getRoles();
    getProvinces();
  }, []);

  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };


  
  async function submit() {
    let data = {
      FirstName: dentist.FirstName,
      LastName: dentist.LastName,
      Personal_id: dentist.Personal_id,
      Age:   convertType(dentist.Age),
      Email: dentist.Email,
      Password: dentist.Password,
      Phone_Number: dentist.Phone_Number,

      GenderID: convertType(dentist.GenderID),
      SpecializedID: convertType(dentist.SpecializedID),
      UniversityID: convertType(dentist.UniversityID),
      RoleID:     convertType(dentist.RoleID),
      ProvinceID: convertType(dentist.ProvinceID),
    };
    console.log(data);

    let res = await CreateDentists(data);
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
      <Paper  sx ={{ bgcolor :"#E3E3E3"}}>
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
              สร้างข้อมูลทันตแพทย์
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Grid container spacing={3} sx={{ padding: 2 }}>

        <Grid item xs={6}>
            <p>ชื่อ</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="FirstName"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกชื่อ"
                value={dentist.FirstName || ""}
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
                value={dentist.LastName || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p>อายุ</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Age"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกอายุ"
                value={dentist.Age || ""}
                onChange={handleInputChange}
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
                value={dentist.Personal_id || ""}
                onChange={handleInputChange}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)){
                    e.preventDefault()
                  }
                }}
                inputProps={{maxLength :13}}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p>เบอร์โทรศัพท์</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Phone_Number"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกเบอร์โทรศัพท์"
                value={dentist.Phone_Number || ""}
                onChange={handleInputChange}
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)){
                    e.preventDefault()
                  }
                }}
                inputProps={{maxLength :10}}
              />
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <p>อีเมลล์</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Email"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกอีเมลล์"
                value={dentist.Email || ""}
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
                value={dentist.Password || ""}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>


          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>เพศ</p>
              <Select
                native
                value={dentist.GenderID + ""}
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
              <p>สาขา</p>
              <Select
                native
                value={dentist.SpecializedID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "SpecializedID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกสาขา
                </option>
                {specialized.map((item: SpecializedInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.Specialized_Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>มหาวิทยาลัย</p>
              <Select
                native
                value={dentist.UniversityID + ""}
                onChange={handleChange}
                inputProps={{
                  name: "UniversityID",
                }}
              >
                <option aria-label="None" value="">
                  กรุณาเลือกมหาวิทยาลัย
                </option>
                {university.map((item: UniversityInterface) => (
                  <option value={item.ID} key={item.ID}>
                    {item.University_Name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Grid>


          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <p>จังหวัด</p>
              <Select
                native
                value={dentist.ProvinceID + ""}
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
              <p>บทบาท</p>
              <Select
                native
                value={dentist.RoleID + ""}
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
              to="/dentists"
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

export default DentistCreate;
