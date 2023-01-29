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
import { useParams } from "react-router-dom";

//import { GetCurrentAdmin } from "../services/HttpClientService"
import { TreatmentsInterface } from "../../models/ITreatment"; 
import { Type_of_treatments_Interface } from "../../models/IType_of_treatment"; 
import { Type_of_number_of_treatment_Interface } from "../../models/IType_of_number_of_treatment"; 
import { DentistInterface } from "../../models/IDentist"; 
import { PatientInterface } from "../../models/IPatient"; 
import { DatePicker } from "@mui/x-date-pickers";
import { TreatmentsPlanInterface } from "../../models/ITreatment_plan";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TreatmentCreate() {
    const [success, setSuccess] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState("");

    const [dentist, setADentist] = React.useState<DentistInterface[]>([]); //React.useState<DentistsInterface>();
    const [patient, setPatient] = React.useState<PatientInterface[]>([]);
    const [type_of_treatments, setType_of_treatments] = React.useState<Type_of_treatments_Interface[]>([]);
    const [type_of_number_of_treatments, setType_of_number_treatments] = React.useState<Type_of_number_of_treatment_Interface[]>([]);
    const [treatment_plan, setTreatmentPlan] = React.useState<TreatmentsPlanInterface>({ Treatment_time: new Date(), });
    const [number_of_treatment, setNumber_of_treatment] = React.useState(0);
    const [order_of_treatment, setOrder_of_treatment] = React.useState(0);
    const [treatment_detail, setTreatment_detail] = React.useState<string>("");
    const [treatment_explain, setTreatment_explain] = React.useState<string>("");



    const apiUrl = "http://localhost:3001";
    const requestOptions = {
        method: "GET",
        headers: {
            //Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
        },
    };

    const { id } = useParams();

    useEffect(() => {
        getDentist();
        fetch(`http://localhost:3001/treatment_plans/${id}`)
            .then((response) => response.json())
            .then((res) => {
                if (res.data) {
                    console.log("Order_of_treatment")

                    console.log(res.data.Order_of_treatment)
                    console.log("Order_of_treatment")
                    setOrder_of_treatment(res.data.Order_of_treatment.toString());
                    
                    
                    console.log("res.data")
                    const dataString = JSON.stringify(res.data);
                    console.log(dataString);
                    console.log("res.data")

                    console.log("Order_of_treatment")
                    console.log(res.data.Order_of_treatment)
                    console.log("Order_of_treatment")
                    setOrder_of_treatment(res.data.Order_of_treatment.toString());

                    console.log("Number_of_treatment")
                    console.log(res.data.Number_of_treatment)
                    console.log("Number_of_treatment")
                    setNumber_of_treatment(res.data.Number_of_treatment.toString());

                    console.log("Treatment_detail")
                    console.log(res.data.Treatment_detail)
                    console.log("Treatment_detail")
                    setTreatment_detail(res.data.Treatment_detail.toString());

                    console.log("Treatment_explain")
                    console.log(res.data.Treatment_explain)
                    console.log("Treatment_explain")
                    setTreatment_explain(res.data.Treatment_explain.toString());


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
        const id = event.target.id as keyof typeof TreatmentCreate;
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

    // const getAdmin = async () => {
    //     let res = await GetCurrentAdmin();
    //     branch.AdminID = res.ID;
    //     if (res) {
    //         setAdmin(res);
    //         console.log(res)
    //     }
    // };

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
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        };

        fetch(`${apiUrl}/treatment_plans/${id}`, requestOptions)
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
                        อัปเดตข้อมูลสำเร็จ
                    </div>
                </Alert>
            </Snackbar>
            <Snackbar open={error} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    <div className="good-font">
                        อัปเดตข้อมูลไม่สำเร็จ
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
                            แก้ไขแผนการรักษา ID : {id}
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
                                value={treatment_plan.order_of_treatment || "" || order_of_treatment}
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
                                value={treatment_plan.number_of_treatment || "" || number_of_treatment}
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
                                value={treatment_plan.treatment_detail || "" || treatment_detail}
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
                                value={treatment_plan.treatment_explain || "" || treatment_explain}
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
                                อัปเดตข้อมูล
                            </div>
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default TreatmentCreate;