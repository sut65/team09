import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from "@mui/material/FormControl";
import InputLabel from '@mui/material/InputLabel';
import { Link as RouterLink, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
//import Interface
import { WorkingdayInterface } from '../../models/IWorkingday';
import { ResponsityInterface } from '../../models/IResponsity';
import { DentistSceheduleInterface } from "../../models/IDentistScheduleInterface";
import { DentistInterface } from '../../models/IDentist';
import { Room_NumberInterface } from '../../models/IRoom_Number';

import {
  GetDentistScehedules,
  GetResponsitys,
  DentistScehedules,
  GetWorkingdays,
  GetDentists,
  GetRoom_Number,
  DentistSchedulesUpdate,
} from "../../services/HttpClientService";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const apiUrl = "http://localhost:8080";
const requestOptions = {
  method: "GET",
  headers: {
    //Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json"
  },
};

function DentistScheduleUpdate() {

  const [dentists, setDentists] = useState<DentistInterface[]>([]);
  const [workingdays, setWorkingdays] = useState<WorkingdayInterface[]>([]);
  const [responsitys, setResponsitys] = useState<ResponsityInterface[]>([]);
  const [room_number, setRoomnumber] = useState<Room_NumberInterface[]>([]);
  const [dentist_schedule, setDentistScehedule] = useState<DentistSceheduleInterface>({
    Job_description: "",
    TimeWork: new Date(),
    TimeEnd: new Date(),
  });

  const [denname, setDenname] = React.useState<string>("");
  const [work, setWork] = React.useState<string>("");
  const [respon, setRespon] = React.useState<string>("");
  const [room, setRoom] = React.useState<string>("");


  const [message, setAlertMessage] = React.useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    GetDentistScehedules();
    fetch(`http://localhost:8080/dentist_schedules/${id}`)
      .then((response) => response.json())
      .then((res) => {
        fetch(`http://localhost:8080/dentist/${res.data.DentistID}`)
          .then((response) => response.json())
          .then((res) => {
            if (res.data) {
              console.log(res.data)
              setDenname(res.data.FirstName)
              dentist_schedule.DentistID = res.data.ID

            }
          }
          )
        fetch(`http://localhost:8080/responsity/${res.data.ResponsityID}`)
          .then((response) => response.json())
          .then((res) => {
            if (res.data) {
              setRespon(res.data.Respon)
              dentist_schedule.ResponsityID = res.data.ID

            }
          }
          )

        fetch(`http://localhost:8080/room_number/${res.data.Room_NumberID}`)
          .then((response) => response.json())
          .then((res) => {
            if (res.data) {
              setRoom(res.data.Room_number)
              dentist_schedule.Room_NumberID = res.data.ID

            }
          }
          )

        fetch(`http://localhost:8080/workingday/${res.data.WorkingdayID}`)
          .then((response) => response.json())
          .then((res) => {
            if (res.data) {
              console.log(res.data.Day)
              setWork(res.data.Day)
              dentist_schedule.WorkingdayID = res.data.ID
            }
          }
          )
      }
    
      )
  }, [id])


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

  const handleChange = (event: SelectChangeEvent) => {
    const name = event.target.name as keyof typeof dentist_schedule;
    setDentistScehedule({
      ...dentist_schedule,
      [name]: event.target.value,
    });
  };

  const getResponsitys = async () => {
    let res = await GetResponsitys();
    dentist_schedule.ResponsityID = res.ID;
    if (res) {
      setResponsitys(res);
    }
  };

  const getDentists = async () => {
    let res = await GetDentists();
    dentist_schedule.DentistID = res.ID;
    if (res) {
      setDentists(res);
    }
  };
  const getRoom_Number = async () => {
    let res = await GetRoom_Number();
    dentist_schedule.Room_NumberID = res.ID;
    if (res) {
      setRoomnumber(res);
    }
  };

  const getWorkingdays = async () => {
    let res = await GetWorkingdays();
    dentist_schedule.WorkingdayID = res.ID;
    if (res) {
      setWorkingdays(res);
    }
  };
  useEffect(() => {
    getResponsitys();
    getWorkingdays();
    getDentists();
    getRoom_Number();
  }, []);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));




  const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
  };
  async function submit() {
    let data = {
      DentistID: convertType(dentist_schedule.DentistID),
      ResponsityID: convertType(dentist_schedule.ResponsityID),
      WorkingdayID: convertType(dentist_schedule.WorkingdayID),
      Room_NumberID: convertType(dentist_schedule.Room_NumberID),
      Job_description: dentist_schedule.Job_description,
      TimeWork: dentist_schedule.TimeWork,
      TimeEnd: dentist_schedule.TimeEnd,
    };
    console.log(data);
    let res: any = await DentistSchedulesUpdate(data);
    if (res.status) {
      setAlertMessage("อัพเดตข้อมูลาำเร็จ");
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

        fetch(`${apiUrl}/dentist_schedules/${id}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res)
                if (res) {
                    return { status: false, message: res.Dentist_schedule };
                } else {
                    return { status: false, message: res.error };
                }
            });
    }
  
  const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name as keyof typeof dentist_schedule;
    setDentistScehedule({
      ...dentist_schedule,
      [name]: event.target.value,
    });

  };



  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
      </Box>
      <Container maxWidth="lg">
        <Snackbar
          open={success}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleClose} severity="success">
            {message}
          </Alert>
        </Snackbar>
        <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}>
          <Alert onClose={handleClose} severity="error">
            {message}
          </Alert>
        </Snackbar>
        {/* <Box sx={{ bgcolor: '#cfe8fc', height: '100vh', width: '190vh' }} /> */}
        <Paper >
          <Box
            display={"flex"}
            sx={{
              marginTop: 2,
              paddingX: 2,
              paddingY: 2,
            }}
          >
            <h2>Dentist Schedule Create</h2>
          </Box>
          <hr />
          <Grid container spacing={1} sx={{ padding: 2 }}>
            <Grid xs={6} sx={{ padding: 1.3 }}>
              <FormControl sx={{ width: 400 }}>
                <InputLabel id="demo-simple-select-label">งานที่รับผิดชอบ</InputLabel>
                <Select
                  native
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={dentist_schedule.ResponsityID + ""}
                  onChange={handleChange}
                  label="งานที่รับผิดชอบ"
                  inputProps={{
                    name: "ResponsityID",
                  }}
                >
                  <option aria-label="None" value="">
                    {respon}
                  </option>
                  {responsitys.map((item: ResponsityInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.Respon}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={6} sx={{ padding: 1.3 }}>
              <FormControl sx={{ width: 400 }}>
                <InputLabel id="demo-simple-select-label">วันเข้าทำงาน</InputLabel>
                <Select
                  native
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={dentist_schedule.WorkingdayID + ""}
                  onChange={handleChange}
                  label="วันเข้าทำงาน"
                  inputProps={{
                    name: "WorkingdayID",
                  }}
                >
                  <option aria-label="None" value="">
                    {work}
                  </option>
                  {workingdays.map((item: WorkingdayInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.Day}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={6} sx={{ padding: 1.3 }}>
              <FormControl sx={{ width: 400 }}>
                <InputLabel id="demo-simple-select-label">ทันตแพทย์</InputLabel>
                <Select
                  native
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={dentist_schedule.DentistID + ""}
                  onChange={handleChange}
                  label="ทันตแพทย์"
                  inputProps={{
                    name: "DentistID",
                  }}
                >
                  <option aria-label="None" value="">
                    {denname}
                  </option>
                  {dentists.map((item: DentistInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.FirstName}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={6} sx={{ padding: 1.3 }}>
              <FormControl sx={{ width: 400 }}>
                <InputLabel id="demo-simple-select-label">ห้องตรวจ</InputLabel>
                <Select
                  native
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={dentist_schedule.Room_NumberID + ""}
                  onChange={handleChange}
                  label="ห้องตรวจ"
                  inputProps={{
                    name: "Room_NumberID",
                  }}
                >
                  <option aria-label="None" value="">
                    {room}
                  </option>
                  {room_number.map((item: Room_NumberInterface) => (
                    <option value={item.ID} key={item.ID}>
                      {item.ID}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={6} sx={{ padding: 1.3 }}>
              <TextField fullWidth id="Job_description" type="string" label="Job description" variant="outlined"
                onChange={handleChangeTextField}
                defaultValue="กรุณากรอกรายละเอียดงาน"
                inputProps={{
                  name: "Job_description",
                }}
              />
            </Grid>
            <Grid xs={3} sx={{ padding: 1.3 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="เวลาเข้าทำงานแพทย์"
                  value={dentist_schedule.TimeWork}
                  onChange={(newValue) => {
                    setDentistScehedule({
                      ...dentist_schedule,
                      TimeWork: newValue,
                    });
                  }}

                />
              </LocalizationProvider>
            </Grid>
            <Grid xs={3} sx={{ padding: 1.3 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="วันเวลาออกงานแพทย์"
                  value={dentist_schedule.TimeEnd}
                  onChange={(newValue) => {
                    setDentistScehedule({
                      ...dentist_schedule,
                      TimeEnd: newValue,
                    });
                  }}

                />
              </LocalizationProvider>
            </Grid>
            <Grid xs={6} sx={{ padding: 1.3 }}>

            </Grid>
            <Grid xs={3.25} sx={{ padding: 1.3 }}>

            </Grid>
            <Grid xs={2.75} sx={{ padding: 1.3 }}>
              <Button sx={{ paddingY: 1.7, }} fullWidth variant="outlined" size="large" onClick={submit}>
                อัพเดตข้อมูล
              </Button>

            </Grid>
            <Grid xs={6}>

            </Grid>
            <Grid xs={6}>

            </Grid>
            <Grid xs={3}>

            </Grid>
          </Grid>

        </Paper >

        <Grid xs={12}>

        </Grid>

      </Container>

    </div>

  );





}
export default DentistScheduleUpdate;