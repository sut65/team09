import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { PatienSceheduleInterface } from "../../models/IPatienSchedule";
import { GetPatientSchedules } from "../../services/HttpClientService";
import moment from "moment";
import axios from 'axios';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import Stack from "@mui/material/Stack";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Slide from '@mui/material/Slide';



const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



function PatienScheduleHome() {
  const [patien_schedule, setPatien_schedule] = useState<PatienSceheduleInterface[]>([]);
  const [message, setAlertMessage] = React.useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [rowId, setrowID] = React.useState<string>("");



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


  const getPatien_schedules = async () => {
    let res = await GetPatientSchedules();
    if (res) {
        setPatien_schedule(res);
    } 
  };

  useEffect(() => {
    getPatien_schedules();
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const Close = () => {
    setOpen(false);
  };

  const Delete = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:8080/patien_schedules/${id}`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              'Content-Type': 'application/json',
          }
      });

      if (response.status === 200) {
          console.log("deleted successfully");
          getPatien_schedules();
          setSuccess(true);
          setAlertMessage("Deleted successfully");
      } else {
         setError(true);
         setAlertMessage("Deleted unsuccessfully");
      }
  } catch (err) {
      console.error(err);
  }
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 60 },
    { field: "Patient",headerName: "ชื่อ ผู้ป่วย",width: 125,valueFormatter: (params) => params.value.FirstName,},
    { field: "Employee",headerName: "แพทย์ที่รับผิดชอบ",width: 130,valueFormatter: (params) => params.value.FirstName,},
    { field: "Reason",headerName: "หมายเหตุ",width: 150,valueFormatter: (params) => params.value.Method,},
    { field: "Patien_Number", headerName: "เบอร์โทรผู้ป่วย", width: 150 },
    { field: "Type_of_treatment", headerName: "ประเภทการรักษา", width: 200 ,valueFormatter: (params) => params.value.Type_of_treatment_name,},
    { field: "Room_Number", headerName: "ห้องตรวจ", width: 150,valueFormatter: (params) => params.value.Room_number, },
    { field: "Date_time", headerName: "วันที่และเวลา", width: 200,valueFormatter: (params) => moment(params.value).format('DD-MM-yyyy เวลา hh:mm ') },
    {
      field: "action", headerName: "Action",width: 250  , sortable: false, renderCell: ({ row }) =>
      <ButtonGroup>
        <Stack spacing={2} direction="row">
          <IconButton aria-label="delete" onClick={handleClickOpen}>
           <DeleteIcon />
           </IconButton>
           <Dialog
        open={open}
        onClose={Close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"ต้องการลบข้อมูลหรือไม่?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                หากลบข้อมูลแล้วข้อมูลนี้จะหายไป.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => {Delete(Number(rowId)); Close();}} variant="contained" autoFocus>
                Yes
              </Button>
              <Button onClick={Close} variant="contained" color="error">No</Button>
            </DialogActions>
          </Dialog>
           <IconButton aria-label="edit" component={RouterLink} to={`/PatientSchedule/Update/${row.ID}`} >
              <EditIcon/>
              </IconButton>
        </Stack>
      </ButtonGroup>      

            
    },
  ];

  return (
    <div>
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
        <Box
          display="flex"
          sx={{
            marginTop: 2,
          }}
        >
          <Box flexGrow={1}>
            <Typography
              component="h2"
              variant="h6"
              color="primary"
              gutterBottom
            >
  
              <Slide direction="down" in={true} timeout={700}>
                        <Typography variant="h4" component="h4">
                        ข้อมูลตารางการนัดผู้ป่วย
                        </Typography>
                        </Slide>
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/PatientSchedule/create"
              variant="contained"
              color="primary"
            >
              สร้างรายการนัดผู้ป่วย
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={patien_schedule}
            getRowId={(row) => row.ID}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            onRowClick={(params) => {
              console.log(params.row.ID); 
              setrowID(params.row.ID)
              
            }}
          />
        </div>
       
      </Container>
    </div>
  );
        }
      

export default PatienScheduleHome;