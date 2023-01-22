import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  

function PatientSchedule() {

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
                    <Grid container spacing={0}>
                        <Grid xs={6}>
                        <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={top100Films}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Movie" />}
                        />
                        </Grid>
                        <Grid xs={6}> 
                            <Item>xs=6</Item>
                        </Grid>
                        <Grid xs={6}>
                        <Item>xs=6</Item>
                        </Grid>
                        <Grid xs={6}>
                        <Item>xs=6</Item>
                        </Grid>
                        <Grid xs={6} >
                        <Item>xs=6</Item>
                        </Grid>
                        <Grid xs={6}>
                        <Item>xs=6</Item>
                        </Grid>
                     
                        <Grid xs={6}>
                        <Item>xs=6</Item>
                        </Grid>
                        <Grid xs={6}>
                        <Item>xs=6</Item>
                        </Grid>
                        <Grid xs={3}>
                        <Item>xs=3</Item>
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