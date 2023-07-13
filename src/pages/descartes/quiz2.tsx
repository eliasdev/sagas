/* eslint-disable import/no-anonymous-default-export */
// import React from 'react'
import { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Header } from "../../components/header";
import CssBaseline from '@mui/material/CssBaseline';
import Back from '../../components/back';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'; // Grid version 1
import './index.css';
import { useHistory } from "react-router-dom";
import NaviButton from '../../components/naviButton/index';
import Quiz from '../../components/quiz/index';
import { sliderData, questionsData } from './data';
import Slider from '../../components/slider/index';
import { isMobile } from "react-device-detect";


const theme = createTheme({});

export default function QuizDescartes2() {

  let history = useHistory();
  const [opened, setOpened] = useState(false);



  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Header opened={opened} setOpened={setOpened} />
        <main className="descartes">
          <Back></Back>
          <NaviButton position="left" fwd="" bwd="descartes-q"/>
          <NaviButton position="right" fwd="dashboard" bwd=""/>

          <Grid container className="content-limit" sx={{width: {lg:"82vw",xs:"84vw"}, height: {lg:"72vh",xs:"70vh"}, marginTop: {lg:1,xs:3}}}>  
            <Grid className={ "width-" + ( isMobile? "50" : "45" ) + " height-inherit lp-border" }>
                <Quiz questionIndex={1} dataSet={questionsData} />
            </Grid>
            <Grid className={ "width-" + ( isMobile? "50" : "55" ) + " height-inherit lp-border"} sx={{marginTop: {lg:6,xs:0}}}>
              <Slider data={sliderData} onlySlide={true}/>
            </Grid>    
          </Grid>



        </main>
      </ThemeProvider>
  )
}