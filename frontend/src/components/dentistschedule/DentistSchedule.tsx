import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { DentistSceheduleInterface } from "../../models/IDentistScheduleInterface";
import { GetDentistScehedules } from "../../services/HttpClientService";
import moment from "moment";
import axios from 'axios';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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
  const Delete = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:8080/dentist_schedules/${id}`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              'Content-Type': 'application/json',
          }
      });

      if (response.status === 200) {
          console.log("dentist_schedules deleted successfully");
          getDentist_schedules();
      } else {
          throw new Error("Failed to delete dentist_schedules ");
      }
  } catch (err) {
      console.error(err);
  }
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 60 },
    { field: "Workingday",headerName: "วัน",width: 100, valueFormatter: (params) => params.value.Day,},
    { field: "Responsity",headerName: "งานที่รับผิดชอบ",width: 150,valueFormatter: (params) => params.value.Respon,},
    { field: "Dentist",headerName: "ทันตแพทย์",width: 150,valueFormatter: (params) => params.value.FirstName,},
    { field: "TimeWork", headerName: "เวลา", width: 200, valueFormatter: (params) => moment(params.value).format('DD-MM-yyyy เวลา hh:mm น.') },
    { field: "TimeEnd", headerName: "ถึง", width: 200, valueFormatter: (params) => moment(params.value).format('DD-MM-yyyy เวลา hh:mm น.') },
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