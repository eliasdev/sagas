import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ScienceIcon from '@mui/icons-material/ScienceOutlined';
import SchoolIcon from '@mui/icons-material/SchoolOutlined';
import ClassIcon from '@mui/icons-material/ClassOutlined';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './index.css';

const BottomPanel = () => {
    return (
        <Grid className="margin-center bottom-actions" container sx={{width:{lg: "60vw",md: "70vw",sm: "70vw",xs: "70vw"}, maxWidth:{lg: "60vw",md: "70vw",sm: "70vw",xs: "70vw"}, bottom:{lg: "-3vh",md: "-30vh",sm: "-20vh",xs: "-20vh"}}}>
            <Grid className="margin-center" item sm={1} xs={1} md={1}>
            <ScienceIcon className="dash-icon" sx={{fontSize: {lg:50,md:40,sm:40,xs:40}}} color="primary"/>
            <Typography color="primary.contrastText" lineHeight={1.2} sx={{fontSize: {lg: 12,md: 12,sm: 10,xs: 10}}}>SAGAS</Typography>
            </Grid>
            <Grid className="margin-center" item sm={1} xs={1} md={1}>
            <AutoStoriesIcon className="dash-icon" sx={{fontSize: {lg:50,md:40,sm:40,xs:40}}} color="primary"/>
            <Typography color="primary.contrastText" lineHeight={1.2} sx={{fontSize: {lg: 12,md: 12,sm: 10,xs: 10}}}>AULA</Typography>
            </Grid>
            <Grid className="margin-center" item sm={1} xs={1} md={1}>
            <ClassIcon className="dash-icon" sx={{fontSize: {lg:50,md:40,sm:40,xs:40}}} color="primary"/>
            <Typography color="primary.contrastText" lineHeight={1.2} sx={{fontSize: {lg: 12,md: 12,sm: 10,xs: 10}}}>ARCHIVO</Typography>
            </Grid>
            <Grid className="margin-center" item sm={1} xs={1} md={1}>
            <SchoolIcon className="dash-icon" sx={{fontSize: {lg:50,md:40,sm:40,xs:40}}} color="primary"/>
            <Typography color="primary.contrastText" lineHeight={1.2} sx={{fontSize: {lg: 12,md: 12,sm: 10,xs: 10}}}>LOGROS</Typography>
            </Grid>
            <Grid className="margin-center" item sm={1} xs={1} md={1}>
            <AccountCircleIcon className="dash-icon" sx={{fontSize: {lg:50,md:40,sm:40,xs:40}}} color="primary"/>
            <Typography color="primary.contrastText" lineHeight={1.2} sx={{fontSize: {lg: 12,md: 12,sm: 10,xs: 10}}}>CUENTA</Typography>
            </Grid>
            <Grid className="margin-center" item sm={1} xs={1} md={1}>
            <SettingsIcon className="dash-icon" sx={{fontSize: {lg:50,md:40,sm:40,xs:40}}} color="primary"/>
            <Typography color="primary.contrastText" lineHeight={1.2} sx={{fontSize: {lg: 12,md: 12,sm: 10,xs: 10}}}>AJUSTES</Typography>
            </Grid>
            <Grid className="margin-center" item sm={0.5} xs={0.5} md={0.5}>
            
            </Grid>
            <Grid className="margin-center" item sm={1} xs={1} md={1}>
            <ExitToAppIcon className="dash-icon" sx={{fontSize: {lg:50,md:40,sm:40,xs:40}}} color="primary"/>
            <Typography color="primary.contrastText" lineHeight={1.2} sx={{fontSize: {lg: 12,md: 12,sm: 10,xs: 10}}}>SALIR</Typography>
            </Grid>
        </Grid>
      );
};
export default BottomPanel;
