import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ScienceIcon from '@mui/icons-material/ScienceOutlined';
import SchoolIcon from '@mui/icons-material/SchoolOutlined';
import ClassIcon from '@mui/icons-material/ClassOutlined';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useHistory } from 'react-router-dom';
import {useUsers} from '../../context/Users'
import './index.css';

const BottomPanel = () => {

    const { logOut, getUsers} = useUsers();

    let history = useHistory();
    

    const closeSession =()=>{
        logOut()
        history.push('/login')
    }
    
    return (
        <Grid className="margin-center bottom-actions" container sx={{width:{lg: "50vw",xs: "65vw"}, maxWidth:{lg: "60vw",md: "70vw",sm: "70vw",xs: "70vw"}, bottom:{lg: "-3vh",md: "-30vh",sm: "-20vh",xs: "-20vh"}}}>
            <Grid onClick={() => history.push('/123')} className="margin-center pointer" item sm={2} xs={2} md={2}>
                <ScienceIcon className="dash-icon" sx={{fontSize: {lg:50,md:40,sm:40,xs:40}}} color="primary"/>
                <Typography color="primary.contrastText" lineHeight={1.2} sx={{fontSize: {lg: 12,md: 12,sm: 10,xs: 10}}}>SAGAS</Typography>
            </Grid>
            <Grid onClick={() => history.push('/leaderboard')} className="margin-center pointer" item sm={2} xs={2} md={2}>
                <AutoStoriesIcon className="dash-icon" sx={{fontSize: {lg:50,md:40,sm:40,xs:40}}} color="primary"/>
                <Typography color="primary.contrastText" lineHeight={1.2} sx={{fontSize: {lg: 12,md: 12,sm: 10,xs: 10}}}>AULA</Typography>
            </Grid>
            <Grid className="margin-center pointer" item sm={2} xs={2} md={2}>
                <SchoolIcon className="dash-icon" sx={{fontSize: {lg:50,md:40,sm:40,xs:40}}} color="primary"/>
                <Typography color="primary.contrastText" lineHeight={1.2} sx={{fontSize: {lg: 12,md: 12,sm: 10,xs: 10}}}>LOGROS</Typography>
            </Grid>
            <Grid onClick={() => history.push('/profile')} className="margin-center pointer" item sm={2} xs={2} md={2}>
                <AccountCircleIcon className="dash-icon" sx={{fontSize: {lg:50,md:40,sm:40,xs:40}}} color="primary"/>
                <Typography color="primary.contrastText" lineHeight={1.2} sx={{fontSize: {lg: 12,md: 12,sm: 10,xs: 10}}}>CUENTA</Typography>
            </Grid>
            <Grid className="margin-center pointer" item sm={2} xs={2} md={2}></Grid>
            <Grid onClick={() => closeSession()} className="margin-center" item sm={2} xs={2} md={2}>
                <ExitToAppIcon className="dash-icon" sx={{fontSize: {lg:50,md:40,sm:40,xs:40}}} color="primary"/>
                <Typography color="primary.contrastText" lineHeight={1.2} sx={{fontSize: {lg: 12,md: 12,sm: 10,xs: 10}}}>SALIR</Typography>
            </Grid>
        </Grid>
      );
};
export default BottomPanel;
