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
import { ButtonGroup } from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import moment from "moment";

function Payments() {
  const [payments, setPayments] = useState<PaymentInterface[]>([]);

  const getPayments = async () => {
    let res = await GetPayment();
    if (res) {
        setPayments(res);
    }
  };

  const handleDelete1 = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:3001/delete-payment/${id}`, {
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

  const handleDelete = async (id: number) => {
    try {
      const response = await axios.delete(`http://localhost:3001/delete-prescription/${id}`, {
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
    { field: "Patient", headerName: "เลขประจำตัวประชาชน", width: 250,  valueFormatter: (params) => params.value.Personal_id,},
    { field: "Total_price", headerName: "ราคารวม", width: 220,  valueFormatter: (params) => params.value.Total_price,},
    { field: "Payment_status", headerName: "สถานะ", width: 180,  valueFormatter: (params) => params.value.Payment_status_name,},
    { field: "DateTimePayment", headerName: "วันที่ เวลาตอนบันทึกข้อมูล", width: 245, valueFormatter: (params) => moment(params.value).format('DD-MM-yyyy เวลา hh:mm') },
    { field: "action", headerName: "Action",width: 125, sortable: false, renderCell: ({ row }) =>
      {
        return <ButtonGroup>
          <Button onClick={() => handleDelete1(row.ID)} variant="contained" color="error">
            <DeleteForeverIcon />
          </Button>
          <Button component={RouterLink} to={`/paymentupdate/${row.ID}`} variant="contained" color="info">
            <div className="good-font">
              <EditIcon />
            </div>
          </Button>
        </ButtonGroup>;
      }
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
                to="/payment/create"
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