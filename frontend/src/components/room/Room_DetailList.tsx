import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GetRoom_Detail } from "../../services/HttpClientService";  
import { Room_DetailInterface } from "../../models/IRoom_Detail";


function Room_Details () {
    const [room_details, setRoom_Details] = useState<Room_DetailInterface[]>([]);
  
    const getRoom_Detail = async () => {
      let res = await GetRoom_Detail();
      if (res) { console.log(res)
        setRoom_Details(res);
      }
    };
  
    const columns: GridColDef[] = [
      { field: "ID", headerName: "ลำดับ", width: 50 },
      { field: "Room_Number", headerName: "หมายเลขห้อง", width: 220,  valueFormatter: (params) => params.value.Room_number,},
      { field: "Category", headerName: "ประเภทห้อง", width: 200 , valueFormatter: (params) => params.value.Category_Name,},  
      { field: "MedicalDevice", headerName: "เครื่องมือ", width: 150 , valueFormatter: (params) => params.value.Device_Name,},
      { field: "Note", headerName: "หมายเหตุ", width: 150 }    
         
         
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