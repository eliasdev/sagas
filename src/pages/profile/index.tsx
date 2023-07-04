import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Header } from "../../components/header";
import Grid from '@mui/material/Grid'; // Grid version 1
import { useState } from "react";
import './index.css';
import { Avatar, TextField } from '@mui/material';
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
import {updateDoc, doc } from "firebase/firestore";
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

    if( !user ){
        history.push("/login");
    }

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


            <Typography sx={{fontSize: {lg: 22, xs: 15}, paddingLeft:2.5, width:"80%"}} align="left" paragraph>
                Horas de práctica para los estudiantes, sin más trabajo para los profesores. Somos profesores, científicos y artistas simulando misiones para que nuestros niños puedan practicar la materia de clase, entendiendo su contexto.
            </Typography>
            
            
            <Grid sx={{ padding: 2}}>
                <Divider/>
                <Typography variant="h3" sx={{padding:{lg: 5, xs: 2}, fontSize: {lg: 28, xs: 25}}} align="left">INSIGNIAS OBTENIDAS</Typography>
                
                
                
                <Grid sx={{padding:{lg: 5, xs: 2}}} lg={12} sm={12} container>
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
                  
                </Grid>
                <Divider/>
                {/* THIRD PART */}
                <Typography variant="h3" sx={{padding:{lg: 5, xs: 2}, fontSize: {lg: 28, xs: 25}}} align="left">AVANCE DE LA SAGA</Typography>
                <Grid xs={12} sx={{ padding: 2}}>
                  
                  

                  {/* BARRAS*/}
                  <Grid >
                    <Grid xs={12} sx={{margin:5, marginTop:1}}>
                      <Typography sx={{textAlign:"left"}}>René Descartes</Typography>
                      <LineG></LineG>
                    </Grid>
                    <Grid xs={12} sx={{margin:5}}>
                      <Typography sx={{textAlign:"left"}}>Albert Einstein</Typography>
                      <LineG></LineG>
                    </Grid>
                    <Grid xs={12} sx={{margin:5}}>
                      <Typography sx={{textAlign:"left"}}>Marie Tharp</Typography>
                      <LineG></LineG>
                    </Grid>
                    <Grid xs={12} sx={{margin:5}}>
                      <Typography sx={{textAlign:"left"}}>Clodomiro Picado</Typography>
                      <LineG></LineG>
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