/* eslint-disable no-restricted-globals */
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { HeaderProps } from './Header.types';
import { useUsers } from '../../context/Users';

export const Header = ({ opened, setOpened }: HeaderProps) => {
  let history = useHistory();
  const { logOut, getUsers } = useUsers();
  const { user }: any = getUsers();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logged = localStorage.getItem('token');

  const closeSession = () => {
    logOut();
    history.push('/login');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#4d6277' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={logged ? '/dashboard' : '/homepage'}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {!logged ? 'SAGAS' : `Bienvenid@ ${user?.name}`}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {!logged
                ? [
                    <MenuItem
                      key="signup"
                      onClick={() => history.push('/signup')}
                    >
                      <Typography textAlign="center">Registrarme</Typography>
                    </MenuItem>,
                    <MenuItem
                      key="login"
                      onClick={() => history.push('/login')}
                    >
                      <Typography textAlign="center">Iniciar Sesión</Typography>
                    </MenuItem>,
                  ]
                : [
                    <MenuItem
                      key="dashboard"
                      onClick={() => history.push('/dashboard')}
                    >
                      <Typography textAlign="center">Inicio</Typography>
                    </MenuItem>,
                    <MenuItem
                      key="profile"
                      onClick={() => history.push('/profile')}
                    >
                      <Typography textAlign="center">Perfil</Typography>
                    </MenuItem>,
                    <MenuItem key="logout" onClick={() => closeSession()}>
                      <Typography textAlign="center">Cerrar Sesión</Typography>
                    </MenuItem>,
                  ]}
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              letterSpacing: '.2em',
              color: 'inherit',
            }}
          >
            SAGAS
          </Typography>
          {!logged ? (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                position: 'absolute',
                right: '0%',
              }}
            >
              <Button
                onClick={() => history.push('/signup')}
                style={{
                  textDecoration: 'none',
                  padding: '20px',
                  color: '#fff',
                  fontSize: '19px',
                  fontWeight: 700,
                }}
              >
                Registrarme
              </Button>
              <Button
                onClick={() => {
                  history.push('/login');
                }}
                style={{
                  textDecoration: 'none',
                  padding: '20px',
                  color: '#fff',
                  fontSize: '19px',
                  fontWeight: 700,
                }}
              >
                Iniciar Sesión
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: 'none', md: 'flex' },
                position: 'absolute',
                right: '0%',
              }}
            >
              <Button
                onClick={() => history.push('/profile')}
                style={{
                  textDecoration: 'none',
                  padding: '20px',
                  color: '#fff',
                  fontSize: '19px',
                  fontWeight: 700,
                }}
              >
                Perfil
              </Button>
              <Button
                onClick={() => closeSession()}
                style={{
                  textDecoration: 'none',
                  padding: '20px',
                  color: '#fff',
                  fontSize: '19px',
                  fontWeight: 700,
                }}
              >
                Cerrar SESSION
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
