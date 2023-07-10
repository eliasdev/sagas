import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Header } from '../../components/header';
import CssBaseline from '@mui/material/CssBaseline';
import Back from '../../components/back';
import Grid from '@mui/material/Grid';
import './index.css';
import { useHistory } from 'react-router-dom';
import NaviButton from '../../components/naviButton/index';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

const theme = createTheme({});

export default function Welcome() {
  let history = useHistory();
  const [opened, setOpened] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header opened={opened} setOpened={setOpened} />
      <main className="descartes">
        <Back></Back>
        <NaviButton position="left" fwd="" bwd="welcome" />
        <NaviButton position="right" fwd="dashboard" bwd="" />
        <Grid
          className="content-limit"
          sx={{
            marginTop: { lg: 5, xs: 0 },
            width: { lg: '90vw', xs: '84vw' },
            height: { lg: '72vh', xs: '72vh' },
          }}
        >
          <Grid
            className="intro-wrapper"
          >
            <Grid className="banner-welcome">
              <Grid>
                <Typography
                  color={'white'}
                  variant="h2"
                  sx={{ fontSize: { lg: 34, xs: 19 } }}
                  className="typo-title"
                >
                  Gigantes, cada uno ayudó a construir el mundo. <br />Nuestra misión
                  es rescatarlos.
                </Typography>
                <Typography sx={{ color: 'white', pt:{lg:5,xs:2}, pb:{lg:3,xs:0}, fontSize: {lg: 18, xs: 15} }} variant="h5">¿Qué hay que hacer?</Typography>
                <List sx={{ width: {lg:'60vw',xs:'75vw'}, margin: '0 auto', paddingY: 0 }}>
                  <ListItem sx={{ paddingBottom: 0, paddingTop: 0 }}>
                    <ListItemText
                      disableTypography
                      sx={{ color: 'white', fontSize: {lg: 18, xs: 13} }}
                      primary="Investiga el archivo de cada científico."
                      secondary={
                        <Typography sx={{ color: 'white', fontSize: {lg: 18, xs: 13} }}>
                          Si la persona está desaparecida, resuelve un reto para
                          que regrese a la galería.
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem sx={{ paddingBottom: 0, paddingTop: 0 }}>
                    <ListItemText
                      disableTypography
                      sx={{ color: 'white', fontSize: {lg: 18, xs: 13} }}
                      primary="En modalidad de quiz, recibirás puntos por cada reto resuelto."
                      secondary={
                        <Typography sx={{ color: 'white', fontSize: {lg: 18, xs: 13} }}>
                          En modalidad de competencia se agregan puntos por
                          patentes y premios y compites con otros.
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      disableTypography
                      sx={{ color: 'white', fontSize: {lg: 18, xs: 13} }}
                      primary="¡Buena suerte! Haz click en el botón de siguiente a la derecha de la pantalla."
                    />
                  </ListItem>
                  <Divider />
                </List>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </main>
    </ThemeProvider>
  );
}
