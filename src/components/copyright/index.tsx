import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import React from 'react';

const Copyright = () => {
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
};
export default Copyright;
