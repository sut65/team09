import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { PatienSceheduleInterface } from "../../models/IPatienSchedule";
import { GetPatientSchedules } from "../../services/HttpClientService";

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


  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 60 },
    { field: "PatientID",headerName: "ชื่อ ผู้ป่วย",width: 150,},
    { field: "EmployeeID",headerName: "แพทย์ที่รับผิดชอบ",width: 250,},
    { field: "ReasonID",headerName: "หมายเหตุ",width: 150,},
    { field: "Type_Of_TreatmentID", headerName: "ประเภทการรักษา", width: 100 ,},
    { field: "Date_time", headerName: "วันที่และเวลา", width: 200 },
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