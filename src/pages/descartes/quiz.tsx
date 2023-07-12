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

export default function QuizDescartes() {

  let history = useHistory();
  const [opened, setOpened] = useState(false);

  const handleRedirect = (url: string) => {
    history.push(url);
  };
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Header opened={opened} setOpened={setOpened} />
        <main className="descartes">
          <Back></Back>
          <NaviButton position="left" fwd="" bwd="descartes3"/>
          <NaviButton  position="right" fwd="descartes-q2" bwd=""/>
          <Grid container className="content-limit" sx={{width: {lg:"82vw",md:"80vw",sm:"84vw",xs:"84"}, height: {lg:"72vh",md:"71vh",sm:"70vh",xs:"70vh"}, marginTop: {lg:1,md:1,sm:3,xs:3}}}>  
            <Grid className={ "width-" + ( isMobile? "50" : "40" ) + " height-inherit lp-border" }>
                <Quiz questionIndex={0} dataSet={questionsData} goto={handleRedirect} />
            </Grid>
            <Grid className={ "width-" + ( isMobile? "50" : "60" ) + " height-inherit lp-border"} sx={{marginTop: {lg:6,md:6,sm:0,xs:0}}}>
              <Slider data={sliderData} onlySlide={true}/>
            </Grid>    
          </Grid>
        </main>
      </ThemeProvider>
  )
}