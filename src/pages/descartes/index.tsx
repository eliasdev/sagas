/* eslint-disable import/no-anonymous-default-export */
// import React from 'react'
import { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Header } from "../../components/header";
import CssBaseline from '@mui/material/CssBaseline';
import Back from '../../components/back';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'; // Grid version 1
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import Divider from '@mui/material/Divider';
import BottomPanel from "../../components/bottomPanel";
import './index.css';
import { useHistory } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import NaviButton from '../../components/naviButton/index';
import Box from "@mui/material/Box";
import FXDescartes from  './../../assets/characters/full-descartes.png';

const theme = createTheme({

});

export default function Descartes() {

  let history = useHistory();
  const [opened, setOpened] = useState(false);
  const textList = [
    "al notar un fenómeno (hacer una observación)",
    "uno puede hacerse una pregunta",
    "y proponer una respuesta (una hipótesis)",
    "que luego puede poner a prueba."
  ];

  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Header opened={opened} setOpened={setOpened} />
        <main className="descartes">
          <Back></Back>
          <NaviButton position="left" fwd="" bwd="dashboard"/>
          <NaviButton position="right" fwd="descartes2" bwd=""/>
          <Box className="character slide-up" sx={{display: {xs: 'none', lg: 'block'}}}>
            <Box
                component="img"
                src={FXDescartes}
              />
          </Box>
          <Grid className="content-limit">  
              <Grid className="intro-wrapper" sx={{ width: {lg:"60vw", md:"60vw", sm:"78vw", xs:"78vw" }}}>
                <Typography
                  className="intro-subtitle"
                  color="text.secondary"
                  sx={{paddingTop: {lg:10,xs:4}, fontSize: {lg:27,md:27,sm:17,xs:17}, fontWeight:"bold"}}>
                El método científico
                </Typography>
                
                <Divider sx={{ mb: 1, display: {xs: 'none'}}} />
                
                <Grid container spacing={3}>
                  <Grid item xs={6} md={6} lg={6}>
                    <Grid container>
                      <Grid item xs={2} md={2} lg={2}>
                        <div className={"circle"}>1</div>
                      </Grid>
                      <Grid item xs={10} md={10} lg={10}>
                      <Typography lineHeight={1.5} sx={{ mb:1, fontSize: {lg: 15, xs: 11}}}>El método científico es una forma de pensar lógicamente para entender el mundo.</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} md={6} lg={6}>
                    <Grid container>
                      <Grid item xs={2} md={2} lg={2}>
                        <div className={"circle"}>3</div>
                      </Grid>
                      <Grid item xs={10} md={10} lg={10}>
                      <Typography lineHeight={1.5} sx={{ mb:1, fontSize: {lg: 15, xs: 11}}}>Si no puede comprobarse que la respuesta es correcta o incorrecta, entonces la pregunta no es científica. Por ejemplo, no hay manera de comprobar la teoría de que “una estrella de mar es mejor que una ostra”, porque la definición de “mejor” depende de cada persona.</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                <Divider sx={{ mt: 2, mb: 1, display: {xs: 'none'}}}/>

                <Grid container spacing={3}>
                  
                  <Grid item xs={6} md={6} lg={6}>
                    <Grid container>
                      <Grid item xs={2} md={2} lg={2}>
                        <div className={"circle"}>2</div>
                      </Grid>
                      <Grid item xs={10} md={10} lg={10}>
                      <Typography lineHeight={1.5} sx={{ mb:1, fontSize: {lg: 15, xs: 11}}}>Descartes propuso que este tipo de pensamiento se da por pasos: al notar un fenómeno (hacer una observación), uno puede hacerse una pregunta, y proponer una respuesta (una hipótesis), que luego puede poner a prueba.</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={6} md={6} lg={6}>
                    <Grid container>
                      <Grid item xs={2} md={2} lg={2}>
                        <div className={"circle"}>4</div>
                      </Grid>
                      <Grid item xs={10} md={10} lg={10}>
                      <Typography lineHeight={1.5} sx={{ mb:1, fontSize: {lg: 15, xs: 11}}}>Pero uno podría decir, por ejemplo, que las estrellas de mar y las ostras afectan su ambiente de maneras distintas.</Typography>
                      </Grid>
                    </Grid>
                  </Grid>

                </Grid>

              </Grid>
              
            <BottomPanel />       
        </Grid>
      </main>
    </ThemeProvider>
  )
}