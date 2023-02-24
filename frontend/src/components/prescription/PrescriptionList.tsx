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
import { ButtonGroup } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState<PrescriptionInterface[]>([]);

  const getPrescriptions = async () => {
    let res = await GetPrescription();
    if (res) {
        setPrescriptions(res);
    }
  };

  const handleDelete1 = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:8080/delete-prescription/${id}`, {
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
    { field: "ID", headerName: "ลำดับ", width: 80 },
    { field: "Patient", headerName: "ชื่อผู้ป่วย", width: 180,  valueFormatter: (params) => params.value.FirstName,},
    { field: "Dentist", headerName: "ชื่อทันตแทพย์", width: 180,  valueFormatter: (params) => params.value.FirstName,},
    { field: "Medicine", headerName: "ชื่อยา", width: 395,  valueFormatter: (params) => params.value.Medicine_name,},
    // { field: "Medicine_status", headerName: "สถานะ", width: 140,  valueFormatter: (params) => params.value.Medicine_status_name,},
    { field: "action", headerName: "Action",width: 125, sortable: false, renderCell: ({ row }) =>
      {
        return <ButtonGroup>
          <Button onClick={() => handleDelete1(row.ID)} variant="contained" color="error">
              <DeleteForeverIcon />
          </Button>
          <Button component={RouterLink} to={`/prescription/update/${row.ID}`} variant="contained" color="info">
            <div className="good-font">
              <EditIcon />
            </div>
          </Button>
        </ButtonGroup>;
      }
    },
  ];

  useEffect(() => {
    getPrescriptions();
  }, []);

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
              ข้อมูลตารางการสั่งจ่ายยา
            </Typography>
          </Box>
          <Box>
          <Stack spacing={2} direction="row">
            <Button
                component={RouterLink}
                to="/prescription/create"
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