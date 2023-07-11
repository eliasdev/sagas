/* eslint-disable jsx-a11y/alt-text */
// import { useNavigate } from "react-router-dom";
// import {useUsers} from '../../context/Users';
import { useEffect, useState } from 'react';
import { createTheme, ThemeProvider, makeStyles } from '@mui/material/styles';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import CssBaseline from '@mui/material/CssBaseline';
import { Header } from '../../components/header';
import BottomPanel from '../../components/bottomPanel';
import './index.css';
import Button from '@mui/material/Button';
// import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import MenuItem from '@mui/material/MenuItem';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Modal from '@mui/material/Modal';
import Divider from '@mui/material/Divider';
import Descartes from './../../assets/characters/thumb-descartes.png';
import Herasto from './../../assets/characters/thumb-herasto.png';
import Einstein from './../../assets/characters/thumb-einstein.png';
import Tharp from './../../assets/characters/thumb-tharp.png';
import Santos from './../../assets/characters/thumb-alberto.png';
import Curie from './../../assets/characters/thumb-marie.png';
import Turing from './../../assets/characters/thumb-allan.png';
import Clodomiro from './../../assets/characters/thumb-clodomiro.png';
import winDescartes from './../../assets/badges/descartes-cert.png';
import winEinstein from './../../assets/badges/einstein-cert.png';
import winTharp from './../../assets/badges/tharp-cert.png';
import winClodomiro from './../../assets/badges/clodomiro-cert.png';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useHistory } from 'react-router-dom';
import Back from '../../components/back';
import Box from '@mui/system/Box';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import {
  perdidoDescartes,
  perdidoEinstein,
  perdidoTharp,
} from './../../utils/sound';
import { TextField, autocompleteClasses } from '@mui/material';
import { useUsers } from '../../context/Users';
import {
  getDocs,
  collection,
  updateDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import { db } from './../.././firebase/firebase';
import emailjs from 'emailjs-com';
import { styled } from '@mui/system';

const StyledIcon = styled(PlayCircleIcon)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 10,
  right: 0,
  '&:hover': {
    color: 'red', // Change the color to your desired hover color
  },
});

