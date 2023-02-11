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
    GetDentists,
  
  } from "../../services/HttpClientService";
  import { DentistInterface } from "../../models/IDentist";
import Autocomplete from "@mui/material/Autocomplete";

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


  function DentistUpdate() {
    const [gender, setGenders] = useState<GenderInterface[]>([]);
    const [specialized, setSpecializeds] = useState<SpecializedInterface[]>([]);
    const [university, setUniversitys] = useState<UniversityInterface[]>([]);
    const [role, setRoles] = useState<RoleInterface[]>([]);
    const [province, setProvinces] = React.useState<ProvinceInterface[]>([]);
    const [dentist, setDentists] = useState<Partial<DentistInterface>>({});

    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [personal_id, setPersonal_id] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [age, setAge] = useState(0);
    const [phone_number, setPhone_number] = useState<string>("");
  
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);


    const apiUrl = "http://localhost:8080";
    const requestOptions = {
      method: "GET",
      headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json"
        },
    };

    const { id } = useParams();

    useEffect(() => {
    getDentist();
      fetch(`${apiUrl}/dentist/${id}`)
          .then((response) => response.json())
          .then((res) => {

              if (res.data) {
                  console.log("Dentist FS : ")
                  console.log(res.data.FirstName)
                  setFirstname(res.data.FirstName.toString());

                  setLastname(res.data.LastName.toString());

                  // console.log("FirstName : ")
                  // console.log(res.data.FirstName)
                  setPersonal_id(res.data.Personal_id.toString());

                  // console.log("LastName : ")
                  // console.log(res.data.LastName)
                  setEmail(res.data.Email.toString());

                  setPassword(res.data.Password.toString());

                  // console.log("Phone : ")
                  // console.log(res.data.Phone)
                  setAge(res.data.Age.toString());

                  // console.log("House_no : ")
                  // console.log(res.data.House_no )
                  setPhone_number(res.data.Phone_Number .toString());

                  const dataString = JSON.stringify(res.data);
                  console.log(dataString)

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
      //combobox
      const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof dentist;
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


    const getDentist = async () => {
        let res = await GetDentists();
        if (res) {
          setDentists(res);
        }
      };
  
    useEffect(() => {
      getGenders();
      getSpecializeds();
      getUniversitys();
      getRoles();
      getProvinces();
      getDentist();
    }, []);
  
    const convertType = (data: string | number | undefined) => {
      let val = typeof data === "string" ? parseInt(data) : data;
      return val;
    };
  
  
    
    async function submit() {
      let data = {
        FirstName: dentist.FirstName ,
        LastName: dentist.LastName ,
        Personal_id: dentist.Personal_id ,
        Age:   convertType(dentist.Age),
        Email: dentist.Email ,
        Password: dentist.Password ,
        Phone_Number: dentist.Phone_Number ,
  
        GenderID: convertType(dentist.GenderID),
        SpecializedID: convertType(dentist.SpecializedID),
        UniversityID: convertType(dentist.UniversityID),
        RoleID:     convertType(dentist.RoleID),
        ProvinceID: convertType(dentist.ProvinceID),
      };
      console.log(data);
  
      const requestOptions = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/dentists/${id}`, requestOptions)
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
                แก้ไขข้อมูลทันตแพทย์ ID : {id}
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
                value={dentist.FirstName || "" || firstname}
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
                  value={dentist.LastName || "" || lastname}
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
                  InputProps={{ inputProps: { min: 1 , max: 100}}}
                  InputLabelProps={{
                  shrink: true,
                  }}
                  value={dentist.Age || "" || age}
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
              <p>บัตรประจำตัวประชาชน</p>
              <FormControl fullWidth variant="outlined">
                <TextField
                  id="Personal_id"
                  variant="outlined"
                  type="string"
                  size="medium"
                  placeholder="กรุณากรอกบัตรประชาชน"
                  value={dentist.Personal_id || "" || personal_id}
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
                  value={dentist.Phone_Number || "" || phone_number}
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
                  value={dentist.Email || "" || email}
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
                  value={dentist.Password || "" || personal_id}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Grid>

            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <p className="good-font">เพศ</p>
                    <Autocomplete
                      disablePortal
                      id="GenderID"
                      getOptionLabel={(item: GenderInterface) => `${item.Gender_name}`}
                      options={gender}
                      sx={{ width: 'auto' }}
                      isOptionEqualToValue={(option, value) =>
                          option.ID === value.ID}
                      onChange={(e, value) => { dentist.GenderID = value?.ID }}
                      renderInput={(params) => <TextField {...params} label="เลือกเพศ" />}
                    />
                </FormControl>
            </Grid>


            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <p className="good-font">สาขา</p>
                    <Autocomplete
                      disablePortal
                      id="SpecializedID"
                      getOptionLabel={(item: SpecializedInterface) => `${item.Specialized_Name}`}
                      options={specialized}
                      sx={{ width: 'auto' }}
                      isOptionEqualToValue={(option, value) =>
                          option.ID === value.ID}
                      onChange={(e, value) => { dentist.SpecializedID = value?.ID }}
                      renderInput={(params) => <TextField {...params} label="เลือกสาขา" />}
                    />
                </FormControl>
            </Grid>


            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <p className="good-font">มหาวิทยาลัย</p>
                    <Autocomplete
                      disablePortal
                      id="UniversityID"
                      getOptionLabel={(item: UniversityInterface) => `${item.University_Name}`}
                      options={university}
                      sx={{ width: 'auto' }}
                      isOptionEqualToValue={(option, value) =>
                          option.ID === value.ID}
                      onChange={(e, value) => { dentist.UniversityID = value?.ID }}
                      renderInput={(params) => <TextField {...params} label="เลือกมหาวิทยาลัย" />}
                    />
                </FormControl>
            </Grid>


            <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <p className="good-font">จังหวัด</p>
                    <Autocomplete
                      disablePortal
                      id="ProvinceID"
                      getOptionLabel={(item: ProvinceInterface) => `${item.Province_name}`}
                      options={province}
                      sx={{ width: 'auto' }}
                      isOptionEqualToValue={(option, value) =>
                          option.ID === value.ID}
                      onChange={(e, value) => { dentist.ProvinceID = value?.ID }}
                      renderInput={(params) => <TextField {...params} label="เลือกจังหวัด" />}
                    />
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
  
  export default DentistUpdate;