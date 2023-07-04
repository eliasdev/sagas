/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable import/no-anonymous-default-export */
// import React from 'react'
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Header } from "../../components/header";
// import { useHistory } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
// import Background from '../../components/back/index';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid'; // Grid version 1
// import $ from 'jquery';
// import Magnifier from "react-glass-magnifier";
import './index.css';
import NaviButton from '../../components/naviButton/index';
import Back from '../../components/back';
import Divider from '@mui/material/Divider';
import {useUsers} from '../../context/Users'
import { useHistory } from "react-router-dom";

const theme = createTheme({});

export default function MarieTharp() {
// let history = useHistory();
const [opened, setOpened] = useState(false);

let history = useHistory();

const {getUsers} = useUsers();
const {user}: any = getUsers();

useEffect(() => {
  if(!user?.einstein){
    history.push("/dashboard");
  }
}, [user]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Header opened={opened} setOpened={setOpened} />
        <main className="descartes">
          <Back></Back>
          <NaviButton position="left" fwd="" bwd="dashboard"/>
          <NaviButton position="right" fwd="tharp-q" bwd=""/>
          <Grid className="content-limit" sx={{width: {lg:"80vw",md:"80vw",sm:"84vw",xs:"84"}, height: {lg:"62vh",md:"62vh",sm:"80vh",xs:"80vh"}}}>  
            <Grid>
                
              <Grid container spacing={1} columnSpacing={{ xs: 1, sm: 0, md: 3 }}>
                <Grid className="intro-wrapper" sx={{ width: {lg:"75vw",md:"75vw",sm:"78vw",xs:"78vw"} }}>
                  <Typography
                    className="intro-subtitle"
                    color="text.secondary"
                    sx={{fontSize: {lg:34,md:24,sm:22,xs:22}, padding:{lg:6,md:6,sm:2,xs:2}, paddingTop:{lg:14,md:14,sm:6,xs:6}, fontWeight:"bold"}}>Marie Tharp</Typography>
                  <Typography sx={{display:"block", padding:2, paddingTop: {lg: 2,md: 2,sm: 0,xs: 0}, lineHeight:1.8, textAlign:"justify", fontSize: {lg: 18,md: 18,sm: 15,xs: 15} }}>En 1912 Alfred Wegener pensó que tal vez los continentes habían estado juntos antes y se habían separado. Pero no tenía idea de cómo podían moverse.<br />En los 1950’s Marie Tharpe hizo un mapa del fondo del mar que ayudó a probar que existen las placas tectónicas, que explican el movimiento continental.
<br/>Su tutor pensó que eran “ideas de mujeres” pero los datos de Marie pudieron probar su hipótesis. </Typography>
                  <Divider />
                </Grid>
              </Grid>
            </Grid>        
          </Grid>
        </main>
      </ThemeProvider>
  )
}