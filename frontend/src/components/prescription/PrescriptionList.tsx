import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { PrescriptionInterface } from "../../models/IPrescription";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import axios from 'axios';
import { GetPrescription } from "../../services/HttpClientService";

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState<PrescriptionInterface[]>([]);

  const getPrescriptions = async () => {
    let res = await GetPrescription();
    if (res) {
        setPrescriptions(res);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:3001/employees/${id}`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              'Content-Type': 'application/json',
          }
      });

      if (response.status === 200) {
          console.log("Prescription deleted successfully");
          getPrescriptions();
      } else {
          throw new Error("Failed to delete Prescription");
      }
  } catch (err) {
      console.error(err);
  }
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    { field: "Patient", headerName: "ชื่อ ผู้ป่วย", width: 250,  valueFormatter: (params) => params.value.FirstName,},
    { field: "Patient", headerName: "นามสกุล", width: 250,  valueFormatter: (params) => params.value.LastName,},
    { field: "Patient", headerName: "เลขประจำตัวประชาชน", width: 250,  valueFormatter: (params) => params.value.Personal_id,},
    { field: "Medicine", headerName: "ชื่อยา", width: 250,  valueFormatter: (params) => params.value.Medicine_name,},
    { field: "Medicine", headerName: "ราคา", width: 250,  valueFormatter: (params) => params.value.Medicine_price,},
    // { field: "Patient", headerName: "ชื่อ ทันตแพทย์", width: 250,  valueFormatter: (params) => params.value.FirstName,},
    // { field: "Patient", headerName: "นามสกุล", width: 250,  valueFormatter: (params) => params.value.LastName,},
    { field: "Medicine_status", headerName: "ชื่อ", width: 250,  valueFormatter: (params) => params.value.Medicine_status_name,},
    {
      field: "action", headerName: "Action",width: 100, sortable: false, renderCell: ({ row }) =>
            <Button onClick={() => handleDelete(row.ID)} size="small" variant="contained" color="error" >
                delete
            </Button>
    },
  ];

  useEffect(() => {
    getPrescriptions();
  }, []);

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
              ข้อมูลตารางการสั่งจ่ายยา
            </Typography>
          </Box>
          <Box>
          <Stack spacing={2} direction="row">
            <Button
                component={RouterLink}
                to=""
                variant="contained"
                color="primary"
                >
                แก้ไขข้อมูล
            </Button>
            <Button
                component={RouterLink}
                to="/employee/create"
                variant="contained"
                color="success"
                >
                สร้างข้อมูล
            </Button>
         </Stack>
          </Box>
        </Box>
        
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={prescriptions}
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

export default Prescriptions;