import React, { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
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
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Autocomplete from "@mui/material/Autocomplete";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { TreatmentsPlanInterface } from "../../models/ITreatment_plan";
import { Type_of_treatments_Interface } from "../../models/IType_of_treatment";
import { Type_of_number_of_treatment_Interface } from "../../models/IType_of_number_of_treatment";
import { DentistInterface } from "../../models/IDentist";
import { PatientInterface } from "../../models/IPatient";
import { DatePicker } from "@mui/x-date-pickers";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TreatmentPlanCreate() {
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [message, setAlertMessage] = React.useState("");
    const [errorMessage, setErrorMessage] = React.useState("");
    const [dentist, setADentist] = React.useState<DentistInterface[]>([]); //React.useState<DentistsInterface>();
    const [patient, setPatient] = React.useState<PatientInterface[]>([]);
    const [type_of_treatments, setType_of_treatments] = React.useState<Type_of_treatments_Interface[]>([]);
    const [type_of_number_of_treatments, setType_of_number_treatments] = React.useState<Type_of_number_of_treatment_Interface[]>([]);
    const [treatment_plan, setTreatmentPlan] = React.useState<TreatmentsPlanInterface>({ Treatment_time: new Date(), });

    const apiUrl = "http://localhost:8080";
    const requestOptions = {
        method: "GET",
        headers: {
            //Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
    };

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
        const id = event.target.id as keyof typeof TreatmentPlanCreate;
        const { value } = event.target;
        setTreatmentPlan({ ...treatment_plan, [id]: value });
    };

    const handleChange = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof treatment_plan;
        setTreatmentPlan({
            ...treatment_plan,
            [name]: event.target.value,
        });
    };

    const handleChangeNEW = (event: SelectChangeEvent) => {
        const name = event.target.name as keyof typeof treatment_plan;
        setTreatmentPlan({
            ...treatment_plan,
            [name]: event.target.value,
        });
    };

    const getPatient = async () => {
        fetch(`${apiUrl}/patients`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log(res.data)
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

    useEffect(() => {
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
            DentistID: convertType(treatment_plan.DentistID),
            PatientID: convertType(treatment_plan.PatientID),
            Order_of_treatment: typeof treatment_plan.order_of_treatment === "string" ? parseInt(treatment_plan.order_of_treatment) : 0,
            Type_Of_TreatmentID: convertType(treatment_plan.Type_Of_TreatmentID),
            Number_of_treatment: typeof treatment_plan.number_of_treatment === "string" ? parseInt(treatment_plan.number_of_treatment) : 0,
            Type_Of_Number_Of_TreatmentID: convertType(treatment_plan.Type_Of_Number_Of_TreatmentID),
            Treatment_detail: treatment_plan.treatment_detail ?? "",
            Treatment_explain: treatment_plan.treatment_explain ?? "",
            Treatment_time: treatment_plan.Treatment_time,
        };

        console.log(JSON.stringify(data))

        const requestOptions = {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        };

        let res = await fetch(`${apiUrl}/treatment_plans`, requestOptions)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    setSuccess(true);
                    setErrorMessage("")
                    return { status: true, message: res.data };
                } else {
                    setError(true);
                    setErrorMessage(res.error)
                    return { status: false, message: res.error };
                }
            });

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
                id="success"
                open={success}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleClose} severity="success">
                    <div className="good-font">
                        {message}
                    </div>
                </Alert>
            </Snackbar>
            <Snackbar
                id="error"
                open={error}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert onClose={handleClose} severity="error">
                    <div className="good-font">
                        {message}
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
                                เพิ่มข้อมูลแผนการรักษา
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
                                sx={{ width: 'auto' }}
                                isOptionEqualToValue={(option, value) =>
                                    option.ID === value.ID}
                                onChange={(e, value) => { treatment_plan.DentistID = value?.ID }}
                                renderInput={(params) => <TextField {...params} label="เลือกทันตเเพทย์" />}
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
                                onChange={(e, value) => { treatment_plan.PatientID = value?.ID }}
                                renderInput={(params) => <TextField {...params} label="เลือกผู้ป่วย" />}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">ลำดับการรักษา</p>
                            <TextField
                                id="order_of_treatment"
                                variant="outlined"
                                type="number"
                                size="medium"
                                InputProps={{ inputProps: { min: 1 } }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={treatment_plan.order_of_treatment || ""}
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
                                onChange={(e, value) => { treatment_plan.Type_Of_TreatmentID = value?.ID }}
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
                                value={treatment_plan.number_of_treatment || ""}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">ประเภทจำนวนการรักษา</p>
                            <Autocomplete
                                disablePortal
                                id="Type_Of_Number_Of_TreatmentID"
                                getOptionLabel={(item: Type_of_number_of_treatment_Interface) => `${item.Type_of_number_of_treatment_name}`}
                                options={type_of_number_of_treatments}
                                sx={{ width: 'auto' }}
                                isOptionEqualToValue={(option, value) =>
                                    option.ID === value.ID}
                                onChange={(e, value) => { treatment_plan.Type_Of_Number_Of_TreatmentID = value?.ID }}
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
                                value={treatment_plan.treatment_detail || ""}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">คำอธิบาย</p>
                            <TextField
                                id="treatment_explain"
                                variant="outlined"
                                type="string"
                                size="medium"
                                value={treatment_plan.treatment_explain || ""}
                                onChange={handleInputChange}
                            />
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <p className="good-font">เวลาการรักษา</p>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    value={treatment_plan.Treatment_time}
                                    onChange={(newValue) => {
                                        setTreatmentPlan({
                                            ...treatment_plan,
                                            Treatment_time: newValue,
                                        });
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Button component={RouterLink} to="/treatmentplanlistshow" variant="contained">
                            <div className="good-font">
                                กลับ
                            </div>
                        </Button>
                        <Button
                            style={{ float: "right" }}
                            onClick={submit}
                            variant="contained"
                            color="primary"
                        >
                            <div className="good-font">
                                บันทึกข้อมูล
                            </div>
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default TreatmentPlanCreate;