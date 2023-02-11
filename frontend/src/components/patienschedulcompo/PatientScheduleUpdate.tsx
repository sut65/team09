import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useParams } from "react-router-dom";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from "@mui/material/FormControl";
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";


//import Interface
import { ReasonInterface } from "../../models/IReason";
import { PatienSceheduleInterface } from "../../models/IPatienSchedule";
import { EmployeeInterface } from "../../models/IEmployee";
import { Type_of_treatments_Interface } from "../../models/IType_of_treatment";
import { PatientInterface } from "../../models/IPatient";
import { Room_NumberInterface } from '../../models/IRoom_Number';

import {
    GetPatientSchedules,
    GetTypeOfTreatment,
    GetEmployee,
    GetPatient,
    GetReasons,
    PatientSchedulesUpdate,
    PatientSchedules,
    GetRoom_Number,
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


function PatientScheduleUpdate() {

    const [patients, setPatients] = useState<PatientInterface[]>([]);
    const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
    const [reasons, setReasons] = useState<ReasonInterface[]>([]);
    const [room_number, setRoomnumber] = useState<Room_NumberInterface []>([]);
    const [type_of_treatmentses, setType_of_treatmentses] = useState<Type_of_treatments_Interface[]>([]);
    const [patien_schedule, setPatienSchedule] = useState<PatienSceheduleInterface>({
        Patien_Number: "",
        Date_time: new Date(),
    });


    const [employee, setEmployee] = React.useState<string>("");
    const [reason, setReason] = React.useState<string>("");
    const [number, setNumber] = React.useState<string>("");
    const [type, setType] = React.useState<string>("");
    const [date, setDate] = React.useState<string>("");
    const [room, setRoom] = React.useState<string>("");

    const [patientname, setPatientName] = React.useState<string>("");

    const [message, setAlertMessage] = React.useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const { id } = useParams();
    useEffect(() => {
        GetPatientSchedules();
        fetch(`http://localhost:8080/patien_schedules/${id}`)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {

                }
                fetch(`http://localhost:8080/patients/${res.data.PatientID}`)
                    .then((response) => response.json())
                    .then((res) => {
                        if (res.data) {
                            setPatientName(res.data.FirstName)
                            patien_schedule.PatientID = res.data.ID

                        }
                    }
                    )
                fetch(`http://localhost:8080/employee/${res.data.EmployeeID}`)
                    .then((response) => response.json())
                    .then((res) => {
                        if (res.data) {
                            setEmployee(res.data.FirstName)
                            patien_schedule.EmployeeID = res.data.ID

                        }
                    }
                    )

                fetch(`http://localhost:8080/reason/${res.data.ReasonID}`)
                    .then((response) => response.json())
                    .then((res) => {
                        if (res.data) {
                            setReason(res.data.Method)
                            patien_schedule.ReasonID = res.data.ID

                        }
                    }
                    )
                fetch(`http://localhost:8080/room_number/${res.data.Room_NumberID}`)
                    .then((response) => response.json())
                    .then((res) => {
                        if (res.data) {
                            setRoom(res.data.Room_number)
                            patien_schedule.Room_NumberID = res.data.ID

                        }
                    }
                    )

                fetch(`http://localhost:8080/type_of_treatments/${res.data.Type_of_treatmentID}`)
                    .then((response) => response.json())
                    .then((res) => {
                        if (res.data) {
                            setType(res.data.Type_of_treatment_name)
                            patien_schedule.Type_Of_TreatmentID = res.data.ID

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
        const name = event.target.name as keyof typeof patien_schedule;
        setPatienSchedule({
            ...patien_schedule,
            [name]: event.target.value,
        });
        console.log(patien_schedule)
    };

    const getReasons = async () => {
        let res = await GetReasons();
        patien_schedule.ReasonID = res.ID;
        if (res) {
            setReasons(res);
        }
    };

    const getType_of_treatmentses = async () => {
        let res = await GetTypeOfTreatment();
        patien_schedule.Type_Of_TreatmentID = res.ID;
        if (res) {
            setType_of_treatmentses(res);
        }
    };

    const getRoom_Number = async () => {
        let res = await GetRoom_Number();
        patien_schedule.Room_NumberID = res.ID;
        if (res) {
            setRoomnumber(res);
        }
    };

    const getEmployees = async () => {
        let res = await GetEmployee();
        patien_schedule.EmployeeID = res.ID;
        if (res) {
            setEmployees(res);
        }
    };
    const getPatients = async () => {
        let res = await GetPatient();
        patien_schedule.PatientID = res.ID;
        if (res) {
            setPatients(res);
        }
    };

    useEffect(() => {
        getReasons();
        getEmployees();
        getPatients();
        getType_of_treatmentses();
        getRoom_Number();
    }, []);
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    useEffect(() => {
        getReasons();

    }, []);
    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };
    const handleChangeTextField = (event: React.ChangeEvent<HTMLInputElement>) => {
        const name = event.target.name as keyof typeof patien_schedule;
        setPatienSchedule({
            ...patien_schedule,
            [name]: event.target.value,
        });
    };
    async function submit() {
        let data = {
            PatientID: convertType(patien_schedule.PatientID),
            EmployeeID: convertType(patien_schedule.EmployeeID),
            ReasonID: convertType(patien_schedule.ReasonID),
            Type_Of_TreatmentID: convertType(patien_schedule.Type_Of_TreatmentID),
            Room_NumberID: convertType(patien_schedule.Room_NumberID),
            Date_time: patien_schedule.Date_time,
            Patien_Number: patien_schedule.Patien_Number,
        };

        console.log(data);
        let res: any = await PatientSchedulesUpdate(data);
        if (res.status) {
            setAlertMessage("อัพเดตข้อมูลสำเร็จ");
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

        fetch(`${apiUrl}/patien_schedules/${id}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                console.log(res)
                if (res) {
                    return { status: false, message: res.Patien_schedule };
                } else {
                    return { status: false, message: res.error };
                }
            });
    }

    return (
        <Container maxWidth="lg">
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
            <Snackbar id="error" open={error} autoHideDuration={3000} onClose={handleClose}
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
                    <div className="good-font">
                        แก้ไขข้อตารางนัดผู้ป่วย ID : {id}
                    </div>
                </Box>
                <hr />
                <Grid container spacing={1} sx={{ padding: 2 }}>
                    <Grid xs={6} sx={{ padding: 1.3 }}>
                        <FormControl sx={{ width: 400 }}>
                            <InputLabel id="demo-simple-select-label">ชื่อ-สกุล</InputLabel>
                            <Select
                                native
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={patien_schedule.PatientID + ""}
                                onChange={handleChange}
                                label="ชื่อ-สกุล"
                                inputProps={{
                                    name: "PatientID",

                                }}
                            >
                                <option aria-label="None" value={patientname}>
                                    {patientname}
                                </option>
                                {patients.map((item: PatientInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.FirstName}
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
                                value={patien_schedule.EmployeeID + ""}
                                onChange={handleChange}
                                label="ทันตแพทย์"
                                inputProps={{
                                    name: "EmployeeID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    {employee}
                                </option>
                                {employees.map((item: EmployeeInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.FirstName}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid xs={6} sx={{ padding: 1.3 }}>
                        <FormControl sx={{ width: 400 }}>
                            <InputLabel id="demo-simple-select-label">หมายเหตุ</InputLabel>
                            <Select
                                native
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={patien_schedule.ReasonID + ""}
                                onChange={handleChange}
                                label="Reason"
                                inputProps={{
                                    name: "ReasonID",
                                }}
                            >
                                <option aria-label="None" value={reason}>
                                    {reason}
                                </option>
                                {reasons.map((item: ReasonInterface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Method}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid xs={6} sx={{ padding: 1.3 }}>
                    <FormControl sx = {{width: 400}}>
                        <InputLabel id="demo-simple-select-label">ห้องตรวจ</InputLabel>
                                <Select
                                    native
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={patien_schedule.Room_NumberID + ""}
                                    onChange={handleChange}
                                    label= "ห้องตรวจ"
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
                        <FormControl sx={{ width: 400 }}>
                            <InputLabel id="demo-simple-select-label">ประเภทการรักษา</InputLabel>
                            <Select
                                native
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={patien_schedule.Type_Of_TreatmentID + ""}
                                onChange={handleChange}
                                label="ประเภทการรักษา"
                                inputProps={{
                                    name: "Type_Of_TreatmentID",
                                }}
                            >
                                <option aria-label="None" value="">
                                    {type}
                                </option>
                                {type_of_treatmentses.map((item: Type_of_treatments_Interface) => (
                                    <option value={item.ID} key={item.ID}>
                                        {item.Type_of_treatment_name}
                                    </option>
                                ))}
                            </Select>
                        </FormControl>


                    </Grid>
                    <Grid xs={4.75} sx={{ padding: 1.3 }}>
                        <TextField fullWidth id="patien_number" type="string" label="Patien Number" variant="outlined"
                            onChange={handleChangeTextField}
                            defaultValue="กรุณากรอกเบอร์โทร"
                            inputProps={{
                                maxLength: 10,
                                pattern: '[0-9]*',
                                name: "Patien_Number",
                            }}
                        />


                    </Grid>
                    <Grid xs={1.25} sx={{ padding: 1.3 }}>


                    </Grid>

                    <Grid xs={9.25} sx={{ padding: 1.3 }} >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                renderInput={(props) => <TextField {...props} />}
                                label="วันนัดเข้าพบแพทย์"
                                value={patien_schedule.Date_time}
                                onChange={(newValue) => {
                                    setPatienSchedule({
                                        ...patien_schedule,
                                        Date_time: newValue,
                                    });
                                }}

                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid xs={2.75} sx={{ padding: 1.3 }}>
                        <Button sx={{ paddingY: 1.7, }} fullWidth variant="outlined" size="large" onClick={submit}>
                            อัพเดตข้อมูล
                        </Button>

                    </Grid>
                    <Grid xs={3}>

                    </Grid>
                </Grid>

            </Paper >

            <Grid xs={12}>

            </Grid>

        </Container>



    );
}
export default PatientScheduleUpdate;


