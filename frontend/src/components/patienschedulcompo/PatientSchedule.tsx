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
import Button from '@mui/material/Button';

//import Interface
import {ReasonInterface} from "../../models/IReason";
import {PatienSceheduleInterface} from "../../models/IPatienSchedule";

import {
    GetPatientSchedules,
    GetReasons,
    PatientSchedules,
} from "../../services/HttpClientService";



function PatientSchedule() {

    const [reasons, setReasons] = useState<ReasonInterface[]>([]);
    const [patien_schedule, setPatienSchedule] = useState<PatienSceheduleInterface>({
    
    });

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

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
    };

    const getReasons = async () => {
        let res = await GetReasons();
        patien_schedule.ReasonID = res.ID;
        if (res) {
            setReasons(res);
        }
    };

    useEffect(() => {
        getReasons();
    }, []);



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  

const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-07'));

useEffect(() => {
    getReasons();
   
}, []);
const convertType = (data: string | number | undefined) => {
    let val = typeof data === "string" ? parseInt(data) : data;
    return val;
};
async function submit() {
    let data = {
        ReasonID: convertType(patien_schedule.ReasonID)
    };
    console.log(data);
    let res = await PatientSchedules(data);
    if (res) {
        setSuccess(true);
    } else {
        setError(true);
    }
}



    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
            </Box>
            <Container maxWidth="lg">
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
                        <h2>Patient Schedule Create</h2>
                    </Box>
                    <hr />
                    <Grid container spacing={1} sx={{ padding: 2 }}>
                        <Grid xs={6}  sx={{ padding: 1.3 }}>
                        <FormControl sx = {{width: 400}}>
                        <InputLabel id="demo-simple-select-label">ชื่อ-สกุล</InputLabel>
                                <Select
                                    native
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={patien_schedule.ReasonID + ""}
                                    onChange={handleChange}
                                    label= "Reason"
                                    inputProps={{
                                        name: "ReasonID",
                                    }}
                                >
                                  <option aria-label="None" value="">
                                    กรุณาเลือกผู้ป่วย
                                  </option>
                                    {reasons.map((item: ReasonInterface) => (
                                        <option value={item.ID} key={item.ID}>
                                            {item.Method}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={6}  sx={{ padding: 1.3 }}> 
                        <FormControl sx = {{width: 400}}>
                        <InputLabel id="demo-simple-select-label">ทันตแพทย์</InputLabel>
                                <Select
                                    native
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={patien_schedule.ReasonID + ""}
                                    onChange={handleChange}
                                    label= "Reason"
                                    inputProps={{
                                        name: "ReasonID",
                                    }}
                                >
                                  <option aria-label="None" value="">
                                    กรุณาเลือกแพทย์ผู้รับผิดชอบ
                                  </option>
                                    {reasons.map((item: ReasonInterface) => (
                                        <option value={item.ID} key={item.ID}>
                                            {item.Method}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>

                        </Grid>
                        <Grid xs={6}  sx={{ padding: 1.3 }}>
                        <FormControl sx = {{width: 400}}>
                        <InputLabel id="demo-simple-select-label">เหตุผล</InputLabel>
                                <Select
                                    native
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={patien_schedule.ReasonID + ""}
                                    onChange={handleChange}
                                    label= "Reason"
                                    inputProps={{
                                        name: "ReasonID",
                                    }}
                                >
                                  <option aria-label="None" value="">
                                    กรุณาเลือกเหตุผล
                                  </option>
                                    {reasons.map((item: ReasonInterface) => (
                                        <option value={item.ID} key={item.ID}>
                                            {item.Method}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={6}  sx={{ padding: 1.3 }}>
                        <FormControl sx = {{width: 400}}>
                        <InputLabel id="demo-simple-select-label">นัดไปห้องตรวจ</InputLabel>
                                <Select
                                    native
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={patien_schedule.ReasonID + ""}
                                    onChange={handleChange}
                                    label= "Reason"
                                    inputProps={{
                                        name: "ReasonID",
                                    }}
                                >
                                  <option aria-label="None" value="">
                                    กรุณาเลือกห้องตรวจ
                                  </option>
                                    {reasons.map((item: ReasonInterface) => (
                                        <option value={item.ID} key={item.ID}>
                                            {item.Method}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={6}  sx={{ padding: 1.3 }}>
                        <FormControl sx = {{width: 400}}>
                        <InputLabel id="demo-simple-select-label">ประเภทการรักษา</InputLabel>
                                <Select
                                    native
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={patien_schedule.ReasonID + ""}
                                    onChange={handleChange}
                                    label= "Reason"
                                    inputProps={{
                                        name: "ReasonID",
                                    }}
                                >
                                  <option aria-label="None" value="">
                                    กรุณาเลือกประภทการรักษา
                                  </option>
                                    {reasons.map((item: ReasonInterface) => (
                                        <option value={item.ID} key={item.ID}>
                                            {item.Method}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={3.25} sx={{ padding: 1.3 }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker 
                            renderInput={(props) => <TextField {...props} />}
                            label="วันนัดเข้าพบแพทย์"
                            value={value}
                            onChange={(newValue) => {
                            setValue(newValue);
                            }}
                            
                        />
                        </LocalizationProvider>
                        </Grid>
                        <Grid xs={2.75} sx={{ padding: 1.3 }}>
                        <Button sx={{ paddingY: 1.7, }} fullWidth variant="outlined" size="large" onClick={submit}>
                                บันทึกข้อมูล
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

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
];



export default PatientSchedule;