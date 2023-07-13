/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
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
import Media from './../../assets/logout-media.jpg';
import {useUsers} from '../../context/Users'
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

const theme = createTheme({});

export default function SignUp() {


  const [opened, setOpened] = useState(false);
  let history = useHistory();
  const {signUp} = useUsers();  
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);      
      
      const newUser = {
          name: JSON.parse(JSON.stringify(data.get('name')|| [].toString)),
          lastName: JSON.parse(JSON.stringify(data.get('lastName')|| [].toString)),
          email: JSON.parse(JSON.stringify(data.get('email')|| [].toString)),
          password: JSON.parse(JSON.stringify(data.get('password')|| [].toString)),
          organizationName: JSON.parse(JSON.stringify(data.get('school')|| [].toString)),
          organizationPhone: JSON.parse(JSON.stringify(data.get('phone')|| [].toString)),
          organizationState: JSON.parse(JSON.stringify(data.get('state')|| [].toString)),
          organizationCity: JSON.parse(JSON.stringify(data.get('city')|| [].toString)),
          organizationDistrict: JSON.parse(JSON.stringify(data.get('district')|| [].toString)),
      };

      signUp(newUser, history);
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
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            marginTop: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '30px'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registrarme en Saga Gigantes
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nombre"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Apellidos"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Correo electrónico"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="school"
                  label="Institución Educativa que representa"
                  name="school"
                  autoComplete="school"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="phone"
                  label="# de Teléfono de la Institución"
                  name="phone"
                  autoComplete="phone"
                />
              </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    id="state"
                    name="state"
                    label="Provincia"
                    fullWidth
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="Cantón"
                    fullWidth
                    autoComplete="shipping address-level2"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="district"
                    name="district"
                    label="Distrito"
                    fullWidth
                    autoComplete="shipping address-level3"
                    variant="standard"
                  />
                </Grid>

            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registrarme Ahora
            </Button>
            <Grid container justifyContent="center">
              <Grid item>
                <Link href="/login" variant="body2">
                  ¿Ya tienes una cuenta? ¡Inicia Sesión!
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