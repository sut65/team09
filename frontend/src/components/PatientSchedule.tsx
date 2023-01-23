import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from "@mui/material/FormControl";
import InputLabel from '@mui/material/InputLabel';

//import Interface
import {ReasonInterface} from "../models/IReason";
import {PatienSceheduleInterface} from "../models/IPatienSchedule";

import {
    GetPatientSchedules,
    GetReasons,
    PatientSchedules,
} from "../services/HttpClientService";



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
                            paddingY: 4,
                        }}
                    >
                        <h1>Patient Schedule</h1>
                    </Box>
                    <hr />
                    <Grid container spacing={1}>
                        <Grid xs={6}>
                        <FormControl fullWidth variant="outlined">
                                <InputLabel id="demo-simple-select-label">Reason</InputLabel>
                                <Select
                                    native
                                    value={patien_schedule.ReasonID + ""}
                                    onChange={handleChange}
                                    inputProps={{
                                        name: "Reason",
                                    }}
                                >
                                    <option aria-label="None" value="">

                                    </option>
                                    {reasons.map((item: ReasonInterface) => (
                                        <option value={item.ID} key={item.ID}>
                                            {item.Method}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid xs={6}> 
    

                        </Grid>
                        <Grid xs={6}>
                        
                        </Grid>
                        <Grid xs={6}>
                       
                        </Grid>
                        <Grid xs={6} >
                       
                        </Grid>
                        <Grid xs={3.25}>
                        </Grid>
                        <Grid xs={2.75}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker 
                            renderInput={(props) => <TextField {...props} />}
                            label="DateTimePicker"
                            value={value}
                            onChange={(newValue) => {
                            setValue(newValue);
                            }}
                            
                        />
                        </LocalizationProvider>
                        
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