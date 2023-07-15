import React, { useState } from "react";
// import { useHistory } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import HandshakeIcon from '@mui/icons-material/Handshake';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Header } from "../../components/header";
import Copyright from "../../components/copyright";



const theme = createTheme();

export default function SponsorSaga() {
  // let history = useHistory();
  const [opened, setOpened] = useState(false);
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  };

  return (
    <ThemeProvider theme={theme}>

        <Header opened={opened} setOpened={setOpened} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            mt: 8,
            mb:5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <HandshakeIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Gracias por tu interés en patrocinar una de nuestras Sagas, por favor completa el siguiente formulario y nos pondremos en contacto tan pronto sea posible.
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Nombre completo"
                  autoFocus
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
                  name="phone"
                  label="Número de teléfono"
                  id="phone"
                  autoComplete="phone"
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Enviar datos
            </Button>
           
          </Box>
        </Box>
        <Copyright />
      </Container>
    </ThemeProvider>
  );
}