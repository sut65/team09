import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { MedicalDeviceInterface } from "../../models/IMedicaldevice";
import { GetMedicalDevice } from "../../services/HttpClientService";
import moment from "moment";
import axios from 'axios';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function MedicalDeviceList() {
  const [medicalDevice, setMedicalDevice] = useState<MedicalDeviceInterface[]>([]);

  useEffect(() => {
    getMedicalDevice();
  }, []);

  const getMedicalDevice = async () => {
    let res = await GetMedicalDevice();
    if (res) {
      setMedicalDevice(res);
    } 
  };

  const Delete = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:8080/medicaldevice/${id}`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              'Content-Type': 'application/json',
          }
      });

      if (response.status === 200) {
          console.log("MedicalDevic deleted successfully");
          getMedicalDevice();
      } else {
          throw new Error("Failed to delete MedicalDevic");
      }
  } catch (err) {
      console.error(err);
  }
  };


  const columns: GridColDef[] = [
    { field: "ID", headerName: "No.", width: 50 },
    {
      field: "Employee",
      headerName: "ผู้บันทึกข้อมูล",
      width: 170,
      valueFormatter: (params) => params.value.FirstName,
    },
    {
      field: "Type",
      headerName: "ประเภท",
      width: 200,
      valueFormatter: (params) => params.value.Type_Name,
    },
    {
      field: "Status",
      headerName: "การฆ่าเชื้อ",
      width: 150,
      valueFormatter: (params) => params.value.Status_Choice,
    },
    { field: "Device_Name", headerName: "ชื่ออุปกรณ์", width: 210 },
    { field: "Amount", headerName: "จำนวน", width: 70 },
    { field: "Record_Date", headerName: "วันที่ เวลาตอนบันทึกข้อมูล", width: 250, valueFormatter: (params) => moment(params.value).format('DD-MM-yyyy เวลา hh:mm') },
    {
      field: "action", headerName: "Action",width: 100, sortable: false, renderCell: ({ row }) =>
            <Button  onClick={() => Delete(row.ID)} size="small" variant="contained" color="error" >
                Delete <DeleteForeverIcon />
            </Button>
    },

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
              ข้อมูลการบันทึกข้อมูลเครื่องมือแพทย์
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/MedicalDevice/create"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูล
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={medicalDevice}
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

export default MedicalDeviceList;