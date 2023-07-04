import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { isMobile } from "react-device-detect";
import './index.css';
import Button from '@mui/material/Button';

interface SliderProps {
  data: {
    id: number;
    img: string;
    text: string;
  }[],
  onlyData?: boolean,
  onlySlide?:boolean
}

const Slider: React.FC<SliderProps> = ({ data, onlyData, onlySlide }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isAutoPlayEnabled) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
      }, 4000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentIndex, data.length, isAutoPlayEnabled]);

  const handleSlideClick = () => {
    if (isAutoPlayEnabled) {
      setIsAutoPlayEnabled(false);
    }

    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const { img, text } = data[currentIndex];

  let render = null;
  if( onlySlide ){
    render = (
      <div style={{ position: 'relative', zIndex: 999 }}>
        <img
          src={img}
          alt="Slider Image"
          style={{ width: '80%', cursor: 'pointer', margin:8, border: "1px solid black" }}
          onClick={handleSlideClick}
        />
      </div>
    );
  } else if( onlyData ){
    render = (
      <div style={{ position: 'relative', zIndex: 999 }}>
        <Typography sx={{padding:isMobile ? 5 : 2}} className='pointer' variant={isMobile ? 'subtitle1' : 'h5'} align={isMobile ? 'center' : 'left'}>
          {text}
        </Typography>
      </div>
    );
  } else{
    render = (
      <div style={{ position: 'relative', zIndex: 999 }}>
        <Grid container alignItems="center">
          <Grid item xs={5}>
            <Typography sx={{padding:5}} className='pointer' variant={isMobile ? 'subtitle1' : 'h5'} align={'center'}>
              {text}
            </Typography>
            <Button onClick={handleSlideClick} variant="contained">{currentIndex + 1}/{data.length}</Button>
          </Grid>
          <Grid item xs={7}>
            <img
              src={img}
              alt="Slider Image"
              style={{ width: '80%', cursor: 'pointer', margin:8, border: "1px solid black" }}
              onClick={handleSlideClick}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
  return render;
};

export default Slider;
