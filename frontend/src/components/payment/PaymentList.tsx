import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { PaymentInterface } from "../../models/IPayment";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Stack from "@mui/material/Stack";
import axios from 'axios';
import { GetPayment } from "../../services/HttpClientService";

function Payments() {
  const [payments, setPayments] = useState<PaymentInterface[]>([]);

  const getPayments = async () => {
    let res = await GetPayment();
    if (res) {
        setPayments(res);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:8080/employees/${id}`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              'Content-Type': 'application/json',
          }
      });

      if (response.status === 200) {
          console.log("Payment deleted successfully");
          getPayments();
      } else {
          throw new Error("Failed to delete Payment");
      }
  } catch (err) {
      console.error(err);
  }
  };

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 80 },
    //{ field: "Patient", headerName: "ชื่อ ผู้ป่วย", width: 250,  valueFormatter: (params) => params.value.FirstName,},
    //{ field: "Patient", headerName: "นามสกุล", width: 250,  valueFormatter: (params) => params.value.LastName,},
    { field: "Patient", headerName: "เลขประจำตัวประชาชน", width: 300,  valueFormatter: (params) => params.value.Personal_id,},
    { field: "Total_price", headerName: "ราคารวม", width: 250,  valueFormatter: (params) => params.value.Total_price,},
    //{ field: "Medicine", headerName: "ชื่อยา", width: 250,  valueFormatter: (params) => params.value.Medicine_name,},
    //{ field: "Medicine", headerName: "ราคา", width: 250,  valueFormatter: (params) => params.value.Medicine_price,},
    // { field: "Patient", headerName: "ชื่อ ทันตแพทย์", width: 250,  valueFormatter: (params) => params.value.FirstName,},
    // { field: "Patient", headerName: "นามสกุล", width: 250,  valueFormatter: (params) => params.value.LastName,},
    { field: "Payment_status", headerName: "สถานะ", width: 300,  valueFormatter: (params) => params.value.Payment_status_name,},
    {
      field: "action", headerName: "Action",width: 100, sortable: false, renderCell: ({ row }) =>
            <Button onClick={() => handleDelete(row.ID)} size="small" variant="contained" color="error" >
                delete
            </Button>
    },
  ];

  useEffect(() => {
    getPayments();
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
              ข้อมูลตารางการชำระเงิน
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
            rows={payments}
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

export default Payments;