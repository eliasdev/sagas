/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './index.css';
import { useUsers } from '../../context/Users';
import { Header } from '../../components/header';
import Grid from '@mui/material/Grid';
import { Divider } from '@mui/material';
import { getDocs, collection, query, where, limit } from 'firebase/firestore';
import { db } from './../.././firebase/firebase';

const theme = createTheme({});

export default function Leaderboard() {
  interface RouteParams {
    type: string;
  }

  const { type } = useParams<RouteParams>();
  let history = useHistory();
  const [opened, setOpened] = useState(false);

  const [dataLeaderboard, setDataLeaderboard] = useState<any>([]);
  const { getUsers } = useUsers();
  const { logged, user }: any = getUsers();

  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const fetchData = async () => {
    let dataQuery: any = [];
    if (user) {
      dataQuery = query(
        collection(db, 'users'),
        where('ownerId', '==', user?.ownerId),
        limit(10)
      );
    } else {
      dataQuery = query(collection(db, 'users'), limit(10));
    }

    const dataResponse = await getDocs(dataQuery);
    const results = dataResponse.docs.map((doc) => doc.data());

    const finalResults = await Promise.all(
      results.map(async (player: any) => {
        const dataQuery = query(
          collection(db, 'tracker'),
          where('id', '==', player.id)
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

        if (player.descartes) {
          // note will be 100 if there are 0 attempts, each attempt will decrease the note by 12.5 cos 100 / 8 = 12.5
          scoreDescartes =
            scoreDescartes - quizTrackerData.quiz1.attempts * 12.5;
        } else {
          scoreDescartes = 0;
        }
        if (player.einstein) {
          // note will be 100 if there are 0 attempts, each attempt will decrease the note by 25 cos 100 / 24 = 25
          scoreEinstein = scoreEinstein - quizTrackerData.quiz2.attempts * 4.16;
        } else {
          scoreEinstein = 0;
        }
        if (player.tharp) {
          // note will be 100 if there are 0 attempts, each attempt will decrease the note by 25 cos 100 / 4 = 25
          scoreTharp = scoreTharp - quizTrackerData.quiz3.attempts * 25;
        } else {
          scoreTharp = 0;
        }
        if (player.clodomiro) {
          // note will be 100 if there are 0 attempts, each attempt will decrease the note by 25 cos 100 / 4 = 25
          scoreClodomiro = scoreClodomiro - quizTrackerData.quiz4.attempts * 25;
        } else {
          scoreClodomiro = 0;
        }
        return {
          name: player.name,
          username: player.username,
          scoreDescartes,
          scoreEinstein,
          scoreTharp,
          scoreClodomiro,
          globalScore:
            (scoreDescartes + scoreEinstein + scoreTharp + scoreClodomiro) / 4,
        };
      })
    );

    setDataLeaderboard(
      finalResults.sort((a: any, b: any) => {
        if (sortField !== '') {
          // Perform sorting based on the selected field
          if (a[sortField] < b[sortField]) {
            return sortOrder === 'asc' ? -1 : 1;
          }
          if (a[sortField] > b[sortField]) {
            return sortOrder === 'asc' ? 1 : -1;
          }
        }
        // If no field is selected or the values are equal, maintain the existing order
        return b.globalScore - a.globalScore;
      })
    );
    console.log(finalResults);
  };

  useEffect(() => {
    fetchData();
    if (logged && type !== '123') {
      //history.push('/dashboard');
    }
  }, [history, logged, sortField, sortOrder]);

  const handleSort = (field: string) => {
    if (field === sortField) {
      // If the same field is clicked again, toggle the sort order
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // If a new field is clicked, set the sort field and default sort order to ascending
      setSortField(field);
      setSortOrder('asc');
    }
  };

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
                      <Typography
                        sx={{ mb: 4, mt: 2 }}
                        variant="h5"
                        component="div"
                        gutterBottom
                      >
                        Tabla de Posiciones
                      </Typography>
                      <Grid container spacing={1}>
                        <Grid item lg={1.5} xs={1.5}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            style={{
                              fontWeight: 'bold',
                              color: 'white',
                              background: 'rgba(0, 0, 0, 0.2)',
                              padding: '8px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              textDecoration:
                                sortField === 'position' ? 'underline' : 'none',
                            }}
                            onClick={() => handleSort('position')}
                          >
                            Posición
                          </Typography>
                        </Grid>
                        <Grid item lg={1.5} xs={1.5}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            style={{
                              fontWeight: 'bold',
                              color: 'white',
                              background: 'rgba(0, 0, 0, 0.2)',
                              padding: '8px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              textDecoration:
                                sortField === 'name' ? 'underline' : 'none',
                            }}
                            onClick={() => handleSort('name')}
                          >
                            Nombre
                          </Typography>
                        </Grid>
                        <Grid item lg={1.5} xs={1.5}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            style={{
                              fontWeight: 'bold',
                              color: 'white',
                              background: 'rgba(0, 0, 0, 0.2)',
                              padding: '8px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              textDecoration:
                                sortField === 'username' ? 'underline' : 'none',
                            }}
                            onClick={() => handleSort('username')}
                          >
                            Usuario
                          </Typography>
                        </Grid>
                        <Grid item lg={1.5} xs={1.5}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            style={{
                              fontWeight: 'bold',
                              color: 'white',
                              background: 'rgba(0, 0, 0, 0.2)',
                              padding: '8px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              textDecoration:
                                sortField === 'scoreDescartes'
                                  ? 'underline'
                                  : 'none',
                            }}
                            onClick={() => handleSort('scoreDescartes')}
                          >
                            Nota Descartes
                          </Typography>
                        </Grid>
                        <Grid item lg={1.5} xs={1.5}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            style={{
                              fontWeight: 'bold',
                              color: 'white',
                              background: 'rgba(0, 0, 0, 0.2)',
                              padding: '8px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              textDecoration:
                                sortField === 'scoreEinstein'
                                  ? 'underline'
                                  : 'none',
                            }}
                            onClick={() => handleSort('scoreEinstein')}
                          >
                            Nota Einstein
                          </Typography>
                        </Grid>
                        <Grid item lg={1.5} xs={1.5}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            style={{
                              fontWeight: 'bold',
                              color: 'white',
                              background: 'rgba(0, 0, 0, 0.2)',
                              padding: '8px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              textDecoration:
                                sortField === 'scoreTharp'
                                  ? 'underline'
                                  : 'none',
                            }}
                            onClick={() => handleSort('scoreTharp')}
                          >
                            Nota Tharp
                          </Typography>
                        </Grid>
                        <Grid item lg={1.5} xs={1.5}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            style={{
                              fontWeight: 'bold',
                              color: 'white',
                              background: 'rgba(0, 0, 0, 0.2)',
                              padding: '8px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              textDecoration:
                                sortField === 'scoreClodomiro'
                                  ? 'underline'
                                  : 'none',
                            }}
                            onClick={() => handleSort('scoreClodomiro')}
                          >
                            Nota Clodomiro
                          </Typography>
                        </Grid>
                        <Grid item lg={1.5} xs={1.5}>
                          <Typography
                            variant="subtitle1"
                            gutterBottom
                            style={{
                              fontWeight: 'bold',
                              color: 'white',
                              background: 'rgba(0, 0, 0, 0.2)',
                              padding: '8px',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              textDecoration:
                                sortField === 'globalScore'
                                  ? 'underline'
                                  : 'none',
                            }}
                            onClick={() => handleSort('globalScore')}
                          >
                            Nota Global
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Divider />
                <div
                  style={{ maxHeight: 400, width: '100%', overflowY: 'auto' }}
                >
                  {dataLeaderboard?.map((row: any, index: number) => (
                    <Grid item xs={12} key={index}>
                      {
                        <Card
                          sx={{
                            backgroundColor:
                              index % 2 === 0 ? '#f5f5f5' : '#ffffff',
                          }}
                        >
                          <CardContent>
                            <Grid container spacing={0}>
                              <Grid item lg={1.5} xs={1.5}>
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    color: index % 2 === 0 ? '#333' : 'inherit',
                                  }}
                                >
                                  {index + 1}
                                </Typography>
                              </Grid>
                              <Grid item lg={1.5} xs={1.5}>
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    color: index % 2 === 0 ? '#333' : 'inherit',
                                  }}
                                >
                                  {row?.name}
                                </Typography>
                              </Grid>
                              <Grid item lg={1.5} xs={1.5}>
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    color: index % 2 === 0 ? '#333' : 'inherit',
                                  }}
                                >
                                  {row?.username}
                                </Typography>
                              </Grid>
                              <Grid item lg={1.5} xs={1.5}>
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    color: index % 2 === 0 ? '#333' : 'inherit',
                                  }}
                                >
                                  {row?.scoreDescartes}
                                </Typography>
                              </Grid>
                              <Grid item lg={1.5} xs={1.5}>
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    color: index % 2 === 0 ? '#333' : 'inherit',
                                  }}
                                >
                                  {row?.scoreEinstein}
                                </Typography>
                              </Grid>
                              <Grid item lg={1.5} xs={1.5}>
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    color: index % 2 === 0 ? '#333' : 'inherit',
                                  }}
                                >
                                  {row?.scoreTharp}
                                </Typography>
                              </Grid>
                              <Grid item lg={1.5} xs={1.5}>
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    color: index % 2 === 0 ? '#333' : 'inherit',
                                  }}
                                >
                                  {row?.scoreClodomiro}
                                </Typography>
                              </Grid>
                              <Grid item lg={1.5} xs={1.5}>
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    color: index % 2 === 0 ? '#333' : 'inherit',
                                  }}
                                >
                                  {row?.globalScore}
                                </Typography>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      }
                    </Grid>
                  ))}
                </div>
              </Grid>
            </Container>
          </Box>
        </div>
      </main>
    </ThemeProvider>
  );
}
