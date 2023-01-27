import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";

import { TreatmentsInterface } from "../../models/ITreatment";
import { Type_of_treatments_Interface } from "../../models/IType_of_treatment";
import { DentistInterface } from "../../models/IDentist";
import { PatientInterface } from "../../models/IPatient";
import { Type_of_number_of_treatment_Interface } from "../../models/IType_of_number_of_treatment";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TreatmentUpdate() {
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const [dentist, setADentist] = React.useState<DentistInterface[]>([]); //React.useState<DentistsInterface>();
  

    const [patient, setPatient] = React.useState<PatientInterface[]>([]);
    const [type_of_treatments, setType_of_treatments] = React.useState<Type_of_treatments_Interface[]>([]);
    const [type_of_number_of_treatments, setType_of_number_treatments] = React.useState<Type_of_number_of_treatment_Interface[]>([]);
    const [treatment, setTreatment] = React.useState<TreatmentsInterface>({ Treatment_time: new Date(), });
    const [treatment_detail, setTreatment_detail] = React.useState<string>("");
    const [treatment_code, setTreatment_code] = React.useState<string>("");
    const [other_teeth_problems, setOther_teeth_problems] = React.useState<string>("");
    const [number_of_cavities, setNumber_of_cavities] = React.useState(0);
    const [number_of_swollen_gums, setNumber_of_swollen_gums] = React.useState(0);
    const [number_of_treatment, setNumber_of_treatment] = React.useState(0);
    

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
    fetch(`http://localhost:8080/treatments/${id}`)
    .then((response) => response.json())
    .then((res) => {
             
           
          
            if (res.data) {
                console.log("gt")               
                console.log(res.data.Treatment_code)
                setTreatment_code(res.data.Treatment_code.toString());      
                console.log(res.data.Treatment_detail)
                setTreatment_detail(res.data.Treatment_detail.toString());
                console.log(res.data.Other_teeth_problems)
                setOther_teeth_problems(res.data.Other_teeth_problems.toString());
                console.log(res.data.Number_of_cavities)               
                console.log(res.data.Number_of_swollen_gums)
                console.log(res.data.Number_of_treatment)
                setNumber_of_cavities(res.data.Number_of_cavities.toString());               
                setNumber_of_swollen_gums(res.data.Number_of_swollen_gums.toString());
                setNumber_of_treatment(res.data.Number_of_treatment.toString());
                console.log(res.data.DentistID)              
                console.log("id forenkey")             
                console.log("af set")
                console.log(treatment_code)
                console.log("af set")
                console.log("gt")
                console.log("treatment +id")
                const dataString = JSON.stringify(res.data);
                console.log(dataString);
                console.log("treatment +id")   
            }
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

    const handleInputChange = (
        event: React.ChangeEvent<{ id?: string; value: any }>
    ) => {
        const id = event.target.id as keyof typeof TreatmentUpdate;
        const { value } = event.target;
        setTreatment({ ...treatment, [id]: value });
    };

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof treatment;
        setTreatment({
            ...treatment,
            [name]: event.target.value,
        });
    };

    const getPatient = async () => {
        fetch(`${apiUrl}/patients`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log("patient")
                    console.log(res.data)
                    console.log("patient")
                    setPatient(res.data);
                }
                else { console.log("NO DATA") }
            });
    };

    const getType_of_treatment = async () => {
        fetch(`${apiUrl}/type_of_treatments`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setType_of_treatments(res.data);
                }
                else { console.log("NO DATA") }
            });
    };

    const getType_of_number_of_treatment = async () => {
        fetch(`${apiUrl}/type_of_number_of_treatments`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setType_of_number_treatments(res.data);
                }
                else { console.log("NO DATA") }
            });
    };

    const getDentist = async () => {
        fetch(`${apiUrl}/dentists`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
                    setADentist(res.data);
                }
                else { console.log("NO DATA") }
            });
    };

    
    // const value = parseInt(treatmentID!)
    // console.log("treatment by use Params id is"+treatmentID)

    useEffect(() => {
        //alert(id)
        getDentist();
        getPatient();
        getType_of_treatment();
        getType_of_number_of_treatment();
    }, []);

    const convertType = (data: string | number | undefined) => {
        let val = typeof data === "string" ? parseInt(data) : data;
        return val;
    };

    async function submit() {
        let data = {
            DentistID: convertType(treatment.DentistID),
            PatientID: convertType(treatment.PatientID),

            Number_of_cavities: typeof treatment.number_of_cavities === "string" ? parseInt(treatment.number_of_cavities) : 0,
            Number_of_swollen_gums: typeof treatment.number_of_swollen_gums === "string" ? parseInt(treatment.number_of_swollen_gums) : 0,
            Other_teeth_problems: treatment.other_teeth_problems ?? "",
            Type_Of_TreatmentID: convertType(treatment.Type_of_treatmentsID),
            Number_of_treatment: typeof treatment.number_of_treatment === "string" ? parseInt(treatment.number_of_treatment) : 0,

            Type_Of_Number_Of_TreatmentID: convertType(treatment.Type_Of_Number_Of_TreatmentID),



            Treatment_detail: treatment.treatment_detail ?? "",
            Treatment_time: treatment.Treatment_time,
            Treatment_code: treatment.treatment_code ?? "",
        };

        console.log(data)

        const requestOptions = {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        };

        fetch(`${apiUrl}/treatments/${id}`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setSuccess(true);
                    setErrorMessage("")
                } else {
                    setError(true);
                    setErrorMessage(res.error)
                }
            });
    }


    return (
        <Container maxWidth="md">
            <Snackbar
                open={success}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleClose} severity="success">
                    <div className="good-font">
                        บันทึกข้อมูลสำเร็จ
                    </div>
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    <div className="good-font">
                        บันทึกข้อมูลไม่สำเร็จ
                    </div>
                </Alert>
            </Snackbar>
            <Paper>
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
                            <div className="good-font">
                                แก้ไขtreament ID : {id}
                            </div>
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Grid container spacing={3} sx={{ padding: 2 }}>



                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">ทันตเเพทย์</p>
                            <Autocomplete
                                disablePortal
                                id="DentistID"
                                getOptionLabel={(item: DentistInterface) => `${item.FirstName}`}                                                               
                                options={dentist}
                                //defaultValue={{ ID: 2 ,Dentist_name: "moyong"}}
                                sx={{ width: 'auto' }}
                                isOptionEqualToValue={(option, value) =>
                                    option.ID === value.ID}
                                onChange={(e, value) => { treatment.DentistID = value?.ID }}
                                renderInput={(params) => <TextField {...params} label="เลือกoooo"/>} 

                            />
                        </FormControl>
                    </Grid>
                    

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">ผู้ป่วย</p>
                            <Autocomplete
                                disablePortal
                                id="PatientID"
                                getOptionLabel={(item: PatientInterface) => `${item.FirstName}`}
                                options={patient}
                                sx={{ width: 'auto' }}
                                isOptionEqualToValue={(option, value) =>
                                    option.ID === value.ID}
                                onChange={(e, value) => { treatment.PatientID = value?.ID }}
                                renderInput={(params) => <TextField {...params} label="เลือกผู้ป่วย" />}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">จำนวนฟันผุ</p>
                            <TextField
                                id="number_of_cavities"
                                variant="outlined"
                                type="number"
                                size="medium"
                                InputProps={{ inputProps: { min: 1 } }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={treatment.number_of_cavities || "" || number_of_cavities}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">จำนวนเหงือกบวม</p>
                            <TextField
                                id="number_of_swollen_gums"
                                variant="outlined"
                                type="number"
                                size="medium"
                                InputProps={{ inputProps: { min: 1 } }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={treatment.number_of_swollen_gums || "" || number_of_swollen_gums}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">ปัณหาฟันอื่นๆ</p>
                            <TextField
                                id="other_teeth_problems"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={treatment.other_teeth_problems || "" || other_teeth_problems}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">ประเภทการรักษา</p>
                            <Autocomplete
                                disablePortal
                                id="Type_Of_TreatmentID"
                                getOptionLabel={(item: Type_of_treatments_Interface) => `${item.Type_of_treatment_name}`}

                                options={type_of_treatments}
                                sx={{ width: 'auto' }}
                                isOptionEqualToValue={(option, value) =>
                                    option.ID === value.ID}
                                onChange={(e, value) => { treatment.Type_of_treatmentsID = value?.ID }}
                                renderInput={(params) => <TextField {...params} label="เลือกประเภทการรักษา" />}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">จำนวนการรักษา</p>
                            <TextField
                                id="number_of_treatment"
                                variant="outlined"
                                type="number"
                                size="medium"
                                InputProps={{ inputProps: { min: 1 } }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={treatment.number_of_treatment || "" || number_of_treatment}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>


                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">ซี่ ด้าน หรือ ฟิล์ม</p>
                            <Autocomplete
                                disablePortal
                                id="Type_Of_Number_Of_TreatmentID"
                                getOptionLabel={(item: Type_of_number_of_treatment_Interface) => `${item.Type_of_number_of_treatment_name}`}
                                options={type_of_number_of_treatments}
                                sx={{ width: 'auto' }}
                                isOptionEqualToValue={(option, value) =>
                                    option.ID === value.ID}
                                onChange={(e, value) => { treatment.Type_Of_Number_Of_TreatmentID = value?.ID }}
                                renderInput={(params) => <TextField {...params} label="เลือกซี่ ฟัน หรือ ฟิล์ม" />}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">รายละเอียดการรักษา</p>
                            <TextField
                                id="treatment_detail"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={treatment.treatment_detail || "" || treatment_detail}
                                onChange={handleInputChange}
                                defaultValue={treatment_detail}
                                
                                
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">เวลาการรักษา</p>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    value={treatment.Treatment_time}
                                    onChange={(newValue) => {
                                        setTreatment({
                                            ...treatment,
                                            Treatment_time: newValue,
                                        });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">รหัสการรักษา</p>
                            <TextField
                                id="treatment_code"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={treatment.treatment_code || "" || treatment_code}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Button component={RouterLink} to="/treatment_grid" variant="contained">
                            <div className="good-font-white">
                                กลับ
                            </div>
                        </Button>
                        <Button
                            style={{ float: "right" }}
                            onClick={submit}
                            variant="contained"
                            color="primary"
                        >
                            <div className="good-font-white">
                                บันทึก
                            </div>
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default TreatmentUpdate;
