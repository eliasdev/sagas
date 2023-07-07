/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */
import { useState, useEffect } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './index.css';
import {useUsers} from '../../context/Users'
import { Header } from "../../components/header";
import { useParams } from 'react-router-dom';
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";



const theme = createTheme({});

export default function Leaderboard() {

  interface RouteParams {
    type: string;
  }

  const { type } = useParams<RouteParams>();
  let history = useHistory();
  const [opened, setOpened] = useState(false);
  
  const {getUsers} = useUsers()
  const {logged}: any = getUsers()

  useEffect(() => {
    
    if (logged && type != "123" ) {
    //history.push('/dashboard');
    }
  }, [history, logged]);

  const fakeLeaderboardData = [
    { name: "John Doe", username: "johndoe", scoreDescartes: 100, scoreEinstein: 80, scoreTharp: 70, scoreClodomiro: 60, globalScore: 310 },
    { name: "Jane Smith", username: "janesmith", scoreDescartes: 90, scoreEinstein: 85, scoreTharp: 75, scoreClodomiro: 65, globalScore: 315 },
    { name: "John Doe", username: "johndoe", scoreDescartes: 100, scoreEinstein: 80, scoreTharp: 70, scoreClodomiro: 60, globalScore: 310 },
    { name: "Jane Smith", username: "janesmith", scoreDescartes: 90, scoreEinstein: 85, scoreTharp: 75, scoreClodomiro: 65, globalScore: 315 },
    { name: "John Doe", username: "johndoe", scoreDescartes: 100, scoreEinstein: 80, scoreTharp: 70, scoreClodomiro: 60, globalScore: 310 },
    { name: "Jane Smith", username: "janesmith", scoreDescartes: 90, scoreEinstein: 85, scoreTharp: 75, scoreClodomiro: 65, globalScore: 315 },
    { name: "John Doe", username: "johndoe", scoreDescartes: 100, scoreEinstein: 80, scoreTharp: 70, scoreClodomiro: 60, globalScore: 310 },
    { name: "Jane Smith", username: "janesmith", scoreDescartes: 90, scoreEinstein: 85, scoreTharp: 75, scoreClodomiro: 65, globalScore: 315 },
    // Add more fake data rows here...
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <Header opened={opened} setOpened={setOpened} />
        <main>
          <div className="bannerL">

          

            <Box
                sx={{
                // bgcolor: 'background.paper',
                height: '100%',
                pt: '5%',
                pb: '5%',
                }}
            >
                <Container maxWidth="md">
                    
                        <Grid container spacing={0}>
                            <Grid item xs={12}>
                            <Card>
                                <CardContent>
                                <Typography sx={{mb:4,mt:2}} variant="h5" component="div" gutterBottom>
                                    Tabla de Posiciones
                                </Typography>
                                <Grid container spacing={1}>
                                    <Grid item lg={1.5} xs={1.5}>
                                    <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 'bold', color: 'white', background: 'rgba(0, 0, 0, 0.2)', padding: '8px', borderRadius: '4px' }}>
                                        Posición
                                    </Typography>
                                    </Grid>
                                    <Grid item lg={1.5} xs={1.5}>
                                    <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 'bold', color: 'white', background: 'rgba(0, 0, 0, 0.2)', padding: '8px', borderRadius: '4px' }}>
                                        Nombre
                                    </Typography>
                                    </Grid>
                                    <Grid item lg={1.5} xs={1.5}>
                                    <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 'bold', color: 'white', background: 'rgba(0, 0, 0, 0.2)', padding: '8px', borderRadius: '4px' }}>
                                        Usuario
                                    </Typography>
                                    </Grid>
                                    <Grid item lg={1.5} xs={1.5}>
                                    <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 'bold', color: 'white', background: 'rgba(0, 0, 0, 0.2)', padding: '8px', borderRadius: '4px' }}>
                                        Nota Descartes
                                    </Typography>
                                    </Grid>
                                    <Grid item lg={1.5} xs={1.5}>
                                    <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 'bold', color: 'white', background: 'rgba(0, 0, 0, 0.2)', padding: '8px', borderRadius: '4px' }}>
                                        Nota Einstein
                                    </Typography>
                                    </Grid>
                                    <Grid item lg={1.5} xs={1.5}>
                                    <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 'bold', color: 'white', background: 'rgba(0, 0, 0, 0.2)', padding: '8px', borderRadius: '4px' }}>
                                        Nota Tharp
                                    </Typography>
                                    </Grid>
                                    <Grid item lg={1.5} xs={1.5}>
                                    <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 'bold', color: 'white', background: 'rgba(0, 0, 0, 0.2)', padding: '8px', borderRadius: '4px' }}>
                                        Nota Clodomiro
                                    </Typography>
                                    </Grid>
                                    <Grid item lg={1.5} xs={1.5}>
                                    <Typography variant="subtitle1" gutterBottom style={{ fontWeight: 'bold', color: 'white', background: 'rgba(0, 0, 0, 0.2)', padding: '8px', borderRadius: '4px' }}>
                                        Nota Global
                                    </Typography>
                                    </Grid>
                                    
                                </Grid>
                                </CardContent>
                            </Card>
                            </Grid>
                            <Divider />
                            <div style={{ maxHeight: 400, width:"100%", overflowY: "auto" }}>
                            {fakeLeaderboardData.map((row, index) => (
                                <Grid item xs={12} key={index}>
                                    <Card sx={{ backgroundColor: index % 2 === 0 ? '#f5f5f5' : '#ffffff' }}>
                                    <CardContent>
                                        <Grid container spacing={0}>
                                        <Grid item lg={1.5} xs={1.5}>
                                            <Typography variant="subtitle1" sx={{ color: index % 2 === 0 ? '#333' : 'inherit' }}>
                                            {index+1}
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={1.5} xs={1.5}>
                                            <Typography variant="subtitle1" sx={{ color: index % 2 === 0 ? '#333' : 'inherit' }}>
                                            {row.name}
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={1.5} xs={1.5}>
                                            <Typography variant="subtitle1" sx={{ color: index % 2 === 0 ? '#333' : 'inherit' }}>
                                            {row.username}
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={1.5} xs={1.5}>
                                            <Typography variant="subtitle1" sx={{ color: index % 2 === 0 ? '#333' : 'inherit' }}>
                                            {row.scoreDescartes}
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={1.5} xs={1.5}>
                                            <Typography variant="subtitle1" sx={{ color: index % 2 === 0 ? '#333' : 'inherit' }}>
                                            {row.scoreEinstein}
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={1.5} xs={1.5}>
                                            <Typography variant="subtitle1" sx={{ color: index % 2 === 0 ? '#333' : 'inherit' }}>
                                            {row.scoreTharp}
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={1.5} xs={1.5}>
                                            <Typography variant="subtitle1" sx={{ color: index % 2 === 0 ? '#333' : 'inherit' }}>
                                            {row.scoreClodomiro}
                                            </Typography>
                                        </Grid>
                                        <Grid item lg={1.5} xs={1.5}>
                                            <Typography variant="subtitle1" sx={{ color: index % 2 === 0 ? '#333' : 'inherit' }}>
                                            {row.globalScore}
                                            </Typography>
                                        </Grid>
                                        </Grid>
                                    </CardContent>
                                    </Card>
                                </Grid>
                                ))}

                        </div>

                        </Grid>
                    </Container>

            </Box>
          </div>
        </main>
    </ThemeProvider>
  )
}