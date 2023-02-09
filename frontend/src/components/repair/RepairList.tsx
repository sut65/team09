import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { RepairInterface } from "../../models/IRepair";
import { GetRepair } from "../../services/HttpClientService";
import moment from "moment";
import axios from 'axios';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function RepairList() {
  const [repair, setRepair] = useState<RepairInterface[]>([]);

  useEffect(() => {
    getRepair();
  }, []);

  const getRepair = async () => {
    let res = await GetRepair();
    if (res) {
      setRepair(res);
    } 
  };

  const Delete = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:8080/repair/${id}`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              'Content-Type': 'application/json',
          }
      });

      if (response.status === 200) {
          console.log("Repair deleted successfully");
          getRepair();
      } else {
          throw new Error("Failed to delete Repair");
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
      field: "MedicalDevice",
      headerName: "อุปกรณ์",
      width: 200,
      valueFormatter: (params) => params.value.Device_Name,
    },
    {
      field: "DamageLevel",
      headerName: "ระดับความเสียหาย",
      width: 150,
      valueFormatter: (params) => params.value.Damage_Choice,
    },
    { field: "Date_Of_Repair", headerName: "วันที่ เวลาตอนบันทึกข้อมูล", width: 250, valueFormatter: (params) => moment(params.value).format('DD-MM-yyyy เวลา hh:mm') },
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
              ข้อมูลการบันทึกการแจ้งซ่อมเครื่องมือแพทย์
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/Repair/create"
              variant="contained"
              color="primary"
            >
              สร้างข้อมูล
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={repair}
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

export default RepairList;