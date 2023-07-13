/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useUsers} from '../../context/Users'
import Media from './../../assets/login-media.jpg';
import { db } from './../../firebase/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { Header } from '../../components/header';

function Copyright(props: any) {
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

  const theme = createTheme({spacing: 8});
  
export default function LoginForm (){
  const [opened, setOpened] = useState(false);
  let history = useHistory();
  const {logIn, logInPlayers, getUsers} = useUsers();
  const {logged, loading}: any = getUsers();

  useEffect(() => {
    if (logged) {
      history.push('/welcome');
    }
  }, [logged]);


const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get('email') && data.get('password')) {
      try {
        const user = {
          email: JSON.parse(JSON.stringify(data.get('email')|| [].toString)),
          password: JSON.parse(JSON.stringify(data.get('password')|| [].toString)),
        };

        const usersQuery = query(collection(db, "users"), where("email", "==", user?.email));
        const usersResponse = await getDocs(usersQuery);
        const result = usersResponse.docs.map((doc: any) => doc.data());
        
        if (result.length > 0 && result[0].role === 'PLAYER') {
          // PLAYERS LOGIN
          logInPlayers(result[0]);
        } else {
          // OWNER/ADMIN LOGIN
          logIn(user.email, user.password);
          history.push('/dashboard'); 
        }
      } catch (error) {
        alert(error);
      }
    }
};
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header opened={opened} setOpened={setOpened} />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(' + Media +')',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center left',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
         <Box
            sx={{
              my:4,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', display: { xs: 'none', md: 'block', lg: 'block' } }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Ingresar al Portal de Sagas
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Correo Electrónico"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Iniciar Sesión
              </Button>
              <Box sx={{ m: 20, display: { xs: 'none', md: 'block', lg: 'block' } }} />
              
              <Grid container>
                <Grid item xs>
                  <Link href="/signup" variant="body2">
                    {"¿Necesitas una cuenta? ¡Regístrate acá!"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider> 
  )
}
