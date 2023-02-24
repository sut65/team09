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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";


function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState<PrescriptionInterface[]>([]);
  const [open, setOpen] = React.useState(false);

  const getPrescriptions = async () => {
    let res = await GetPrescription();
    if (res) {
        setPrescriptions(res);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
    { field: "Patient", headerName: "ชื่อผู้ป่วย", width: 150,  valueFormatter: (params) => params.value.FirstName,},
    { field: "Dentist", headerName: "ชื่อทันตแทพย์", width: 150,  valueFormatter: (params) => params.value.FirstName,},
    { field: "Medicine", headerName: "ชื่อยา", width: 380,  valueFormatter: (params) => params.value.Medicine_name,},
    { field: "Qty", headerName: "จำนวน", width: 60 },
    { field: "Prescription_code", headerName: "รหัสสั่งจ่ายยา", width: 140 },
    { field: "action", headerName: "Action",width: 125, sortable: false, renderCell: ({ row }) =>
      {
        return <ButtonGroup>
          <Button onClick={() => handleClickOpen} variant="contained" color="error">
              <DeleteForeverIcon />
          </Button>
          <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"ต้องการลบข้อมูลหรือไม่?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                หากลบข้อมูลแล้วข้อมูลของพนักงานคนนี้จะหายไป.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => { handleDelete1(row.ID); handleClose();}} variant="contained" autoFocus>
                Yes
              </Button>
              <Button onClick={handleClose} variant="contained" color="error">No</Button>
            </DialogActions>
          </Dialog>
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