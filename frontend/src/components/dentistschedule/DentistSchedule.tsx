import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DentistSceheduleInterface } from "../../models/IDentistScheduleInterface";
import { GetDentistScehedules } from "../../services/HttpClientService";

function DentistSchedule() {
  const [dentist_schedule, setDentist_schedule] = useState<DentistSceheduleInterface[]>([]);

  useEffect(() => {
    getDentist_schedules();
  }, []);

  const getDentist_schedules = async () => {
    let res = await GetDentistScehedules();
    if (res) {
        setDentist_schedule(res);
    } 
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 60 },
    { field: "DayworkID",headerName: "วันที่ทำงาน",width: 150, },
    { field: "ResponID",headerName: "งานที่รับผิดชอบ",width: 250,},
    { field: "DentistID",headerName: "ทันตแพทย์",width: 150,},
    { field: "TimeWork", headerName: "เวลา", width: 100 },
    { field: "TimeEnd", headerName: "ถึง'", width: 100 },
  ];

  return (
    <div>
      <Container maxWidth="md">
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
              ข้อมูลตารางงานแพทย์'
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/DentistSchedule/create"
              variant="contained"
              color="primary"
            >
              สร้างรายการตารางงานแพทย์
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={dentist_schedule}
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

export default DentistSchedule;