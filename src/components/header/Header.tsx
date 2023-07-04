/* eslint-disable no-restricted-globals */
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
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
import { HeaderProps } from "./Header.types";
import {useUsers} from '../../context/Users'

export const Header =({ opened, setOpened }: HeaderProps)=>{
let history = useHistory();
const { logOut, getUsers} = useUsers();
const { logged, user }: any = getUsers();
// const logged = localStorage.getItem('token');
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
// const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
};
// const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElUser(event.currentTarget);
// };

const handleCloseNavMenu = () => {
    setAnchorElNav(null);
};

// const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
// };
const closeSession =()=>{
  logOut()
  history.push('/login')
}

  return (
    <AppBar position="static" sx={{backgroundColor: '#4d6277'}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={logged ?('/dashboard'):('/login')}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {!logged ? ('SAGAS'):(`Bienvenido ${user?.name}`)}
          </Typography>

          <Box  sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                <MenuItem onClick={() => history.push('/signup')}>
                  <Typography textAlign="center">Registrarme</Typography>
                </MenuItem>
                <MenuItem onClick={() => history.push('/login')}>
                  <Typography textAlign="center">Iniciar Sesión</Typography>
                </MenuItem>
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              letterSpacing: '.2em',
              color: 'inherit'
            }}
          >
            SAGAS
          </Typography>
            {
              !logged ? (
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, position: 'absolute', right: '0%' }}>
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
                onClick={() => {history.push('/login')}}
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
              ):(
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, position: 'absolute', right: '0%' }}>
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
              )
            }
        </Toolbar>
      </Container>
    </AppBar>
  )
};