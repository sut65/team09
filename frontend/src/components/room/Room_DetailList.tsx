import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack  } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GetRoom_Detail } from "../../services/HttpClientService";  
import { Room_DetailInterface } from "../../models/IRoom_Detail";
import axios from "axios";


function Room_Details () {
    const [room_details, setRoom_Details] = useState<Room_DetailInterface[]>([]);
    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const getRoom_Detail = async () => {
      let res = await GetRoom_Detail();
      if (res) { console.log(res)
        setRoom_Details(res);
      }
    };

    const handleDelete = async (id: number) => {
      try {
          const response = await axios.delete(`http://localhost:8080/room_detail/${id}`, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  'Content-Type': 'application/json',
              }
          });
  
          if (response.status === 200) {
  
              getRoom_Detail();
          } else {
              throw new Error("Failed to delete Room Detail");
          }
      } catch (err) {
          console.error(err);
      }
  };
  
    const columns: GridColDef[] = [
      { field: "ID", headerName: "ลำดับ", width: 50 },
      { field: "Room_Number", headerName: "หมายเลขห้อง", width: 220,  valueFormatter: (params) => params.value.Room_number,},
      { field: "Category", headerName: "ประเภทห้อง", width: 200 , valueFormatter: (params) => params.value.Category_Name,},  
      { field: "MedicalDevice", headerName: "เครื่องมือ", width: 150 , valueFormatter: (params) => params.value.Device_Name,},
      { field: "Note", headerName: "หมายเหตุ", width: 150 },   
      
      
      {
        field: "action", headerName: "",width: 250, sortable: false, renderCell: ({ row }) =>
        <ButtonGroup>
            <Stack spacing={2} direction="row">
            <Button onClick={handleClickOpen} variant="contained" color="error">
                  <DeleteForeverIcon />
                  <div className="good-font">
                            delete
                  </div>
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
                  หากลบข้อมูลแล้วข้อมูลของข้อมูลห้องนี้จะหายไป.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => { handleDelete(row.ID); handleClose();}} variant="contained" autoFocus>
                  Yes
                </Button>
                <Button onClick={handleClose} variant="contained" color="error">No</Button>
              </DialogActions>
            </Dialog>
            <Button component={RouterLink} to={`/room_detail/update/${row.ID}`} variant="contained">
                        <EditIcon />
                        <div className="good-font">
                            update
                        </div>
                        
                    </Button>
            </Stack>
        </ButtonGroup>
      },
    ];
    
      useEffect(() => {
          getRoom_Detail();
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
                  ข้อมูลห้อง
                </Typography>
              </Box>
              <Box>
                <Button
                  component={RouterLink}
                  to="/room_detail/create"
                  variant="contained"
                  color="inherit"
                >
                  สร้างข้อมูล
                </Button>
              </Box>
            </Box>
            <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
              <DataGrid
                rows={room_details}
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
  
  export default Room_Details;