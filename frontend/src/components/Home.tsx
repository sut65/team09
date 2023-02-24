import React from 'react'
import Container from '@mui/material/Container'
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";




function Home() {
  return (
    <div>
        <Container maxWidth="md">
        <h2 style={{ textAlign: "center" }}>Requirements</h2>
        
        <Slide direction="down" in={true} timeout={10000}>
        <Typography variant="h1" component="h1">
          นี่งานหรือเมีย
          อยู่ด้วยกันตลอด
          เกิ๊นนนนน~~~นนน

          </Typography>
          </Slide>
        </Container>
    </div>
  )
}

export default Home