export default function Dashboard() {
  let history = useHistory();
  const { getUsers, logOut, updateUser } = useUsers();
  const { logged, user }: any = getUsers();

  const [openGenderModal, setOpenGenderModal] = useState(false);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [winImage, setWinImage] = useState('');
  const [gender, setGender] = useState('');
  const [sex, setSex] = useState('');
  const [province, setProvince] = useState('');
  const [age, setAge] = useState<number | ''>(0);

  useEffect(() => {
    checkAvailability(chapters[0]);
    checkAvailability(chapters[1]);
    checkAvailability(chapters[2]);
    checkAvailability(chapters[3]);
    if (
      (!user?.gender || !user?.sex || !user?.age || !user?.province) &&
      user?.role === 'PLAYER'
    ) {
      setOpenGenderModal(true);
    }
    if (!logged) {
      history.push('/');
    }
    setAge(-1);
    setProvince('-1');
    setSex('-1');
    setGender('-1');
  }, []);

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
  const [opened, setOpened] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(0);

  const [chapters, setChapters] = useState([
    {
      id: 1,
      name: 'René',
      quizId: 'descartes',
      last_name: 'Descartes',
      intro:
        'Sin el método científico no sabríamos nada del universo, ni los virus y bacterias.',
      image: Descartes,
      description:
        'Descartes (1596-1650) fue uno de los proponentes del método científico: la forma en que hacemos ciencia. Gracias a pioneros como él la ciencia pasó de describir lo que podemos ver a descubrir lo que no sabemos.    Sin el método científico no habríamos confirmado que existen los virus y las bacterias, no sabríamos que existen planetas fuera del sistema solar y no tendríamos explicaciones para fenómenos como las tormentas eléctricas y los huracanes. Para rescatar a Descartes, practica el método científico.',
      goToPage: 'descartes',
      available: true,
      canPlay: true,
      contributions: [
        'Filosofía',
        'Coordenadas cartesianas',
        'Uso de letras en álgebra',
        'Método científico',
      ],
      sound: perdidoDescartes
    },
    {
      id: 2,
      quizId: 'einstein',
      name: 'Albert',
      last_name: 'Einstein',
      intro:
        'Gracias a Einstein tenemos GPS, rayos láser, toallas de papel, predicciones de la bolsa de valores, paneles solares y prueba de que existen los átomos y las moléculas.',
      image: Einstein,
      description:
        'Descartes (1596-1650) fue uno de los proponentes del método científico: la forma en que hacemos ciencia.',
      goToPage: 'einstein',
      available: true,
      canPlay: false,
      contributions: [
        'Teoría de la relatividad',
        'Relación entre masa y energía',
        'Existencia de los átomos',
      ],
      sound:perdidoEinstein
    },
    {
      id: 3,
      quizId: 'tharp',
      name: 'Marie',
      last_name: 'Tharp',
      intro:
        'Sin Marie Tharpe, no sabríamos por qué pasan los terremotos, ni cómo construir mejores edificios.',
      image: Tharp,
      description:
        'Descartes (1596-1650) fue uno de los proponentes del método científico: la forma en que hacemos ciencia.',
      goToPage: 'tharp',
      available: true,
      canPlay: false,
      contributions: [
        'Primer mapa del fondo del mar',
        'Comprobación de la teoría de la deriva continental',
      ],
      sound: perdidoTharp
    },
    {
      id: 4,
      quizId: 'clodomiro',
      name: 'Clodomiro',
      last_name: 'Picado',
      intro:
        'Sin Clorito Picado, miles de personas morirían cada año por mordeduras de serpientes.',
      image: Clodomiro,
      description:
        'Descartes (1596-1650) fue uno de los proponentes del método científico: la forma en que hacemos ciencia.',
      goToPage: 'clodomiro',
      available: true,
      canPlay: false,
      contributions: [
        'Enfermedades infecciosas',
        'Envejecimiento',
        'Penicilina',
        'Antídotos para el veneno de serpiente',
      ],
      sound: null
    },
    {
      id: 5,
      name: 'de Cyrene',
      last_name: 'Eratóstenes',
      intro:
        'Sin saber la forma de la tierra no podríamos predecir el clima ni calcular las rutas de los aviones.',
      image: Herasto,
      description:
        'Descartes (1596-1650) fue uno de los proponentes del método científico: la forma en que hacemos ciencia.',
      goToPage: 'einstein',
      available: false,
      released: false,
      contributions: [
        'Padre de la geografía',
        'Mapa del mundo',
        'Calculó la circunferencia de la Tierra',
      ],
      sound: null
    },
    {
      id: 6,
      name: 'Alberto',
      last_name: 'Santos-Dumont',
      intro:
        'Sin personas como Santos-Dumont, no tendríamos aviación comercial.  Para rescatarlo, trabaja en su taller.',
      image: Santos,
      description:
        'Santos-Dumont (1873-1932) fue de los primeros en volar por sus propios medios, con despegue y aterrizaje autónomos',
      goToPage: null,
      available: false,
      released: false,
      contributions: [
        'Enfermedades infecciosas',
        'Envejecimiento',
        'Penicilina',
        'Antídotos para el veneno de serpiente',
      ],
      sound: null
    },
    {
      id: 7,
      name: 'Marie',
      last_name: 'Curie',
      intro:
        'Sin su trabajo, y el de otros como ella, no tendríamos rayos X, energía nuclear, ni tratamientos de radioterapia.',
      image: Curie,
      description:
        'Santos-Dumont (1873-1932) fue de los primeros en volar por sus propios medios, con despegue y aterrizaje autónomos',
      goToPage: null,
      available: false,
      released: false,
      contributions: [
        'Enfermedades infecciosas',
        'Envejecimiento',
        'Penicilina',
        'Antídotos para el veneno de serpiente',
      ],
      sound: null
    },
    {
      id: 8,
      name: 'Allan',
      last_name: 'Turing',
      intro:
        'Padre de la Inteligencia Artificial, Turing desarrolló una prueba donde un entrevistador haría preguntas sin saber si hablaba con un ser humano o una IA.',
      image: Turing,
      description:
        'Santos-Dumont (1873-1932) fue de los primeros en volar por sus propios medios, con despegue y aterrizaje autónomos',
      goToPage: null,
      available: false,
      released: false,
      contributions: [
        'Enfermedades infecciosas',
        'Envejecimiento',
        'Penicilina',
        'Antídotos para el veneno de serpiente',
      ],
      sound: null
    },
  ]);

  const handleModal = (openModal: boolean, idx: number) => {
    setOpenModal(openModal);
    setSelectedChapter(idx);
  };

  const isPlayer = () => {
    return user?.role === 'PLAYER' ? true : false;
  };

  const checkAvailability = async (ch: any) => {
    if (!user?.id) {
      // Handle the case when user?.id is undefined
      return;
    }

    const dataQuery = query(
      collection(db, 'tracker'),
      where('id', '==', user?.id)
    );
    const dataResponse = await getDocs(dataQuery);
    const results = dataResponse.docs.map((doc: any) => doc.data());

    // check if results have more than 2 results with the same quizId and points > 0
    const filtered = results.filter(
      (r: any) => r.quizId === ch.quizId && r.points > 0
    );

    let numberOfPoints = 0;
    switch (ch.quizId) {
      case 'descartes':
        numberOfPoints = 1;
        break;
      case 'einstein':
        numberOfPoints = 6;
        break;
      case 'tharp':
        numberOfPoints = 0;
        break;
      case 'clodomiro':
        numberOfPoints = 0;
        break;
    }

    if (filtered.length > numberOfPoints) {
      // update chapter availability on chapters variable
      let nextChapter: any = null;
      setChapters(
        chapters.map((c: any, idx: number) => {
          if (c.quizId === ch.quizId) {
            if (!user[`${ch.quizId}`]) {
              updateDoc(doc(db, 'users', user?.id), {
                [`${ch.quizId}`]: true,
              })
                .then(() => {
                  updateUser({ ...user, [`${ch.quizId}`]: true });
                  switch (`${ch.quizId}`) {
                    case 'descartes':
                      setWinImage(winDescartes);
                      break;
                    case 'einstein':
                      setWinImage(winEinstein);
                      break;
                    case 'tharp':
                      setWinImage(winTharp);
                      break;
                    case 'clodomiro':
                      setWinImage(winClodomiro);
                      break;

                    default:
                      break;
                  }
                  setShowWinnerModal(true);
                })
                .catch((error) => {
                  console.error('Error updating document: ', error);
                });
            }
            c.available = false;
            nextChapter = idx + 1;
          }
          return c;
        })
      );

      if (nextChapter) {
        setChapters(
          chapters.map((c: any, idx: number) => {
            if (idx === nextChapter) {
              c.canPlay = true;
            }
            return c;
          })
        );
      }
    }
  };

  const updateUserGender = async () => {
    await updateDoc(doc(db, 'users', user.id!), {
      gender,
      province,
      sex,
      age,
    })
      .then(() => {
        updateUser({ ...user, gender, province, sex, age });
        setOpenGenderModal(false);
      })
      .catch((error) => {
        alert('Error updating document: ');
      });
  };

  const fetchData = async () => {
    const dataQuery = query(
      collection(db, 'tracker'),
      where('id', '==', user.id)
    );

    const dataResponse = await getDocs(dataQuery);
    const historyData = dataResponse.docs.map((doc) => doc.data());

    const quizTracker = historyData.filter(
      (track) => track.quizId === 'descartes'
    );
    const quizTracker2 = historyData.filter(
      (track) => track.quizId === 'einstein'
    );
    const quizTracker3 = historyData.filter(
      (track) => track.quizId === 'tharp'
    );
    const quizTracker4 = historyData.filter(
      (track) => track.quizId === 'clodomiro'
    );

    const quizTrackerData = {
      quiz1: {
        attempts: quizTracker.reduce((a, b) => a + b.attempts, 0),
        points: quizTracker.reduce((a, b) => a + b.points, 0),
      },
      quiz2: {
        attempts: quizTracker2.reduce((a, b) => a + b.attempts, 0),
        points: quizTracker2.reduce((a, b) => a + b.points, 0),
      },
      quiz3: {
        attempts: quizTracker3.reduce((a, b) => a + b.attempts, 0),
        points: quizTracker3.reduce((a, b) => a + b.points, 0),
      },
      quiz4: {
        attempts: quizTracker4.reduce((a, b) => a + b.attempts, 0),
        points: quizTracker4.reduce((a, b) => a + b.points, 0),
      },
    };

    let scoreDescartes = 100;
    let scoreEinstein = 100;
    let scoreTharp = 100;
    let scoreClodomiro = 100;

    if (user.descartes) {
      // note will be 100 if there are 0 attempts, each attempt will decrease the note by 12.5 cos 100 / 8 = 12.5
      scoreDescartes = scoreDescartes - quizTrackerData.quiz1.attempts * 12.5;
    } else {
      scoreDescartes = 0;
    }
    if (user.einstein) {
      // note will be 100 if there are 0 attempts, each attempt will decrease the note by 25 cos 100 / 24 = 25
      scoreEinstein = scoreEinstein - quizTrackerData.quiz2.attempts * 4.16;
    } else {
      scoreEinstein = 0;
    }
    if (user.tharp) {
      // note will be 100 if there are 0 attempts, each attempt will decrease the note by 25 cos 100 / 4 = 25
      scoreTharp = scoreTharp - quizTrackerData.quiz3.attempts * 25;
    } else {
      scoreTharp = 0;
    }
    if (user.clodomiro) {
      // note will be 100 if there are 0 attempts, each attempt will decrease the note by 25 cos 100 / 4 = 25
      scoreClodomiro = scoreClodomiro - quizTrackerData.quiz4.attempts * 25;
    } else {
      scoreClodomiro = 0;
    }

    return { scoreDescartes, scoreEinstein, scoreTharp, scoreClodomiro };
  };

  const handleSubmitMail = async () => {
    const history = await fetchData();
    const data: any = {
      from_name: 'SAGALAB',
      from_email: 'grupos@sagalab.info',
      to_name: user?.name,
      to_email: 'josegomez.dev@gmail.com',
      message: `
      Notas del usuario: ${ user?.name } \n\n
        Descartes: ${history?.scoreDescartes} \n
        Einstein: ${history?.scoreEinstein} \n
        Tharp: ${history?.scoreTharp} \n
        Clodomiro: ${history?.scoreClodomiro}
      `,
    };

    emailjs
      .send('service_b0mq759', 'template_uxr204w', data, '7r0MFDYv8obebfCn5')
      .then((response) => {
        console.log('Email sent successfully');
        updateDoc(doc(db, 'users', user?.id), {
          emailResultsSent: true,
        })
          .then(() => {
            updateUser({ ...user, emailResultsSent: true });
          })
          .catch((error) => {
            console.error('Error updating document: ', error);
          });
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        // Handle the error
      });
  };

  const playAudio = ( audio2Play : any ) => {
    audio2Play.play();
  }


  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Modal
        open={openGenderModal}
        onClose={() => setOpenGenderModal(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        sx={{
          marginTop: { xs: -10 },
        }}
      >
        <Box
          sx={{
            background: 'white',
            padding: '25px',
            margin: '0 auto',
            marginTop: '100px',
            borderRadius: '20px',
            width: 420,
          }}
        >
          <CardContent
            sx={{
              flexGrow: 1,
              padding: '6%',
              marginBottom: 0,
              textAlign: 'center',
              overflowY: 'auto',
              maxHeight: { xs: '60vh', sm: 'auto' },
            }}
          >
            <Grid item xs={12} sm={12} md={12}>
              <Typography variant="h6">
                Actualiza tu informacion personal
              </Typography>
              <Box my={5} />
              <Typography variant="body1">Ingresa tu edad</Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value as string))}
              >
                <MenuItem selected value={-1}>
                  --Selecciona una--
                </MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={11}>11</MenuItem>
                <MenuItem value={12}>12</MenuItem>
                <MenuItem value={13}>13</MenuItem>
                <MenuItem value={14}>14</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={16}>16</MenuItem>
                <MenuItem value={17}>17</MenuItem>
                <MenuItem value={18}>18</MenuItem>
                <MenuItem value={19}>19</MenuItem>
                <MenuItem value={20}>20</MenuItem>
              </Select>
              <Box my={1} />
              <Typography variant="body1">Selecciona tu provincia</Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={province}
                onChange={(e) => setProvince(e.target.value)}
              >
                <MenuItem selected value={-1}>
                  --Selecciona una--
                </MenuItem>
                <MenuItem value={'Alajuela'}>Alajuela</MenuItem>
                <MenuItem value={'Puntarenas'}>Puntarenas</MenuItem>
                <MenuItem value={'Cartago'}>Cartago</MenuItem>
                <MenuItem value={'Guanacaste'}>Guanacaste</MenuItem>
                <MenuItem value={'Heredia'}>Heredia</MenuItem>
                <MenuItem value={'San José'}>San José</MenuItem>
                <MenuItem value={'Limón'}>Limón</MenuItem>
              </Select>
              <Box my={1} />

              <Typography variant="body1">
                Selecciona tu género
              </Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <MenuItem selected value={-1}>
                  --Selecciona una--
                </MenuItem>
                <MenuItem value={'Heterosexual'}>Heterosexual</MenuItem>
                <MenuItem value={'Lesbiana'}>Lesbiana</MenuItem>
                <MenuItem value={'Gay'}>Gay</MenuItem>
                <MenuItem value={'Bisexual'}>Bisexual</MenuItem>
                <MenuItem value={'Transgénero'}>Transgénero</MenuItem>
                <MenuItem value={'Queer'}>Queer</MenuItem>
                <MenuItem value={'Intersexual'}>Intersexual</MenuItem>
                <MenuItem value={'Asexual'}>Asexual</MenuItem>
                <MenuItem value={'NoBinario'}>No Binario</MenuItem>
                <MenuItem value={'Otro'}>Otro</MenuItem>
                <MenuItem value={'NoDecir'}>Prefiero no decir</MenuItem>
              </Select>
              <Box my={1} />

              <Typography variant="body1">Selecciona tu sexo</Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sex}
                onChange={(e) => setSex(e.target.value)}
              >
                <MenuItem selected value={-1}>
                  --Selecciona uno--
                </MenuItem>
                <MenuItem value={'Masculino'}>Masculino</MenuItem>
                <MenuItem value={'Femenino'}>Femenino</MenuItem>
                <MenuItem value={'Otro'}>Otro</MenuItem>
              </Select>
              <Box my={5} />
              <Button
                sx={{ fontSize: { lg: 13, md: 10, sm: 10, xs: 10 } }}
                color="primary"
                className="investigate-btn"
                variant="contained"
                size="large"
                fullWidth
                onClick={() => updateUserGender()}
              >
                Actualizar datos
              </Button>
            </Grid>
          </CardContent>
        </Box>
      </Modal>
      {isPlayer() ? (
        <>
          {/* <button onClick={() => closeSession()}>Log Out</button> */}
          <Header opened={opened} setOpened={setOpened} />

          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
          >
            <Box
              sx={{
                background: 'white',
                margin: '0 auto',
                marginTop: { lg: 40, xs: 20 },
                borderRadius: '20px',
                boxShadow: '3px 3px 10px black, -0.5em 0 0.8em blue',
                width: '60%',
              }}
            >
              <CardContent sx={{ flexGrow: 1, padding: 4, marginBottom: 0 }}>
                <Typography
                  color="primary"
                  sx={{
                    fontSize: { lg: 18, md: 24, sm: 16, xs: 18 },
                    fontWeight: 'bold',
                  }}
                >
                  {chapters[selectedChapter].name +
                    ' ' +
                    chapters[selectedChapter].last_name}
                </Typography>
                <Box sx={{ mb: 2 }} />
                <Divider />
                <Typography
                  color="primary"
                  align="left"
                  sx={{
                    fontSize: { lg: 14, md: 12, sm: 10, xs: 11 },
                    fontWeight: 500,
                  }}
                >
                  {chapters[selectedChapter].description}
                </Typography>
                <Box sx={{ mb: 2 }} />
                <Typography
                  color="primary"
                  align="left"
                  sx={{
                    fontSize: { lg: 18, md: 24, sm: 16, xs: 18 },
                    fontWeight: 'bold',
                  }}
                >
                  APORTES
                </Typography>
                <Box sx={{ mb: 2 }} />
                {chapters[selectedChapter]?.contributions.map((co, i) => (
                  <Typography
                    key={i}
                    color="primary"
                    align="left"
                    gutterBottom
                    variant="h5"
                    component="h6"
                    sx={{
                      fontSize: { lg: 14, md: 12, sm: 10, xs: 11 },
                      fontWeight: 500,
                    }}
                  >
                    {co}
                  </Typography>
                ))}
              </CardContent>
            </Box>
          </Modal>

          <main>
            <Back></Back>
            <Grid
              className="bg-main"
              sx={{
                height: { lg: '100vh', md: '120vh', sm: '120vh', xs: '120vh' },
              }}
            >
              <Grid
                className="dash-container"
                container
                sx={{
                  overflow: 'autro',
                  height: { lg: '68vh', md: '62vh', sm: '70vh', xs: '62vh' },
                  paddingTop: { lg: '7%', md: '11%', sm: '4%', xs: '6%' },
                  width: { lg: '80vw', md: '86vw', sm: '84vw', xs: '86vw' },
                  maxWidth: { lg: '80vw', md: '86vw', sm: '84vw', xs: '86vw' },
                }}
              >
                <div
                  style={{
                    width: '90%',
                    marginLeft: '5%',
                    overflowX: 'scroll',
                    whiteSpace: 'nowrap',
                    position: 'relative'
                  }}
                >
                  {chapters.map((ch, idx) => (
                    <Grid
                      container
                      item
                      key={ch.id}
                      sx={{
                        margin: '0 auto',
                        marginLeft: idx === 0 ? 5 : 5,
                        display: 'inline-block',
                        width: 'auto'
                      }}>
                      <Card
                        className="homecard"
                        sx={{
                          marginBottom: 2,
                          position: 'relative',
                          width: {
                            lg: '14vw',
                            md: '15vw',
                            sm: '15vw',
                            xs: '15vw',
                          },
                        }}
                      >
                         {ch.available && ch.canPlay && ch.sound && (
                        <Box sx={{position:"absolute", width:35,height:35, top: 10, right:15 }}>
                          <StyledIcon onClick={() => playAudio(ch.sound)} className="pointer" htmlColor="white" fontSize="large" />
                        </Box> )}
                        
                        <CardMedia
                          sx={{
                            width: {
                              lg: '10vw',
                              md: '10vw',
                              sm: '8vw',
                              xs: '8vw',
                            },
                          }}
                          className={
                            (ch.available ? '' : 'not-available') + ' img-card'
                          }
                          component="img"
                          src={ch.image}
                        />
                        <Divider />
                        <CardContent>
                          <Typography
                            color="primary.contrastText"
                            className="last-names"
                            variant="h5"
                            component="h6"
                            sx={{
                              fontSize: { lg: 20, md: 14, sm: 14, xs: 14 },
                              fontWeight: 'bold',
                            }}
                          >
                            {ch.last_name}
                          </Typography>
                          <Typography
                            color="primary.contrastText"
                            className="first-name"
                            gutterBottom
                            variant="h5"
                            component="h6"
                            sx={{
                              fontSize: { lg: 20, md: 12, sm: 10, xs: 10 },
                              fontWeight: 500,
                            }}
                          >
                            {ch.name}
                          </Typography>
                          <Divider />

                          <Typography
                            color="primary.contrastText"
                            className="card-description"
                            style={{
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                            lineHeight={1.2}
                            sx={{
                              fontSize: { lg: 13, md: 10, sm: 10, xs: 10 },
                            }}
                          >
                            {ch.intro.substring(0, 60)}...
                          </Typography>
                        </CardContent>
                        <Divider />
                        <CardActions
                          className="mar-top-bottom-20"
                          sx={{ justifyContent: 'center' }}
                        >
                          <Box
                            sx={{ width: '80%' }}
                            display="flex"
                            flexDirection="column"
                            gap={2}
                          >
                            {ch.available && ch.canPlay && (
                              <Button
                                sx={{ fontSize: { lg: 13, xs: 9 } }}
                                color="primary"
                                className="investigate-btn"
                                variant="contained"
                                size="small"
                                onClick={() => history.push('/' + ch.goToPage)}
                              >
                                Investigar
                              </Button>
                            )}
                            {!ch.available && ch.released && (
                              <Button
                                sx={{ fontSize: { lg: 13, xs: 9 } }}
                                color="primary"
                                className="investigate-btn"
                                variant="outlined"
                                size="small"
                              >
                                Completado
                              </Button>
                            )}
                            {!ch.canPlay && (
                              <Button
                                sx={{ fontSize: { lg: 13, xs: 9 } }}
                                color="primary"
                                className="investigate-btn"
                                variant="outlined"
                                size="small"
                              >
                                Bloqueado
                              </Button>
                            )}

                            <Button
                              sx={{ fontSize: { lg: 13, xs: 9 } }}
                              color="primary"
                              className="investigate-btn"
                              variant="contained"
                              size="small"
                              onClick={() => handleModal(true, ch.id - 1)}
                            >
                              Ver aportes
                            </Button>
                          </Box>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </div>
                <BottomPanel />
              </Grid>
            </Grid>
          </main>
        </>
      ) : (
        <>
          {user?.status === 'PENDING' ? (
            <>
              <Header opened={opened} setOpened={setOpened} />
              <h2>ACTIVACIÓN DE CUENTA PENDIENTE</h2>
              <img alt="noimaege" src={Einstein} width="300px" />
              <p>
                Gracias por registrarte en nuestra plataforma de investigación.
              </p>
              <p>
                Nos pondremos en contacto contigo para brindarte instrucciones
                de acceso.
              </p>
              <br />
              <Button variant="outlined" onClick={() => logOut()}>
                CERRAR SESSIÓN
              </Button>
            </>
          ) : (
            <>
              <Header opened={opened} setOpened={setOpened} />
              <h2>GENIAL!</h2>
              <img alt="noimaege" src={Clodomiro} width="300px" />
              <p>
                Tu cuenta <strong>ha sido activada</strong>.
              </p>
              <p>
                Visita nuestro manager digital para estar al tanto del desempeno
                de tu equipo.
              </p>
              <br />
              <Button
                variant="outlined"
                onClick={() => {
                  window.open('https://manager.sagalab.info', '_blank');
                }}
              >
                VER MANAGER DIGITAL
              </Button>{' '}
              &nbsp;
              <Button
                variant="outlined"
                onClick={() => {
                  window.open('https://wa.me/50688344528', '_blank');
                }}
              >
                SOLICITAR AYUDA
              </Button>
            </>
          )}
        </>
      )}
      {showWinnerModal && (
        <Modal
          open={showWinnerModal}
          onClose={() => setShowWinnerModal(false)}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box
            sx={{
              background: 'white',
              margin: '0 auto',
              marginTop: { lg: 10, xs: 20 },
              borderRadius: '20px',
              width: '30%',
            }}
          >
            <CardContent sx={{ flexGrow: 1, padding: 4, marginBottom: 0 }}>
              <h3>Felicidades! Enhorabuena...</h3>
              <img src={winImage} width={'100%'} alt="" />
              <Button
                color="primary"
                className="investigate-btn"
                variant="contained"
                size="large"
                type="submit"
              >
                Descargar Certificado
              </Button>
            </CardContent>
          </Box>
        </Modal>
      )}
    </ThemeProvider>
  );
}
