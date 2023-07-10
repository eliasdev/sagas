/* eslint-disable import/no-anonymous-default-export */
// import React from 'react'
import { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Header } from "../../components/header";
import CssBaseline from '@mui/material/CssBaseline';
import Back from '../../components/back';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'; // Grid version 1
import Divider from '@mui/material/Divider';
import './index.css';
import { useHistory } from "react-router-dom";
import NaviButton from '../../components/naviButton/index';
import SliderImage1 from  './../../assets/lab-descartes/descartes01.jpg';
import SliderImage2 from  './../../assets/lab-descartes/descartes02.png';
import SliderImage3 from  './../../assets/lab-descartes/descartes03.jpg';
import SliderImage4 from  './../../assets/lab-descartes/descartes04.jpg';

const theme = createTheme({});

export default function Descartes2() {

  let history = useHistory();
  const [opened, setOpened] = useState(false);

  const sliderData = [
    {
      id: 1,
      img: SliderImage1,
      text: "Al ver el ecosistema de la playa."
    },
    {
      id: 2,
      img: SliderImage2,
      text: "Se preguntó qué pasaría al sacar el depredador principal, la estrella de mar"
    },
    {
      id: 3,
      img: SliderImage3,
      text: "Pensó que el resto de las especies deberían prosperar"
    },
    {
      id: 4,
      img: SliderImage4,
      text: "E hizo la prueba hacienda las estrellas de las pozas durante meses"
    }
    
  ];
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Header opened={opened} setOpened={setOpened} />
        <main className="descartes">
          <Back></Back>
          <NaviButton position="left" fwd="" bwd="descartes"/>
          <NaviButton position="right" fwd="descartes3" bwd=""/>
          <Grid className="content-limit" sx={{width: {lg:"80vw",xs:"84"}, height: {lg:"62vh",xs:"67vh"}}}>  
            <Grid>
                <Grid container spacing={1} columnSpacing={{ xs: 1, sm: 0, md: 3 }}>
                  <Grid className="intro-wrapper" sx={{ width: {lg:"75vw",xs:"78vw"} }}>
                    <Typography
                      className="intro-subtitle"
                      color="text.secondary"
                      sx={{fontSize: {lg:34,xs:22}, padding:{lg:6,xs:2}, paddingTop:{lg:14,xs:7}, fontWeight:"bold"}}>
                    El método científico
                    </Typography>
                    <Typography
                      className="h5"
                      color="text.secondary">Experimentos de Robert Paine
                      </Typography>
                    <Typography sx={{ padding:2, lineHeight:2, textAlign:"justify", fontSize: {lg: 18, xs: 15} }}>En 1963 Robert Paine pensó que si uno elimina el depredador dominante de un ecosistema, el resto de las especies deberían prosperar. Decidió hacer el experimento en las piscinas marinas de la costa, donde la estrella de mar era el depredador principal.</Typography>
                    <Divider />
                  </Grid>
                </Grid>
            </Grid>        
          </Grid>
        </main>
      </ThemeProvider>
  )
}