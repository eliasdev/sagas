/* eslint-disable import/no-anonymous-default-export */
// import React from 'react'
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Header } from "../../components/header";
// import { useNavigate } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import ProductView from "../../components/productView";
import { useHistory } from "react-router-dom";
import Grid from '@mui/material/Grid'; // Grid version 1
import Quiz from '../../components/quiz/index';
import { questionsData } from './data';
import Typography from '@mui/material/Typography';
import './index.css';
import NaviButton from "../../components/naviButton";
import Back from "../../components/back";
import { isMobile } from "react-device-detect";
import {useUsers} from '../../context/Users'


const theme = createTheme();

export default function Clodomiro() {

  let history = useHistory();
  const [opened, setOpened] = useState(false);

  const {getUsers} = useUsers();
  const {user}: any = getUsers();

  useEffect(() => {
    if(!user?.tharp){
      history.push("/dashboard");
    }
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Header opened={opened} setOpened={setOpened} />
          <main>

            <Back></Back>
            <NaviButton position="left" fwd="" bwd="dashboard"/>
            <NaviButton position="right" fwd="dashboard" bwd=""/>
            <Grid className="content-limit" container spacing={2}>  

              <Grid item lg={6} xs={6}>
                <div style={{width: "80%", marginLeft:(isMobile?100: 90), marginTop:(isMobile?50: 70) }}>
                  <ProductView></ProductView>
                </div>
              </Grid>
              <Grid item lg={6} xs={6}>
                <Typography sx={{ display: {lg:"block",md:"block",sm:"none",xs: "none"}, textTransform:"uppercase", fontWeight:"bold", paddingLeft:3, paddingRight:3, paddingTop:{lg:10,md:10,sm:2,xs:2}, textAlign:"left", fontSize: {lg: 25,md: 23,sm: 18,xs: 18} }}>Clodomiro Picado</Typography>
                <Quiz questionIndex={0} dataSet={questionsData} />
              </Grid>
            </Grid>
          
          
        </main>
      </ThemeProvider>
  )
}