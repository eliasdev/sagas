/* eslint-disable jsx-a11y/alt-text */
// import { useNavigate } from "react-router-dom";
// import {useUsers} from '../../context/Users';
import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Select, { SelectChangeEvent } from '@mui/material/Select';
import CssBaseline from '@mui/material/CssBaseline';
import { Header } from "../../components/header";
import BottomPanel from "../../components/bottomPanel";
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
import Descartes from  './../../assets/characters/thumb-descartes.png';
import Herasto from  './../../assets/characters/thumb-herasto.png';
import Einstein from  './../../assets/characters/thumb-einstein.png';
import Tharp from  './../../assets/characters/thumb-marie.png';
import Clodomiro from  './../../assets/characters/thumb-clodomiro.png';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useHistory } from 'react-router-dom';
import Back from '../../components/back';
import Box from '@mui/system/Box';
import { TextField, autocompleteClasses } from '@mui/material';
import {useUsers} from '../../context/Users'
import { getDocs, collection, updateDoc, doc, query, where } from 'firebase/firestore';
import { db } from './../.././firebase/firebase';


export default function Dashboard() {
  let history = useHistory();
  const {getUsers, logOut, updateUser} = useUsers()
  const {logged, user}: any = getUsers()

  const [openGenderModal, setOpenGenderModal] = useState(false);
  const [gender, setGender] = useState('');
  const [province, setProvince] = useState('');

  useEffect(() => {
    checkAvailability(chapters[0]);
    checkAvailability(chapters[1]);
    checkAvailability(chapters[2]);
    checkAvailability(chapters[3]);

    if (!user?.gender && user?.role === 'PLAYER'){
      setOpenGenderModal(true);
    }

    if (!logged) {
      history.push('/');
    }
  }, []);

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

const [opened, setOpened] = useState(false);
const [openModal, setOpenModal] = useState(false);
const [selectedChapter, setSelectedChapter] = useState(0);
// const {logOut, getUsers} = useUsers();
// const {logged, loading}: any = getUsers();

const [chapters, setChapters] = useState([
  {
    id: 1,
    name: "René",
    quizId: 'descartes',
    last_name: "Descartes",
    intro: "Sin el método científico no sabríamos nada del universo, ni los virus y bacterias.",
    image: Descartes,
    description: "Descartes (1596-1650) fue uno de los proponentes del método científico: la forma en que hacemos ciencia. Gracias a pioneros como él la ciencia pasó de describir lo que podemos ver a descubrir lo que no sabemos.    Sin el método científico no habríamos confirmado que existen los virus y las bacterias, no sabríamos que existen planetas fuera del sistema solar y no tendríamos explicaciones para fenómenos como las tormentas eléctricas y los huracanes. Para rescatar a Descartes, practica el método científico.",
    goToPage: "descartes",
    available: true,
    canPlay: true,
    contributions: ["Filosofía","Coordenadas cartesianas","Uso de letras en álgebra","Método científico"]
  },
  {
    id: 2,
    quizId: 'einstein',
    name: "Albert",
    last_name: "Einstein",
    intro: "Gracias a Einstein tenemos GPS, rayos láser, toallas de papel, predicciones de la bolsa de valores, paneles solares y prueba de que existen los átomos y las moléculas.",
    image: Einstein,
    description: "Descartes (1596-1650) fue uno de los proponentes del método científico: la forma en que hacemos ciencia.",
    goToPage: "einstein",
    available: true,
    canPlay: false,
    contributions: ["Teoría de la relatividad","Relación entre masa y energía","Existencia de los átomos"]
  },
  {
    id: 3,
    quizId: 'tharp',
    name: "Marie",
    last_name: "Tharp",
    intro: "Sin Marie Tharpe, no sabríamos por qué pasan los terremotos, ni cómo construir mejores edificios.",
    image: Tharp,
    description: "Descartes (1596-1650) fue uno de los proponentes del método científico: la forma en que hacemos ciencia.",
    goToPage: "tharp",
    available: true,
    canPlay: false,
    contributions: ["Primer mapa del fondo del mar","Comprobación de la teoría de la deriva continental"]
  },
  {
    id: 4,
    quizId: 'clodomiro',
    name: "Clodomiro",
    last_name: "Picado",
    intro: "Sin Clorito Picado, miles de personas morirían cada año por mordeduras de serpientes.",
    image: Clodomiro,
    description: "Descartes (1596-1650) fue uno de los proponentes del método científico: la forma en que hacemos ciencia.",
    goToPage: "clodomiro",
    available: true,
    canPlay: false,
    contributions: ["Enfermedades infecciosas","Envejecimiento","Penicilina","Antídotos para el veneno de serpiente"]
  },
  /*{
    id: 6,
    name: "Clodomiro",
    last_name: "Picado",
    intro: "Sin Clorito Picado, miles de personas morirían cada año por mordeduras de serpientes.",
    image: Clodomiro,
    description: "Descartes (1596-1650) fue uno de los proponentes del método científico: la forma en que hacemos ciencia.",
    goToPage: "clodomiro",
    available: true,
    contributions: ["Enfermedades infecciosas","Envejecimiento","Penicilina","Antídotos para el veneno de serpiente"]
  },
  {
    id: 7,
    name: "Clodomiro",
    last_name: "Picado",
    intro: "Sin Clorito Picado, miles de personas morirían cada año por mordeduras de serpientes.",
    image: Clodomiro,
    description: "Descartes (1596-1650) fue uno de los proponentes del método científico: la forma en que hacemos ciencia.",
    goToPage: "clodomiro",
    available: true,
    contributions: ["Enfermedades infecciosas","Envejecimiento","Penicilina","Antídotos para el veneno de serpiente"]
  }*/
  
]);

  const handleModal = (openModal: boolean, idx: number) => {
    setOpenModal(openModal);
    setSelectedChapter(idx);
  };

  const isPlayer = () => {
    return user?.role === "PLAYER" ? true : false;
  };

  const checkAvailability = async (ch: any) => {
    const dataQuery = query(collection(db, "tracker"), where("id", "==", user?.id));
    const dataResponse = await getDocs(dataQuery);
    const results = dataResponse.docs.map((doc: any) => doc.data());

    // check if results have more than 2 results with the same quizId and points > 0
    const filtered = results.filter((r: any) => r.quizId === ch.quizId && r.points > 0);

    let numberOfPoints = 0;
    switch (ch.quizId) {
      case "descartes":
        numberOfPoints = 1;
        break;
      case "einstein":
        numberOfPoints = 6;
        break;
      case "tharp":
        numberOfPoints = 0;
        break;
      case "clodomiro":
        numberOfPoints = 0;
        break;
    }

    console.log(results);

    if (filtered.length > numberOfPoints) {
      // update chapter availability on chapters variable
      let nextChapter: any = null;
      setChapters(chapters.map((c: any, idx: number) => {
        if (c.quizId === ch.quizId) {

          

          if (!user[`${ch.quizId}`]) {
            updateDoc(doc(db, "users", user?.id), {
                [`${ch.quizId}`]: true,
            }).then(() => {
              updateUser({ ...user, [`${ch.quizId}`]: true });
            }).catch((error) => {
              console.error("Error updating document: ", error);
            });
          }
          
          c.available = false;
          nextChapter = idx + 1;
        }
        return c;
      }));

      if (nextChapter) {
        setChapters(chapters.map((c: any, idx: number) => {
          if (idx === nextChapter) {
            c.canPlay = true;
          }
          return c;
        }));
      }
    }
  }

  const updateUserGender = async () => {
    await updateDoc(doc(db, "users", user.id!), {
        gender,
        province,
    }).then(() => {
        updateUser({ ...user, gender, province });
        setOpenGenderModal(false);
    }).catch((error) => {
        alert("Error updating document: ");
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Modal
          open={openGenderModal}
          onClose={() => setOpenGenderModal(false)}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ background: 'white', padding: '25px', margin: '0 auto', marginTop: '100px', borderRadius: '20px', width: 420 }}>
            
            <CardContent sx={{ flexGrow:1,padding:"6%",marginBottom:0 }}>
              <Grid item xs={12} sm={12} md={12}>
                <h3>Actualiza tu informacion personal!</h3>

                <span>Selecciona tu provincia</span> &nbsp;&nbsp;
                <br />
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={province}
                  onChange={(e) => setProvince(e.target.value)}
                >
                  <MenuItem value={'Alajuela'}>Alajuela</MenuItem>
                  <MenuItem value={'Puntarenas'}>Puntarenas</MenuItem>
                  <MenuItem value={'Cartago'}>Cartago</MenuItem>
                  <MenuItem value={'Guanacaste'}>Guanacaste</MenuItem>
                  <MenuItem value={'Heredia'}>Heredia</MenuItem>
                  <MenuItem value={'San José'}>San José</MenuItem>
                  <MenuItem value={'Limón'}>Limón</MenuItem>
                </Select>
                <br />
                <br />

                <span>Selecciona tu genero</span> &nbsp;&nbsp;
                <br />
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <MenuItem value={'Masculino'}>Masculino</MenuItem>
                  <MenuItem value={'Femenino'}>Femenino</MenuItem>
                  <MenuItem value={'Lesbiana'}>Lesbiana</MenuItem>
                  <MenuItem value={'Gay'}>Gay</MenuItem>
                  <MenuItem value={'Bisexual'}>Bisexual</MenuItem>
                  <MenuItem value={'Transgénero'}>Transgénero</MenuItem>
                  <MenuItem value={'Queer'}>Queer</MenuItem>
                  <MenuItem value={'Intersexual'}>Intersexual</MenuItem>
                  <MenuItem value={'Asexual'}>Asexual</MenuItem>
                </Select>
                <br />
                <br />
                <Button 
                  sx={{fontSize: {lg:13,md:10,sm:10,xs:10}}} 
                  color="primary" 
                  className="investigate-btn" 
                  variant="contained" 
                  size="small" 
                  onClick={() => updateUserGender()}>Actualizar Informacion</Button>
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
            <Box sx={{ background: 'white', padding: '25px', margin: '0 auto', marginTop: '100px', borderRadius: '20px', boxShadow: '3px 3px 10px black, -0.5em 0 0.8em blue', width: 400 }}>
              
              <CardContent sx={{ flexGrow:1,padding:"6%",marginBottom:0 }}>
                <Typography 
                  color="primary" 
                  className="card-title"
                  variant="h5" 
                  component="h6"
                  align="left"
                  sx={{fontSize: {lg:18,md:24,sm:16,xs:18}, fontWeight:"bold"}}>
                  APORTES
                </Typography>
                <Box sx={{ mb: "10%" }} /> 
                {chapters[selectedChapter]?.contributions.map((co, i) => (
                  <Typography
                    key={i}
                    color="primary"
                    align="left"
                    gutterBottom variant="h5" 
                    component="h6"
                    sx={{fontSize: {lg:14,md:12,sm:10,xs:11},fontWeight:500}}>
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
                sx={{height:{lg: "100vh",md: "120vh",sm: "120vh",xs: "120vh"}}}>
                  
                <Grid 
                  className="dash-container" 
                  container sx={{ overflow:"autro",
                    height:{lg: "68vh",md: "62vh",sm: "70vh",xs: "62vh"},
                    paddingTop:{lg: "7%",md: "11%",sm: "4%",xs: "6%"}, 
                    width:{lg: "80vw",md: "86vw",sm: "84vw",xs: "86vw"}, 
                    maxWidth:{lg: "80vw",md: "86vw",sm: "84vw",xs: "86vw"}}}>
                  
                    <div
                      style={{
                        width: '90%',
                        marginLeft: '5%',
                        overflowX: 'auto',
                        whiteSpace: 'nowrap',
                        position: 'relative',
                        scrollbarColor: 'red blue',
                      }}
                    >
                        
                        {chapters.map((ch, idx) => 
                          (
                            <Grid container item key={ch.id} sx={{
                              margin:"0 auto",
                              marginLeft: idx === 0 ? 5 : 5,
                              display: 'inline-block',
                              width: 'auto',
                            }}>
                              <Card className="homecard" sx={{ 
                                    marginBottom:"10vh",
                                    width: {lg:"14vw",md:"15vw",sm:"15vw",xs:"15vw"}
                                    }}>
                                <CardMedia 
                                  sx={{width: {lg:"10vw",md:"10vw",sm:"8vw",xs:"8vw"}}} 
                                  className={(ch.available ? '' : 'not-available') + " img-card"} 
                                  component="img" src={ch.image}/>
                                <Divider />
                                <CardContent>
                                  <Typography 
                                    color="primary.contrastText" 
                                    className="last-names" 
                                    variant="h5" 
                                    component="h6"
                                    sx={{fontSize: {lg:20,md:14,sm:14,xs:14}, fontWeight:"bold"}}>
                                    {ch.last_name}
                                  </Typography>
                                  <Typography 
                                    color="primary.contrastText" 
                                    className="first-name" 
                                    gutterBottom variant="h5" 
                                    component="h6"
                                    sx={{fontSize: {lg:20,md:12,sm:10,xs:10},fontWeight:500}}>
                                    {ch.name}
                                  </Typography>
                                  <Divider />

                                  <Typography 
                                    color="primary.contrastText" 
                                    className="card-description" 
                                    style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                                    lineHeight={1.2} sx={{fontSize: {lg: 13,md: 10,sm: 10,xs: 10}}}>
                                      {ch.intro.substring(0, 60)}...
                                  </Typography>
                                </CardContent>
                                <Divider />
                                <CardActions 
                                  className="mar-top-bottom-20" 
                                  sx={{justifyContent: 'center'}}>
                                {ch.available && ch.canPlay &&
                                  <Button 
                                    sx={{fontSize: {lg:13,md:10,sm:10,xs:10}}} 
                                    color="primary" 
                                    className="investigate-btn" 
                                    variant="contained" 
                                    size="small" 
                                    onClick={() => history.push('/' + ch.goToPage)}>Investigar</Button>
                                }
                                {!ch.available &&
                                  <Button 
                                    sx={{fontSize: {lg:13,md:10,sm:10,xs:10}}} 
                                    color="primary" 
                                    className="investigate-btn" 
                                    variant="outlined" 
                                    size="small">Completado</Button>
                                }
                                {!ch.canPlay &&
                                  <Button 
                                    sx={{fontSize: {lg:13,md:10,sm:10,xs:10}}} 
                                    color="primary" 
                                    className="investigate-btn" 
                                    variant="outlined" 
                                    size="small">Bloqueado</Button>
                                }
                                
                                
                                <Button onClick={() => handleModal(true, ch.id - 1)}>Detalle</Button>
                                
                                </CardActions>
                                
                                {/* <Card className="homecard-detail" sx={{
                                width: {lg:"10vw",md:"15vw",sm:"11vw",xs:"16vw"}, 
                                height: {lg:"30vh",md:"35vh",sm:"37vh",xs:"48vh"}}}>
                                  <CardContent sx={{ flexGrow:1,padding:"6%",marginBottom:0 }}>
                                    <Typography 
                                      color="primary" 
                                      className="card-title"
                                      variant="h5" 
                                      component="h6"
                                      align="left"
                                      sx={{fontSize: {lg:18,md:24,sm:16,xs:18}, fontWeight:"bold"}}>
                                      APORTES
                                    </Typography>
                                    <Box sx={{ mb: "10%" }} /> 
                                    {ch.contributions.map((co, i) => (
                                      <Typography 
                                        key={i}
                                        color="primary"
                                        align="left"
                                        gutterBottom variant="h5" 
                                        component="h6"
                                        sx={{fontSize: {lg:14,md:12,sm:10,xs:11},fontWeight:500}}>
                                        {co}
                                      </Typography>
                                    ))}
                                  </CardContent>
                                </Card> */}
                              </Card>
                              
                            </Grid>
                          ))} 

                      </div>
                  <BottomPanel/>
                </Grid>
              </Grid>   
          </main>
        </>
      ) : (
        <>
          {user?.status === 'PENDING' ? (
            <>
              <Header opened={opened} setOpened={setOpened} />
              <h2>ACTIVACION DE CUENTA PENDIENTE</h2>
              <img
                alt="noimaege"
                src={Einstein}
                width="300px"
              />
              <p>
                Gracias por registrarte en nuestra plataforma de investigación.
              </p>
              <p>
                Nos pondremos en contacto contigo para brindarte instrucciones de acceso.
              </p>
              <br />
              <Button variant="outlined" onClick={() => logOut()}>CERRAR SESSION</Button>
            </>
            ) : (
              <>
              <Header opened={opened} setOpened={setOpened} />
              <h2>GENIAL!</h2>
              <img
                alt="noimaege"
                src={Clodomiro}
                width="300px"
              />
              <p>
                Tu cuenta <strong>ha sido activada</strong>.
              </p>
              <p>
                Visita nuestro manager digital para estar al tanto del desempeno de tu equipo.
              </p>
              <br />
              <Button variant="outlined" onClick={() => {}}>VER MANAGER DIGITAL</Button> &nbsp;
              <Button variant="outlined" onClick={() => {}}>SOLITAR AYUDA</Button>
            </>
            )}
        </>
      )}
    </ThemeProvider>

  )
}

