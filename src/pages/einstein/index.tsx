/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect } from 'react'
import { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Header } from "../../components/header";
// import { useHistory } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Back from '../../components/back';
import Grid from '@mui/material/Grid'; // Grid version 1
import Divider from '@mui/material/Divider';
import './index.css';
import NaviButton from '../../components/naviButton/index';
import EinsteinImg from  './../../assets/characters/full-einstein.png';
import EinsteinBook from  './../../assets/book.png';
import EinsteinNotes from  './../../assets/einstein-notebook.jpg';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { useHistory } from 'react-router-dom';
import {useUsers} from '../../context/Users'

const theme = createTheme();



export default function Einstein() {
  let history = useHistory();

  const {getUsers} = useUsers();
  const {user}: any = getUsers();

  useEffect(() => {
    if(!user?.descartes){
      history.push("/dashboard");
    }
  }, [user]);

  const [isOpen, setIsOpen] = useState(false);
  const handleClickOpen = () => {
    setIsOpen(true);
  };
  const handleClickClose = () => {
    setIsOpen(false);
  };

  // let history = useHistory();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Header opened={isOpen} setOpened={setIsOpen} />
        <main className="descartes">
          
          <Dialog fullWidth={true} onClose={handleClickClose} open={isOpen}>
            <DialogTitle>Usa esta imagen como referencia</DialogTitle>
            <Box
              onClick={handleClickClose}
              component="img"
              sx={{
                width:"100%"
              }}
              src={EinsteinNotes}
            />

          </Dialog>
          <Back></Back>
          <NaviButton position="left" fwd="" bwd="dashboard"/>
          <NaviButton position="right" fwd="einstein-q" bwd=""/>
          <Grid container className="content-limit" sx={{marginTop: {lg:"8vh",xs:"3vh"}, width: {lg:"84vw",md:"84vw",sm:"84vw",xs:"84vw"}, height: {lg:"63vh",md:"70vh",sm:"68vh",xs:"68vh"}}}>  
            <Grid className="height-inherit width-30">
                <img className="char-image" src={EinsteinImg} width="50%" />
            </Grid>
            <Grid className="height-inherit width-70">
              <Typography
                className="intro-subtitle"
                color="text.secondary"
                sx={{fontSize: {lg:34,md:24,sm:22,xs:22}, paddingTop:{lg:6,xs:4}, fontWeight:"bold"}}>
              Albert Einstein
              </Typography>
              <Typography sx={{ padding:1, paddingRight:5, lineHeight:{lg:2,xs:1.5}, textAlign:"justify", fontSize: {lg: 18,md: 18,sm: 15,xs: 15} }}>Gracias a Einstein tenemos GPS, rayos láser, toallas de papel, predicciones de la bolsa de valores, paneles solares y prueba de que existen los átomos y las moléculas.</Typography>
              <Grid container>
                <Grid className="width-60">
                  <Typography sx={{ padding:1, lineHeight:{lg:2,xs:1.5}, textAlign:"justify", fontSize: {lg: 18,md: 18,sm: 15,xs: 15} }}>Para rescatarlo, busca en sus cuadernos de notas.</Typography>
                </Grid>
                <Grid className="width-40" onClick={() => setIsOpen(true)}>
                  <Box 
                    onClick={() => handleClickOpen()}
                    component="img"
                    sx={{
                      position: 'relative',
                      width:"80%",
                      marginTop:{lg:"-2vh", xs:"-10vh"},
                      marginRight:"5vw",
                      borderRadius:5
                    }}
                    alt="Click para ver notas"
                    src={EinsteinBook}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Divider />  
          </Grid>
        </main>
      </ThemeProvider>
  )
  /*<ThemeProvider theme={theme}>
      <CssBaseline />
        <Header opened={opened} setOpened={setOpened} />
        
        <main>
        
          <div className="content-wrapper">
          <Background/> 
          <div className='content-einstein'>
            <Grid style={{marginTop: '5%', display: 'flex'}}>
                <div style={{width: '25%', marginTop: '10%'}}>
                  <DraggableContentHipotesis />
                  <DraggableContentLeyes />
                  <DraggleContentTeoria />
                </div>
                <div
                id="end1"
                className="handle"
                style={{
                  padding: "10px",
                  width: '25%',
                  height: '95%',
                  position: 'relative',
                  top: '10%',
                  left: '5%',
                  }} 
                >
                  <Typography style={{fontSize: 20, fontWeight: 800, marginBottom: '5%'}}>
                    Metodo Cientifico de investigacion
                  </Typography>
                <img
                  className="cancel"
                  alt="noimaege"
                  src={EinsteinImg}
                  width="87%"
                />
                </div>
          <div style={{position: 'absolute', right: '3%', width: '58%', top: '14%'}}>
            <ul>
              <li style={{display: 'flex'}}>
                <Typography style={{fontSize: '0.8rem', padding: '2%'}}>Para Isaac Newton si la luz solar blanca es una mezcla de todos los colores, y cada color viaja en una longitud de onda diferente, entonces cada color se irá en un ángulo diferente cuando un rayo de luz solar pase a través de un prisma de vidrio.</Typography>
                <div style={{ width: '332px', height: '59px', border: 'solid 1px rgb(0 0 0'}}></div>
              </li>
              <li style={{display: 'flex'}}>
                <Typography style={{fontSize: '0.8rem', padding: '2%'}}>Charles Darwin, en el siglo 19, tenía la hipótesis de  que toda la vida en la tierra tiene el mismo origen y que la diversidad de formas se da cuando ciertos organismos se adaptan para vivir en ambientes específicos o cumplir ciertas funciones.  Esta idea ha sido observada y medida por muchísimas personas, aunque todavía no puede predecirse exactamente.</Typography>
                <div style={{ width: '491px', height: '59px', border: 'solid 1px rgb(0 0 0'}}></div>
              </li>
              <li style={{display: 'flex'}}>
                <Typography style={{fontSize: '0.8rem', padding: '2%'}}>En el siglo 17 Johannes Kepler propuso que los planetas giran alrededor del sol en órbitas elípticas </Typography>
                <div style={{ width: '137px', marginBottom: '4%', height: '59px', border: 'solid 1px rgb(0 0 0'}}></div>
              </li>
              <li style={{display: 'flex'}}>
                <Typography style={{fontSize: '0.8rem', padding: '2%'}}>En 1931, el sacerdote belga Georges Lemaître propuso el Big Bang como una posible explicación del origen del universo. Propone que hace 14 billones de años toda la materia del universo estaba concentrada en un punto, que se expandió repentinamente y sigue expandiéndose hoy.</Typography>
                <div style={{ width: '391px', height: '59px', border: 'solid 1px rgb(0 0 0'}}></div>
              </li>
            </ul>
          </div>
            </Grid>
            </div>
                 
          </div>   
        </main>
    </ThemeProvider>*/
}