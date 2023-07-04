/* eslint-disable import/no-anonymous-default-export */
// import React from 'react'
import { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Header } from "../../components/header";
import CssBaseline from '@mui/material/CssBaseline';
import Slider from '../../components/slider/index';
import Back from '../../components/back';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'; // Grid version 1
import Divider from '@mui/material/Divider';
import './index.css';
import { useHistory } from "react-router-dom";
import NaviButton from '../../components/naviButton/index';
import { sliderData } from './data';


const theme = createTheme({});

export default function Descartes3() {

  let history = useHistory();
  const [opened, setOpened] = useState(false);

  
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Header opened={opened} setOpened={setOpened} />
        <main className="descartes">
          <Back></Back>
          <NaviButton position="left" fwd="" bwd="descartes2"/>
          <NaviButton position="right" fwd="descartes-q" bwd=""/>
          <Grid className="content-limit" sx={{marginTop: {lg:"4vh",md:"4vh",sm:"3vh",xs:"3vh"}, width: {lg:"84vw",md:"84vw",sm:"84vw",xs:"84vw"}, height: {lg:"70vh",md:"70vh",sm:"68vh",xs:"68vh"}}}>  
           
                <Grid sx={{marginTop:{lg:"2vh",md:"2vh",sm:"1vh",xs:"1vh"}}} container spacing={1} columnSpacing={{ xs: 1, sm: 0, md: 3 }}>
                  <Grid className="intro-wrapper" sx={{ width: {lg:"84vw",md:"82vw",sm:"85vw",xs:"85vw"}, height: {lg:"84vh",md:"82vh",sm:"85vh",xs:"85vh"} }}>
                    <Slider data={sliderData}/>
                    <Divider />
                  </Grid>
                </Grid>
                
          </Grid>
        </main>
      </ThemeProvider>
  )
}