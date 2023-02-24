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
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { Room_NumberInterface } from "../../models/IRoom_Number";
import { CategoryInterface } from "../../models/ICategory";
import { MedicalDeviceInterface } from "../../models/IMedicaldevice";
import { Room_DetailInterface } from "../../models/IRoom_Detail";


import { GetRoom_Number,
         GetCategory,
         GetMedicalDevice,
         GetRoom_Detail,
         UpdateRoomDetails, } from "../../services/HttpClientService";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


function Room_DetailUpdate() {
    const [room_number, setRoom_Number] = React.useState<Room_NumberInterface[]>([]);
    const [category, setCategory] = useState<CategoryInterface[]>([]);
    const [medicaldevice, setMedicaldevice] = useState<MedicalDeviceInterface[]>([]);
    const [room_detail, setRoom_detail] = useState<Partial<Room_DetailInterface>>({
      Date: new Date(),
  });

    const [room_numbers, setRoom_Numbers] = useState<string>("");
    const [categories, setCategories] = useState<string>("");
    const [medicaldevices, setMedicaldevices] = useState<string>("");
    const [note, setNote] = useState<string>("");
    const [amount, setAmount] = useState<string>("");

    const [rnid, setRNid] = useState<string>("");
    const [cid, setCid] = useState<string>("");
    const [mid, setMid] = useState<string>("");
    

    const [message, setAlertMessage] = React.useState("");
  
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    
    const apiUrl = "http://localhost:8080";
    // const requestOptions = {
    //   method: "GET",
    //   headers: {
    //       Authorization: `Bearer ${localStorage.getItem("token")}`,
    //       "Content-Type": "application/json"
    //     },
    // };

    const { id } = useParams();

    useEffect(() => {
    getRoom_Detail();
      fetch(`${apiUrl}/room_detail/${id}`)
          .then((response) => response.json())
          .then((res) => {

              if (res.data) {
                  setNote(res.data.Note.toString());
                  setAmount(res.data.Amount.toString())

                  console.log(res.data.Note)
                  fetch(`${apiUrl}/room_number/${res.data.Room_NumberID}`)
                    .then((response) => response.json())
                    .then((res) => {
                        if (res.data) {
                            setRoom_Numbers(res.data.Room_number)
                            setRNid(res.data.ID)
                            
                            console.log(res.data.Room_NumberID)
                        }
                    }
                  )

                  fetch(`${apiUrl}/category/${res.data.CategoryID}`)
                    .then((response) => response.json())
                    .then((res) => {
                        if (res.data) {
                            setCategories(res.data.Category_Name)
                            setCid(res.data.ID)

                            console.log(res.data.CategoryID)
                        }
                    }
                  )

                  fetch(`${apiUrl}/medicaldevice/${res.data.MedicalDeviceID}`)
                    .then((response) => response.json())
                    .then((res) => {
                        if (res.data) {
                            setMedicaldevices(res.data.Device_Name)
                            setMid(res.data.ID)

                            console.log(res.data.MedicalDeviceID)
                        }
                    }
                  )

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
        const name = event.target.name as keyof typeof Room_DetailUpdate;
        setRoom_detail({
          ...room_detail,
          [name]: event.target.value,
        });
      };
    
      //text field
      const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
      ) => {
        const id = event.target.id as keyof typeof room_detail;
        const { value } = event.target;
        setRoom_detail({ ...room_detail, [id]: value });
      };

      const handleChangeRoom_number = (event: SelectChangeEvent) => {
        setRNid(event.target.value);
        console.log(event.target.value)
        const name = event.target.name as keyof typeof Room_DetailUpdate;
        setRoom_detail({
        ...room_detail,
        [name]: event.target.value,
      });
      }
      
      const handleChangeCategory = (event: SelectChangeEvent) => {
        setCid(event.target.value);
        console.log(event.target.value)
        const name = event.target.name as keyof typeof Room_DetailUpdate;
        setRoom_detail({
        ...room_detail,
        [name]: event.target.value,
      });
      }

      const handleChangeMedicalDevice = (event: SelectChangeEvent) => {
        setMid(event.target.value);
        console.log(event.target.value)
        const name = event.target.name as keyof typeof Room_DetailUpdate;
        setRoom_detail({
        ...room_detail,
        [name]: event.target.value,
      });
      }


      const getRoom_Numbers = async () => {
        let res = await GetRoom_Number();
        if (res) {
          console.log(res)
          setRoom_Number(res);
        }
      };
    
      const getCategorys = async () => {
        let res = await GetCategory();
        if (res) {
          setCategory(res);
        }
      };

      const getMedicalDevices = async () => {
        let res = await GetMedicalDevice();
        if (res) {
          setMedicaldevice(res);
        }
      };

      const getRoom_Detail = async () => {
        let res = await GetRoom_Detail();
        if (res) {
          setRoom_detail(res);
        }
      };

      useEffect(() => {
        getRoom_Numbers();
        getCategorys();
        getMedicalDevices();
        getRoom_Detail();
      }, []);


      const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
      };

      async function submit() {
        let data = {
            Note: note,
            Amount: convertType(amount),
            Date: room_detail.Date,

            Room_numberID: convertType(rnid),
            CategoryID: convertType(cid),
            MedicalDeviceID: convertType(mid),
          };
          console.log(data);

          let res: any = await UpdateRoomDetails(data);
        if (res.status) {
            setAlertMessage("อัปเดตข้อมูลสำเร็จ");
            setSuccess(true);
        } else {
            setAlertMessage(res.message);
            setError(true);
        }
        console.log(JSON.stringify(data))
        const requestOptions = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    };

    fetch(`${apiUrl}/room_details/${id}`, requestOptions)
        .then((response) => response.json())
        .then((res) => {
            console.log(res)
            if (res) {
                return { status: false, message: res.Room_detail };
            } else {
                return { status: false, message: res.error };
            }
            
        });
        if (res.status) {
          setAlertMessage("อัปเดตข้อมูลสำเร็จ");
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
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert onClose={handleClose} severity="error">
             {message}
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
                  แก้ไขข้อมูลห้อง ID : {id}
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Grid container spacing={3} sx={{ padding: 2 }}>
    
    
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <p>หมายเลขห้อง</p>
                  <Select
                    native
                    value={room_detail.Room_NumberID + ""}
                    onChange={handleChangeRoom_number}
                    inputProps={{
                      name: "Room_NumberID",
                    }}
                  >
                    <option aria-label="None" value="">
                      {room_numbers}
                    </option>
                    {room_number.map((item: Room_NumberInterface) => (
                      <option value={item.ID} key={item.ID}>
                        {item.Room_number}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
    
    
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <p>ประเภทห้อง</p>
                  <Select
                    native
                    value={room_detail.CategoryID + ""}
                    onChange={handleChangeCategory}
                    inputProps={{
                      name: "CategoryID",
                    }}
                  >
                    <option aria-label="None" value="">
                      {categories}
                    </option>
                    {category.map((item: CategoryInterface) => (
                      <option value={item.ID} key={item.ID}>
                        {item.Category_Name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
    
    
              <Grid item xs={6}>
                <FormControl fullWidth variant="outlined">
                  <p>เครื่องมือทันตกรรม</p>
                  <Select
                    native
                    value={room_detail.MedicalDeviceID + ""}
                    onChange={handleChangeMedicalDevice}
                    inputProps={{
                      name: "MedicalDeviceID",
                    }}
                  >
                    <option aria-label="None" value="">
                      {medicaldevices}
                    </option>
                    {medicaldevice.map((item: MedicalDeviceInterface) => (
                      <option value={item.ID} key={item.ID}>
                        {item.Device_Name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                <p>จำนวน</p>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    id="Amount"
                    variant="outlined"
                    type="number"
                    size="medium"
                    placeholder="กรุณากรอกจำนวน"
                    value={amount || ""}
                    onChange={(event) => setAmount(event.target.value)}
                  />
                </FormControl>
              </Grid>

          <Grid item xs={6}>
            <p>หมายเหตุ</p>
            <FormControl fullWidth variant="outlined">
              <TextField
                id="Note"
                variant="outlined"
                type="string"
                size="medium"
                placeholder="กรุณากรอกหมายเหตุ"
                value={note || ""}
                onChange={(event) => setNote(event.target.value)}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth variant="outlined">
              <p> วันที่อัปเดตข้อมูลห้อง </p>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker 
                      renderInput={(props) => <TextField {...props} />}
                      label="วันที่อัปเดตข้อมูลห้อง"
                      value={room_detail.Date}
                      onChange={(newValue) => {
                        setRoom_detail({
                        ...room_detail,
                        Date: newValue,
                        });
                      }}
                            
                        />
                </LocalizationProvider>
              </FormControl>
            </Grid>
    
              <Grid item xs={12}>
                <Button
                  component={RouterLink}
                  to="/room_details"
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
    
    export default Room_DetailUpdate;
