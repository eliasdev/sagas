/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */
import { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Logo from './../../assets/logo-sagalab-white.svg';
import Giants from './../../assets/giants.jpg';
import Blip from './../../assets/blip.jpg';
import Rose from './../../assets/rose.jpg';
import Manual from './../../assets/manual.jpg';
import Pocket from './../../assets/pocket.jpg';
import Delta from './../../assets/delta.jpg';
import './index.css';
import {useUsers} from '../../context/Users'
import { Header } from "../../components/header";
import { useParams } from 'react-router-dom';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://sagalab.com/">
        sagalab.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme(
  { 
    spacing: 4,
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
    },
  }
);

export default function Homepage() {

  interface RouteParams {
    id: string;
  }

  const { id } = useParams<RouteParams>();
  let history = useHistory();
  const [opened, setOpened] = useState(false);
  
  const {getUsers} = useUsers()
  const {logged}: any = getUsers()

  useEffect(() => {
    if (logged && id != "123" ) {
     history.push('/dashboard');
    }
  }, [history, logged]);
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Header opened={opened} setOpened={setOpened} />
        <main>
          <div className="banner">
          <Box

            sx={{
              // bgcolor: 'background.paper',
              height: '100%',
              pt: '5%',
              pb: '5%',
            }}
            
          >
            <Container maxWidth="md" >
            
            <Box
              component="img"
              width={400}
              sx={{
                display: { xs: 'none', md: 'block', lg: 'block' },
                margin: "0 auto",
                paddingTop:20,
                paddingBottom:10
              }}
              src={Logo}
            />
            
            <Box
              component="img"
              width={250}
              sx={{
                display: { xs: 'block', md: 'none', lg: 'none' },
                margin: "0 auto",
                paddingTop:20,
                paddingBottom:10
              }}
              src={Logo}
            />

            <Typography sx={{
              fontSize: {
                lg: 30,
                md: 23,
                sm: 20,
                xs: 15
              }
            }}
  className="typo-title" variant="h6" align="center" color="primary.contrastText" paragraph>
              Experiencias simuladas para estudiantes con experiencia.
            </Typography>
            
            <Typography sx={{
              fontSize: {
                lg: 27,
                md: 20,
                sm: 17,
                xs: 14
              },
              paddingLeft:10,
              paddingRight:10
            }}
            className="typo-title" variant="h5" align="center" color="primary.contrastText" paragraph>
              Horas de práctica para los estudiantes, sin más trabajo para los profesores. Somos profesores, científicos y artistas simulando misiones para que nuestros niños puedan practicar la materia de clase, entendiendo su contexto.
            </Typography>
            
            <Stack
              sx={{ pt: '6%' }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" onClick={() => history.push('/dashboard')}>Jugar Saga Gigantes</Button>

              <Button variant="outlined" onClick={() => history.push('/sponsor-saga')}>Solicitar un Demo</Button>

            </Stack>
            </Container>

          </Box>
          </div>
          <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
            <Grid container spacing={4}>
              {/*cards.map((card) => (*/}
                <Grid item key={0} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="img"
                      image={Giants}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Saga: Gigantes
                      </Typography>
                      <Typography>
                         (Tags: STEM, lógica, método científico). Edades: 11-13 años.  Introducción a los conceptos básicos del método científico.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Notificar lanzamiento</Button>
                      <Button size="small" onClick={() => history.push('/sponsor-saga')}>Patrocinar esta saga</Button>
                    </CardActions>
                  </Card>
                </Grid>


                <Grid item key={1} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="img"
                      image={Rose}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Saga: The Rose
                      </Typography>
                      <Typography>
                         (Tags: Historia, Centroamérica, independencia, ensayo, debate). Edades: 14-18 años.  Clima político internacional y los eventos que precedieron la independencia de las naciones centroamericanas en 1821.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Notificar lanzamiento</Button>
                      <Button size="small" onClick={() => history.push('/sponsor-saga')}>Patrocinar esta saga</Button>
                    </CardActions>
                  </Card>
                </Grid>



                <Grid item key={2} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="img"
                      image={Delta}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Saga: El Libro de Delta
                      </Typography>
                      <Typography>
                        (Tags: Identidad, historia, cívica, Costa Rica,inclusión, ensayo, liderazgo, presentación oral). Edades: 13-15 años.  Remarca la importancia de incluir las voces de grupos diversos en la historia, y el poder de la participación cívica.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Notificar lanzamiento</Button>
                      <Button size="small" onClick={() => history.push('/sponsor-saga')}>Patrocinar esta saga</Button>
                    </CardActions>
                  </Card>
                </Grid>




                <Grid item key={3} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="img"
                      image={Pocket}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Saga: Pocket Friends
                      </Typography>
                      <Typography>
                        (Tags: amistad, tolerancia, cívica). Edades: 11-13 años. Exploración del concepto del poder ciudadano a través de pequeñas acciones .
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Notificar lanzamiento</Button>
                      <Button size="small" onClick={() => history.push('/sponsor-saga')}>Patrocinar esta saga</Button>
                    </CardActions>
                  </Card>
                </Grid>




                <Grid item key={4} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="img"
                      image={Blip}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Saga: BLIP
                      </Typography>
                      <Typography>
                        (Tags: Historia del mundo, gobernabilidad, ensayo, investigación, debate). Edades: 15-18 años.  Historial general de las civilizaciones antiguas y sus diferentes modelos de gobierno y sociedad.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Notificar lanzamiento</Button>
                      <Button size="small">Patrocinar esta saga</Button>
                    </CardActions>
                  </Card>
                </Grid>




                <Grid item key={5} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="img"
                      image={Manual}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        Saga: Manual de Buenos Modales para Caníbales
                      </Typography>
                      <Typography>
                        (Tags: cívica, finanzas, tecnologías básicas, etiqueta). Edades: 11-15 años.  Compendio de habilidades básicas para la vida: finanzas personales, tecnologías básicas para empleabilidad, interacción social.
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Notificar lanzamiento</Button>
                      <Button size="small" onClick={() => history.push('/sponsor-saga')}>Patrocinar esta saga</Button>
                    </CardActions>
                  </Card>
                </Grid>




              {/*))} */ }
            </Grid>



        </Container>
        </main>
        {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Próxima Saga: 08 de Mayo, 2023
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  )
}