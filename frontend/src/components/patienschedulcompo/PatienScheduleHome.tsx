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
function PatienScheduleHome() {
  const [patien_schedule, setPatien_schedule] = useState<PatienSceheduleInterface[]>([]);

  const getPatien_schedules = async () => {
    let res = await GetPatientSchedules();
    if (res) {
        setPatien_schedule(res);
    } 
  };

  useEffect(() => {
    getPatien_schedules();
  }, []);

  const Delete = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:3001/patien_schedules/${id}`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              'Content-Type': 'application/json',
          }
      });

      if (response.status === 200) {
          console.log("Patienschedule deleted successfully");
          getPatien_schedules();
      } else {
          throw new Error("Failed to delete Patienschedule ");
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
    { field: "Type_of_treatment", headerName: "ประเภทการรักษา", width: 200 ,valueFormatter: (params) => params.value.Type_of_treatment_name,},
    { field: "Date_time", headerName: "วันที่และเวลา", width: 200,valueFormatter: (params) => moment(params.value).format('DD-MM-yyyy เวลา hh:mm น.') },
    {
      field: "action", headerName: "Action",width: 100, sortable: false, renderCell: ({ row }) =>
            <Button  onClick={() => Delete(row.ID)} size="small" variant="contained" color="error" >
                Delete <DeleteForeverIcon />
            </Button>
    },
  ];

  return (
    <div>
      <Container maxWidth="lg">
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
              ข้อมูลตารางการนัดผู้ป่วย
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
          />
        </div>
       
      </Container>
    </div>
  );
}

export default PatienScheduleHome;