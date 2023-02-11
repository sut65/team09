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

import { Room_NumberInterface } from "../../models/IRoom_Number";
import { CategoryInterface } from "../../models/ICategory";
import { MedicalDeviceInterface } from "../../models/IMedicaldevice";
import { Room_DetailInterface } from "../../models/IRoom_Detail";


import { GetRoom_Number,
         GetCategory,
         GetMedicalDevice,
         CreateRoom_Details, } from "../../services/HttpClientService";


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


function Room_DetailCreate() {
    const [room_number, setRoom_Number] = React.useState<Room_NumberInterface[]>([]);
    const [category, setCategory] = useState<CategoryInterface[]>([]);
    const [medicaldevice, setMedicaldevice] = useState<MedicalDeviceInterface[]>([]);
    const [room_detail, setRoom_detail] = useState<Partial<Room_DetailInterface>>({});

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
        const name = event.target.name as keyof typeof Room_DetailCreate;
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

      useEffect(() => {
        getRoom_Numbers();
        getCategorys();
        getMedicalDevices();
      }, []);


      const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
      };

      async function submit() {
        let data = {
            Note: room_detail.Note,

            Room_numberID: convertType(room_detail.Room_NumberID),
            CategoryID: convertType(room_detail.CategoryID),
            MedicalDeviceID: convertType(room_detail.MedicalDeviceID),
          };
          console.log(data);

    
          let res = await CreateRoom_Details(data);
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
                  สร้างข้อมูลห้อง
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
                    onChange={handleChange}
                    inputProps={{
                      name: "Room_NumberID",
                    }}
                  >
                    <option aria-label="None" value="">
                      กรุณาเลือกหมายเลขห้อง
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
                    onChange={handleChange}
                    inputProps={{
                      name: "CategoryID",
                    }}
                  >
                    <option aria-label="None" value="">
                      กรุณาเลือกประเภทห้อง
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
                    onChange={handleChange}
                    inputProps={{
                      name: "MedicalDeviceID",
                    }}
                  >
                    <option aria-label="None" value="">
                      กรุณาเลือกเครื่องมือทันตกรรม
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
                <p>หมายเหตุ</p>
                <FormControl fullWidth variant="outlined">
                  <TextField
                    id="Note"
                    variant="outlined"
                    type="string"
                    size="medium"
                    placeholder="หมายเหตุ"
                    value={room_detail.Note || ""}
                    onChange={handleInputChange}
                  />
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
    
    export default Room_DetailCreate;
