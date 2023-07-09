import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Header } from "../../components/header";
import Grid from '@mui/material/Grid'; // Grid version 1
import { useEffect, useState } from "react";
import './index.css';
import { Avatar, LinearProgress, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import Einstein from  './../../assets/characters/thumb-einstein.png';
import VerifiedIcon from '@mui/icons-material/Verified';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import PercentIcon from '@mui/icons-material/Percent';
import { green } from '@mui/material/colors';
import LineG from "../../components/lineGrafic";
import { useHistory } from "react-router-dom";
import { useUsers } from '../../context/Users';
import {updateDoc, doc, collection, where, getDocs, query } from "firebase/firestore";
import {uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { db, storage } from './../.././firebase/firebase';

const theme = createTheme({});

const Profile = () => {

    let history = useHistory();
    const [opened, setOpened] = useState(false);

    const storageRef = ref(storage, 'some-child');

    const btn__color = "#2196f357";
    const txtbtn__color = "#0224ef";

    const {getUsers, updateUser} = useUsers();
    const {user}: any = getUsers();

    const [file, setFile] = useState<any>(null);
    const [loader, setLoader] = useState<boolean>(false);

    const [scores, setScores] = useState<any>();

    const fetchData = async () => {
        const dataQuery = query(
          collection(db, "tracker"),
          where("id", "==", user.id)
        );

        const dataResponse = await getDocs(dataQuery);
        const historyData = dataResponse.docs.map((doc) => doc.data());

        const quizTracker = historyData.filter(
          (track) => track.quizId === "descartes"
        );
        const quizTracker2 = historyData.filter(
          (track) => track.quizId === "einstein"
        );
        const quizTracker3 = historyData.filter(
          (track) => track.quizId === "tharp"
        );
        const quizTracker4 = historyData.filter(
          (track) => track.quizId === "clodomiro"
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
        
        setScores({ scoreDescartes, scoreEinstein, scoreTharp, scoreClodomiro })    
    };
    
    useEffect(() => {
        fetchData();
        if( !user ){
            history.push("/login");
        }
    }, []);

    const uploadFile = async () => {
        setLoader(true);
        const types = ['image/png', 'image/jpeg', 'image/jpg'];
         if (file && types.includes(file.type)) {
            const imageRef = ref(storage, `images/${file.name}`);
            uploadBytes(imageRef, file).then((image) => {
                getDownloadURL(imageRef).then(async (url) => {
                    const id = localStorage.getItem("token");
                    await updateDoc(doc(db, "users", id!), {
                        avatarUrl: url,
                    }).then(() => {
                        updateUser({ ...user, avatarUrl: url });
                        setLoader(false);
                    }).catch((error) => {
                        alert("Error updating document: ");
                    });
                });
            });
        } else {
            alert('Please select an image file (png or jpg)');
        }
            
        if (file) {

        }
    }

    return (
        
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header opened={opened} setOpened={setOpened} />
        <main>

            <Typography variant="h1" sx={{padding:{lg: 6, xs: 4}, fontSize: {lg: 50, xs: 25}}} align="left">Perfil de Usuario</Typography>
        
            <Grid container sx={{ marginTop: 1}}>  
                {!loader ? ( 
                    <Grid lg={3} sx={{ marginTop: {lg:4,xs:0} }}>
                        <Box
                            component="img"
                            sx={{
                                width:{lg:300,xs:150},
                                backgroundColor:"gray",
                                borderRadius:10
                            }}
                            src={user?.avatarUrl}
                        />
                        <input type="file" id="myFile" name="filename" onChange={((e: any) => setFile(e.target.files[0]))}></input>
                        <Button sx={{ fontSize: {lg: 30, xs: 18} }} onClick={() => uploadFile()}>Cambiar Imagen</Button>
                        <br /><br />
                    </Grid>) : (
                    <Grid lg={3} sx={{ marginTop: {lg:4,xs:0} }}>
                        <p>Subiendo Imagen...</p>
                        <p>Por Favor Espera!</p>
                    </Grid>
                )}

                
                <Grid lg={9}>
                    <Box component="form" noValidate sx={{ mt: 3, margin: "0 auto" }}>
                        <Typography component="h1" align='left' variant="h5">
                            Editar Datos del Perfil
                        </Typography>
                        
                    <Grid>

                        <Grid lg={6} container spacing={2} pt={6}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                autoComplete="given-name"
                                name="name"
                                required
                                fullWidth
                                id="name"
                                autoFocus
                                value={ user ? user.name : "" }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                required
                                fullWidth
                                id="lastName"
                                name="lastName"
                                autoComplete="family-name"
                                value={ user ? user.lastName : "" }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                id="email"
                                name="email"
                                autoComplete="email"
                                value={ user? user.email : "" }
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                id="organization"
                                name="organization"
                                autoComplete="organization"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                required
                                fullWidth
                                id="phone"
                                label="# de Teléfono"
                                name="phone"
                                autoComplete="phone"
                                value={user ? user.phone : ""}
                                />
                            </Grid>

                        </Grid>

                    </Grid>

                    


                        {/* <Grid className={ "width-70 height-inherit lp-border"}>
                            <ListItem sx={{width:{lg: "30%", xs: "55%" }}}>
                                <ListItemText disableTypography sx={{fontSize: {lg: 30, xs: 20}}} primary={user?.displayName || 'Nombre del(la) jugador'} />
                                <VerifiedIcon color='secondary'/>
                            </ListItem>
                            <Grid container xs={12}>
                            
                                <Button sx={{ fontSize: {lg: 30, xs: 18}, bgcolor:btn__color, color:txtbtn__color, margin:{lg: 3, xs: 2} }}>Grado: 7°</Button>
                                <Button sx={{ fontSize: {lg: 30, xs: 18}, bgcolor:btn__color, color:txtbtn__color, margin:{lg: 3, xs: 2} }}>Sección: 7-4</Button>
                                <Button sx={{ fontSize: {lg: 30, xs: 18}, bgcolor:btn__color, color:txtbtn__color, margin:{lg: 3, xs: 2} }}>Nombre de usuario</Button>
                            
                            </Grid>
                            <Typography sx={{fontSize: {lg: 22, xs: 15}, paddingLeft:2.5, width:"80%"}} align="left" paragraph>
                                Horas de práctica para los estudiantes, sin más trabajo para los profesores. Somos profesores, científicos y artistas simulando misiones para que nuestros niños puedan practicar la materia de clase, entendiendo su contexto.
                            </Typography>
                        
                        </Grid>  */}
                    </Box> 
                </Grid> 
                
            </Grid>

            <br />

            <Typography sx={{fontSize: {lg: 22, xs: 15}, paddingLeft:2.5, width:"80%"}} align="left" paragraph>
                Horas de práctica para los estudiantes, sin más trabajo para los profesores. Somos profesores, científicos y artistas simulando misiones para que nuestros niños puedan practicar la materia de clase, entendiendo su contexto.
            </Typography>
            
            
            <Grid sx={{ padding: 2}}>
                <Divider/>
                <Typography variant="h3" sx={{padding:{lg: 5, xs: 2}, fontSize: {lg: 28, xs: 25}}} align="left">INSIGNIAS OBTENIDAS</Typography>
                
                
                
                <Grid sx={{padding:{lg: 5, xs: 2}}} lg={12} sm={12} container>
                    {user?.descartes && (
                        <Grid lg={3}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: green[500] }}>
                                        <PercentIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Insignia de Descartes" />
                            </ListItem>
                        </Grid>
                    )}
                    
                    {user?.einstein && (
                        <Grid lg={3}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: green[500] }}>
                                        <PercentIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Insignia de Einstein" />
                            </ListItem>
                        </Grid>
                    )}

                    {user?.tharp && (
                        <Grid lg={3}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: green[500] }}>
                                        <PercentIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Insignia de Tharp" />
                            </ListItem>
                        </Grid>
                    )}

                    {user?.clodomiro && (
                        <Grid lg={3}>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: green[500] }}>
                                        <PercentIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary="Insignia de Picado" />
                            </ListItem>
                        </Grid>
                    )}
                  
                </Grid>
                <Divider/>
                {/* THIRD PART */}
                <Typography variant="h3" sx={{padding:{lg: 5, xs: 2}, fontSize: {lg: 28, xs: 25}}} align="left">AVANCE DE LA SAGA</Typography>
                <Grid xs={12} sx={{ padding: 2}}>
                  
                  

                  {/* BARRAS*/}
                  <Grid >
                    <Grid xs={12} sx={{margin:5, marginTop:1}}>
                      <Typography sx={{textAlign:"left"}}>René Descartes</Typography>
                      {/* <LineG variant="determinate" value={75}></LineG> */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: '100%', mr: 1 }}>
                                <LinearProgress variant="determinate" value={scores?.scoreDescartes}></LinearProgress>
                            </Box>
                            <Box sx={{ minWidth: 35 }}>
                                <Typography variant="body2" color="text.secondary">{`${scores?.scoreDescartes}%`}</Typography>
                            </Box>
                        </Box>    
                    </Grid>
                    <Grid xs={12} sx={{margin:5}}>
                      <Typography sx={{textAlign:"left"}}>Albert Einstein</Typography>
                      {/* <LineG></LineG> */}  
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: '100%', mr: 1 }}>
                                <LinearProgress variant="determinate" value={scores?.scoreEinstein}></LinearProgress>
                            </Box>
                            <Box sx={{ minWidth: 35 }}>
                                <Typography variant="body2" color="text.secondary">{`${scores?.scoreEinstein}%`}</Typography>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid xs={12} sx={{margin:5}}>
                      <Typography sx={{textAlign:"left"}}>Marie Tharp</Typography>
                      {/* <LineG></LineG> */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: '100%', mr: 1 }}>
                                <LinearProgress variant="determinate" value={scores?.scoreTharp}></LinearProgress>
                            </Box>
                            <Box sx={{ minWidth: 35 }}>
                                <Typography variant="body2" color="text.secondary">{`${scores?.scoreTharp}%`}</Typography>
                            </Box>
                        </Box>    
                    </Grid>
                    <Grid xs={12} sx={{margin:5}}>
                      <Typography sx={{textAlign:"left"}}>Clodomiro Picado</Typography>
                      {/* <LineG></LineG> */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: '100%', mr: 1 }}>
                                <LinearProgress variant="determinate" value={scores?.scoreClodomiro}></LinearProgress>
                            </Box>
                            <Box sx={{ minWidth: 35 }}>
                                <Typography variant="body2" color="text.secondary">{`${scores?.scoreClodomiro}%`}</Typography>
                            </Box>
                        </Box>    
                    </Grid>

                  </Grid>
                  <Grid xs={4}  spacing={1} >
                  </Grid>
                </Grid>

                {/* FOURD PART */}
              
            </Grid>
        </main>
    </ThemeProvider>
    )
};
export default Profile;