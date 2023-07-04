import React from 'react';
import { ReactPhotoSphereViewer } from 'react-photo-sphere-viewer';
import Visor from '../../assets/clodomiro-lab360.jpg'
import './index.css';
import { Grid } from '@mui/material';
import { Button } from '@mui/material';
import { isMIUI, isMobile } from "react-device-detect";

const ProductView = () => {

    return (
        <div style={{ padding: 3 }}>
            <div style={{ height: isMobile? 200 : 400 }}>
                <ReactPhotoSphereViewer
                container="container"
                src={Visor}
                height="100%"
                width="100%"
                />
            </div>
        </div>
      );
};
export default ProductView;