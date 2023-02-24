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
import ButtonGroup from "@mui/material/ButtonGroup";
import EditIcon from '@mui/icons-material/Edit';
import { Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Snackbar } from "@mui/material";

function RepairList() {
  const [repair, setRepair] = useState<RepairInterface[]>([]);
  const [message, setAlertMessage] = React.useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [rowId, setrowID] = React.useState<string>("");

  const handleClose = (
  
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
        return;
    }
    setSuccess(false);
    setError(false);
  };

  useEffect(() => {
    getRepair();
  }, []);

  const getRepair = async () => {
    let res = await GetRepair();
    if (res) {
      setRepair(res);
    } 
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const Close = () => {
    setOpen(false);
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
          setSuccess(true);
          setAlertMessage("Deleted successfully");
      } else {
          setError(true);
          setAlertMessage("Deleted unsuccessfully");
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
    { field: "Repair_Note", headerName: "หมายเหตุ", width: 210 },
    { field: "Date_Of_Repair", headerName: "วันที่ เวลาตอนบันทึกข้อมูล", width: 250, valueFormatter: (params) => moment(params.value).format('DD-MM-yyyy เวลา hh:mm') },
    {
      field: "action", headerName: "Action",width: 150, sortable: false, renderCell: ({ row }) =>
      {
        return <ButtonGroup>
          <Button aria-label="delete" onClick={handleClickOpen} variant="contained" color="error" style={{marginRight: 5}} >
      <DeleteForeverIcon />
           </Button>
           <Dialog
        open={open}
        onClose={Close}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"ต้องการลบข้อมูลหรือไม่?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                หากลบข้อมูลแล้วข้อมูลนี้จะหายไป.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              
              <Button onClick={() => {Delete(Number(rowId)); Close();}} variant="contained" autoFocus >
                Yes
              </Button>
              <Button onClick={Close} variant="contained" color="error">No</Button>
            </DialogActions>
          </Dialog>
          <Button component={RouterLink} to={`/Repair/update/${row.ID}`} variant="contained" color="info">
            <div className="good-font">
              <EditIcon />
            </div>
          </Button>
        </ButtonGroup>;
      }
    },

  ];

  return (
    <div>
      <Container maxWidth="md">
      <Snackbar
                id="success"
                open={success}
                autoHideDuration={3000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                >
                <Alert onClose={handleClose} severity="success">
                    {message}
                </Alert>
                </Snackbar>
                <Snackbar id="error" open={error} autoHideDuration={3000} onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}>
                <Alert onClose={handleClose} severity="error">
                    {message}
                </Alert>
                </Snackbar>
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
            onRowClick={(params) => {
              console.log(params.row.ID); 
              setrowID(params.row.ID)
              
            }}
          />
        </div>
      </Container>
    </div>
  );
}

export default RepairList;