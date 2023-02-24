import React from 'react'
import Container from '@mui/material/Container'
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import DomainAddIcon from '@mui/icons-material/DomainAdd';



function Home() {
  return (
    <div>
      <Slide direction="down" in={true} timeout={2500}>
        <Container maxWidth="md">
        <Box display="flex" justifyContent="center">
      <DomainAddIcon sx={{ fontSize: 200 }} htmlColor="#5CB5DB" />
        </Box>
        <h1 style={{ textAlign: "center" }}>Requirements</h1>
        <h3>ระบบทันตกรรมเป็นระบบทันตกรรมของคลินิก SUT เป็นระบบที่ ให้ผู้ดูแลระบบ ทันตแพทย์และ
พยาบาลเข้าสู่ระบบเพื่อทําการ บันทึกข้อมูลผู้ป่วย, บันทึกข้อมูลพนักงาน, บันทึกข้อมูลทันตเเพทย์บันทึกข้อมูล
ภายในห้อง, บันทึกเครื่องมือแพทย์, แจ้งซ่อมเครื่องมือทันตกรรม, จัดตารางงานแพทย์, นัดผู้ป่วย, บันทึกการ
รักษา, แผนการรักษา, สั่งจ่ายยา และ แจ้งยอดชําระ</h3>
        </Container>
    
          </Slide>
    </div>
  )
}

export default Home