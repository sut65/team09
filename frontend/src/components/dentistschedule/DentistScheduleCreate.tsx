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
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
//import Interface
import { WorkingdayInterface } from '../../models/IWorkingday';
import { ResponsityInterface } from '../../models/IResponsity';
import {DentistSceheduleInterface} from "../../models/IDentistScheduleInterface";
import { DentistInterface } from '../../models/IDentist';

import {
    GetDentistScehedules,
    GetResponsitys,
    DentistScehedules,
    GetWorkingdays,
    GetDentists,
} from "../../services/HttpClientService";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

function DentistScheduleCreate() {
    const [dentists, setDentists] = useState<DentistInterface []>([]);
    const [workingdays, setWorkingdays] = useState<WorkingdayInterface  []>([]);
    const [responsitys, setResponsitys] = useState<ResponsityInterface []>([]);
    const [dentist_schedule, setDentistScehedule] = useState<DentistSceheduleInterface>({
        TimeWork: new Date(),
        TimeEnd: new Date(),
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
        TimeWork: dentist_schedule.TimeWork,
        TimeEnd: dentist_schedule.TimeEnd,
    };
    console.log(data);
    let res = await DentistScehedules(data);
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
                <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                <Alert onClose={handleClose} severity="success">
                บันทึกข้อมูลสำเร็จ
                </Alert>
                </Snackbar>
                <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                บันทึกข้อมูลไม่สำเร็จ
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
                        <Grid xs={6}  sx={{ padding: 1.3 }}>
                        <FormControl sx = {{width: 400}}>
                        <InputLabel id="demo-simple-select-label">งานที่รับผิดชอบ</InputLabel>
                                <Select
                                    native
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={dentist_schedule.ResponsityID + ""}
                                    onChange={handleChange}
                                    label= "งานที่รับผิดชอบ"
                                    inputProps={{
                                        name: "ResponsityID",
                                    }}
                                >
                                  <option aria-label="None" value="">
                                    กรุณาเลือกงานที่รับผิดชอบ
                                  </option>
                                    {responsitys.map((item: ResponsityInterface) => (
                                        <option value={item.ID} key={item.ID}>
                                            {item.Respon}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={6}  sx={{ padding: 1.3 }}> 
                        <FormControl sx = {{width: 400}}>
                        <InputLabel id="demo-simple-select-label">วันเข้าทำงาน</InputLabel>
                                <Select
                                    native
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={dentist_schedule.WorkingdayID + ""}
                                    onChange={handleChange}
                                    label= "วันเข้าทำงาน"
                                    inputProps={{
                                        name: "WorkingdayID",
                                    }}
                                >
                                  <option aria-label="None" value="">
                                    กรุณาเลือกวันที่เข้าทำงาน
                                  </option>
                                    {workingdays.map((item: WorkingdayInterface) => (
                                        <option value={item.ID} key={item.ID}>
                                            {item.Day}
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
                                    value={dentist_schedule.DentistID + ""}
                                    onChange={handleChange}
                                    label= "ทันตแพทย์"
                                    inputProps={{
                                        name: "DentistID",
                                    }}
                                >
                                  <option aria-label="None" value="">
                                    กรุณาเลือกรายชื่อ
                                  </option>
                                    {dentists.map((item: DentistInterface) => (
                                        <option value={item.ID} key={item.ID}>
                                            {item.FirstName}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={6}  sx={{ padding: 1.3 }}>
                        
                        </Grid>
                        <Grid xs={6}  sx={{ padding: 1.3 }}>
                        
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
                        <Grid xs={6}  sx={{ padding: 1.3 }}>
                        
                        </Grid>
                        <Grid xs={3.25} sx={{ padding: 1.3 }}>
                     
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


export default DentistScheduleCreate;