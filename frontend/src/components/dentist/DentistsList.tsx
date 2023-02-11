import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { DentistInterface } from "../../models//IDentist";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { GetDentists } from "../../services/HttpClientService";
import { ButtonGroup } from "@mui/material";
import axios from "axios";

function Dentists() {
  const [dentists, setDentists] = useState<DentistInterface[]>([]);

  const getDentists = async () => {
    let res = await GetDentists();
    if (res.data) { console.log(res)
      setDentists(res.data);
    }
  };

  const handleDelete = async (id: number) => {
    try {
        const response = await axios.delete(`http://localhost:8080/dentists/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
            }
        });

        if (response.status === 200) {
            console.log("Dentist deleted successfully");

            getDentists();
        } else {
            throw new Error("Failed to delete Dentist");
        }
    } catch (err) {
        console.error(err);
    }
};

  const columns: GridColDef[] = [
    { field: "ID", headerName: "ลำดับ", width: 50 },
    { field: "FirstName", headerName: "ชื่อ", width: 100,  valueFormatter: (params) => params.value.FirstName,},
    { field: "LastName", headerName: "นามสกุล", width: 100,  valueFormatter: (params) => params.value.LastName,},
    { field: "Age", headerName: "อายุ", width: 100,  valueFormatter: (params) => params.value.Age,},
    { field: "Phone_Number", headerName: "เบอร์โทรศัพท์", width: 200,  valueFormatter: (params) => params.value.Phone_Number,},
    { field: "Personal_id", headerName: "เลขบัตรประชาชน", width: 150,  valueFormatter: (params) => params.value.Personal_id,},
    { field: "Email", headerName: "อีเมลล์", width: 150 , valueFormatter: (params) => params.value.Email,},  
    { field: "Gender", headerName: "เพศ", width: 80 , valueFormatter: (params) => params.value.Gender_name,},    
    { field: "University", headerName: "มหาวิทยาลัย", width: 200 , valueFormatter: (params) => params.value.University_Name,},
    { field: "Specialized", headerName: "สาขา", width: 250 , valueFormatter: (params) => params.value.Specialized_Name,},
    { field: "Province", headerName: "จังหวัด", width: 150  ,valueFormatter: (params) => params.value.Province_name,},    
       
    {
      field: "action", headerName: "Action",width: 200, sortable: false, renderCell: ({ row }) =>
      <ButtonGroup>
          <Button onClick={() => handleDelete(row.ID)} variant="contained" color="error">
              delete
          </Button>
          <Button component={RouterLink} to={`/dentist_update/${row.ID}`} variant="contained">
                      <div className="good-font">
                          update
                      </div>
                  </Button>
      </ButtonGroup>
  },
  ];

  useEffect(() => {
    getDentists();
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
              ข้อมูลทันตแพทย์
            </Typography>
          </Box>
          <Box>
            <Button
              component={RouterLink}
              to="/dentist/create"
              variant="contained"
              color="inherit"
            >
              สร้างข้อมูล
            </Button>
          </Box>
        </Box>
        <div style={{ height: 400, width: "100%", marginTop: "20px" }}>
          <DataGrid
            rows={dentists}
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

export default Dentists;

