import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { PatientInterface } from "../../models/IPatient";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import { GetEmployee } from "../../services/HttpClientService";

function Patient() {
  const [patient, setPatient] = useState<PatientInterface[]>([]);

  const getEmployes = async () => {
    let res = await GetEmployee();
    if (res) {
      setPatient(res);
    }
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    { field: "FirstName", headerName: "ชื่อ", width: 250,  valueFormatter: (params) => params.value.FirstName,},
    { field: "LastName", headerName: "นามสกุล", width: 250,  valueFormatter: (params) => params.value.LastName,},
    { field: "Personal_id", headerName: "เลขประจำตัวประชาชน", width: 250,  valueFormatter: (params) => params.value.Personal_id,},
    { field: "Old", headerName: "อายุ", width: 250,  valueFormatter: (params) => params.value.Old,},
    { field: "Weight", headerName: "น้ำหนัก", width: 250,  valueFormatter: (params) => params.value.Weight,},
    { field: "Height", headerName: "ส่วนสูง", width: 250,  valueFormatter: (params) => params.value.Height,},
    { field: "Underlying_disease", headerName: "โรคประจำตัว", width: 250,  valueFormatter: (params) => params.value.Underlying_disease,},
    { field: "Drug_alergy ", headerName: "การแพ้ยา", width: 250,  valueFormatter: (params) => params.value.Drug_alergy,},
    { field: "House_no", headerName: "ที่อยู่", width: 250,  valueFormatter: (params) => params.value.House_no,},
    { field: "Sub_district", headerName: "ตำบล", width: 250,  valueFormatter: (params) => params.value.Sub_district_name,},
    { field: "District", headerName: "อำเภอ", width: 250,  valueFormatter: (params) => params.value.District_name,},
    { field: "Province", headerName: "จังหวัด", width: 250,  valueFormatter: (params) => params.value.Province_name,},
    { field: "Gender", headerName: "เพศ", width: 100 , valueFormatter: (params) => params.value.Gender_name,},       
    { field: "Symptom", headerName: "อาการเบื้องต้น", width: 250,  valueFormatter: (params) => params.value.Symptom.Symptom_name,},
  ];

  useEffect(() => {
    getEmployes();
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
              ข้อมูลผู้ป่วย
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
                to="/patients/create"
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
            rows={patient}
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

export default Patient;