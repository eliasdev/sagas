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
import { quizStatements, quizId, questionId } from "./data";
import { isMobile } from "react-device-detect";
import QuizCategory from "../../components/quizCategory";
import Box from "@mui/material/Box";
import FXEinstein from  './../../assets/characters/full-einstein.png';

const theme = createTheme({});

export default function QuizEinstein() {

  let history = useHistory();
  const [opened, setOpened] = useState(false);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Header opened={opened} setOpened={setOpened} />
        <main className="descartes">
          <Back></Back>
          <NaviButton position="left" fwd="" bwd="einstein"/>
          <NaviButton position="right" fwd="dashboard" bwd=""/>
          <Grid container className="content-limit" sx={{width: {lg:"82vw",md:"80vw",sm:"84vw",xs:"84"}, height: {lg:"72vh",md:"71vh",sm:"70vh",xs:"70vh"}, marginTop: {lg:1,md:1,sm:3,xs:3}}}>  
            <Grid className={ "width-" + ( isMobile? "50" : "40" ) + " height-inherit lp-border" }>
              <Typography sx={{paddingLeft:3, paddingRight:3, paddingTop:{lg:15,xs:4}, fontSize: {lg: 18, xs: 15}}}>Evalúa los siguientes enunciados y selecciona la categoría a la que corresponde.</Typography>
              <Box className="character-einstein slide-up" sx={{width:{ lg:240, xs:100 } }}>
                <Box
                    component="img"
                    src={FXEinstein}
                  />
              </Box>
            </Grid>
            <Grid className={ "width-" + ( isMobile? "50" : "60" ) + " height-inherit lp-border"} sx={{marginTop: {lg:6,md:6,sm:0,xs:0}}}>
                <QuizCategory data={quizStatements} quizId={quizId} id={questionId} />
            </Grid>    
          </Grid>
        </main>
      </ThemeProvider>
  )
}