/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */
import { useState, useEffect } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
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
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Tag from './../../components/tag';
import Logo from './../../assets/logo-sagalab.svg';
import Giants from './../../assets/giants.jpg';
import Blip from './../../assets/blip.jpg';
import Rose from './../../assets/rose.jpg';
import Manual from './../../assets/manual.jpg';
import Pocket from './../../assets/pocket.jpg';
import Delta from './../../assets/delta.jpg';
import './index.css';
import { useUsers } from '../../context/Users';
import { Header } from '../../components/header';
import { useParams } from 'react-router-dom';
import MenuList from '@mui/material/MenuList';
import { MenuItem } from '@mui/material';

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

const MyButton = styled(Button)({
  backgroundColor: '#FAA919',
  '&:hover': {
    backgroundColor: '#DC2B27',
  },
});

const theme = createTheme({
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
});

export default function Homepage() {
  interface RouteParams {
    id: string;
  }

  const openWhatsAppChat = function(){
    window.open( "https://wa.me/50688344528", "_blank" );
  }

  const { id } = useParams<RouteParams>();
  let history = useHistory();
  const [opened, setOpened] = useState(false);

  const { getUsers } = useUsers();
  const { logged }: any = getUsers();

  useEffect(() => {
    if (logged && id != '123') {
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
            <Container maxWidth="md">
              <Box
                component="img"
                width={400}
                sx={{
                  display: { xs: 'none', md: 'block', lg: 'block' },
                  margin: '0 auto',
                  paddingTop: 20,
                  paddingBottom: 10,
                }}
                src={Logo}
              />

              <Box
                component="img"
                width={250}
                sx={{
                  display: { xs: 'block', md: 'none', lg: 'none' },
                  margin: '0 auto',
                  paddingTop: 20,
                  paddingBottom: 10,
                }}
                src={Logo}
              />

              <Typography
                sx={{
                  fontSize: {
                    lg: 30,
                    xs: 24
                  },
                }}
                className="typo-title"
                variant="h6"
                align="center"
                color="#3C3B41"
                paragraph
              >
                En Sagalab estamos creando nuevos mundos para educación
              </Typography>

              <Typography
                sx={{
                  fontSize: {
                    lg: 25,
                    xs: 20
                  },
                  paddingLeft: 10,
                  paddingRight: 10,
                  mb:10
                }}
                className="typo-title"
                variant="h5"
                align="center"
                color="#3C3B41"
                paragraph
              >
                Cada una de las sagas en nuestro laboratorio es una experiencia educativa que los profesores pueden asignar como tarea o  examen.
              </Typography>


              <MenuList
                sx={{
                  fontSize: {
                    lg: 22,
                    xs: 18,
                  },
                  width: {lg:"50vw",xs:"80vw"},
                  paddingLeft: 10,
                  paddingRight: 10,
                  margin:"0 auto"
                }}
                className="typo-title"
              >
                <MenuItem
                >
                  - Se califican solas
                </MenuItem>
                <MenuItem
                >
                  - Pueden completarse como trabajo en clase o como competencia con otros colegios
                </MenuItem>
                <MenuItem
                >
                  - Ofrecen un ranking nacional de los mejores estudiantes
                </MenuItem>
                <MenuItem onClick={() => openWhatsAppChat()}>
                  Solicite más información aquí. 👈
                </MenuItem>
              </MenuList>

              <Stack
                sx={{ pt: '6%' }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <MyButton
                  variant="contained"
                  onClick={() => history.push('/dashboard')}
                >
                  Jugar Saga Gigantes
                </MyButton>

                {/*<Button
                  variant="outlined"
                  onClick={() => history.push('/sponsor-saga')}
                >
                  Solicitar un Demo
              </Button>*/}
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
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia component="img" image={Giants} alt="random" />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Saga: Gigantes
                  </Typography>
                  <Typography>
                    Tags: <Tag label="STEM" /> <Tag label="lógica" /> <Tag label="método científico" />
                    Edades: 11-13 años.
                    Introducción a los conceptos básicos del método científico.
                  </Typography>
                </CardContent>
                
              </Card>
            </Grid>

            <Grid item key={1} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia component="img" image={Rose} alt="random" />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Saga: The Rose
                  </Typography>
                  <Typography>
                    Tags: <Tag label="Historia" /> <Tag label="Centroamérica" /> <Tag label="independencia" /> <Tag label="ensayo" /> <Tag label="debate" />
                    Edades: 14-18 años. Clima político internacional y los eventos que precedieron la independencia de las naciones centroamericanas en 1821.
                  </Typography>
                </CardContent>
                
              </Card>
            </Grid>

            <Grid item key={2} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia component="img" image={Delta} alt="random" />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Saga: El Libro de Delta
                  </Typography>
                  <Typography>
                    Tags: <Tag label="Identidad" /> <Tag label="historia" /> <Tag label="cívica" /> <Tag label="Costa Rica" /> <Tag label="inclusión" /> <Tag label="ensayo" /> <Tag label="liderazgo" /> <Tag label="presentación oral" /> Edades: 13-15 años.
                    Remarca la importancia de incluir las voces de grupos
                    diversos en la historia, y el poder de la participación
                    cívica.
                  </Typography>
                </CardContent>
                
              </Card>
            </Grid>

            <Grid item key={3} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia component="img" image={Pocket} alt="random" />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Saga: Pocket Friends
                  </Typography>
                  <Typography>
                    Tags: <Tag label="amistad" /> <Tag label="tolerancia" /> <Tag label="cívica" /> Edades: 11-13 años.
                    Exploración del concepto del poder ciudadano a través de
                    pequeñas acciones .
                  </Typography>
                </CardContent>
                
              </Card>
            </Grid>

            <Grid item key={4} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia component="img" image={Blip} alt="random" />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Saga: BLIP
                  </Typography>
                  <Typography>
                    Tags: <Tag label="Historia del mundo" /> <Tag label="gobernabilidad" /> <Tag label="ensayo" /> <Tag label="investigación" /> <Tag label="debate" /> Edades: 15-18 años. Historial
                    general de las civilizaciones antiguas y sus diferentes
                    modelos de gobierno y sociedad.
                  </Typography>
                </CardContent>
                
              </Card>
            </Grid>

            <Grid item key={5} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia component="img" image={Manual} alt="random" />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    Saga: Manual de Buenos Modales para Caníbales
                  </Typography>
                  <Typography>
                    Tags: <Tag label="cívica" /> <Tag label="finanzas" /> <Tag label="tecnologías básicas" /> <Tag label="etiqueta" />
                    Edades: 11-15 años. Compendio de habilidades básicas para la vida: finanzas personales, tecnologías básicas para empleabilidad, interacción social.
                  </Typography>
                </CardContent>
                
              </Card>
            </Grid>

            {/*))} */}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
