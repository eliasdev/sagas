/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable import/no-anonymous-default-export */
// import React from 'react'
import { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Header } from "../../components/header";
// import { useHistory } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
// import Background from '../../components/back/index';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'; // Grid version 1
// import $ from 'jquery';
// import Magnifier from "react-glass-magnifier";
import {Magnifier, GlassMagnifier} from "react-image-magnifiers";
import './index.css';
import TopImage from  './../../assets/sagas-1-01.jpg';
import BottomImage from  './../../assets/sagas-2-01.jpg';
import Back from '../../components/back';
import { Box } from "@mui/material";
import NaviButton from '../../components/naviButton/index';
import Quiz from '../../components/quiz/index';
import { questionsData } from './data';

const theme = createTheme({});

export default function QuizTharp() {
// let history = useHistory();
const [opened, setOpened] = useState(false);
  return (

    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header opened={opened} setOpened={setOpened} />
      <main className="descartes">
        <Back></Back>
        <NaviButton position="left" fwd="" bwd="dashboard"/>
        <NaviButton position="right" fwd="dashboard" bwd=""/>
        <Grid container className="content-limit" sx={{width: {lg:"82vw",md:"80vw",sm:"84vw",xs:"84"}, height: {lg:"72vh",md:"71vh",sm:"70vh",xs:"70vh"}, marginTop: {lg:1,md:1,sm:3,xs:3}}}>  
          <Grid className="width-50" sx={{position:'relative', marginTop: {lg:8,md:0,sm:2,xs:0}, height:"80vh" }}>
            <div className="magnifier-container">
              <GlassMagnifier
                imageSrc={TopImage}
                imgAlt="small image"
                // zoomFactor={3}
                // glassDimension={200}
                largeImageSrc={BottomImage}
                // glassBorderColor="#d1d1d126"
                // glassBorderWidth={2}
                className="img"
                // style={{ filter: "drop-shadow(0px 0px 7px rgba(0, 0, 0, 0.35))", width: '49vwm !important' }}
              />
            </div>
          </Grid>

          <Grid className={ "width-50 height-inherit lp-border"} sx={{marginTop: {lg:0,md:0,sm:0,xs:0}}}>
            <Typography sx={{ display: {lg:"block",md:"block",sm:"none",xs: "none"}, textTransform:"uppercase", fontWeight:"bold", paddingLeft:3, paddingRight:3, paddingTop:{lg:10,md:10,sm:2,xs:2}, textAlign:"left", fontSize: {lg: 25,md: 23,sm: 18,xs: 18} }}>Marie Tharp</Typography>
            <Quiz questionIndex={0} dataSet={questionsData} />
          </Grid>   
        </Grid>
      </main>
    </ThemeProvider>

  )
}