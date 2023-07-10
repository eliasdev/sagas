import React from 'react';
import Chip from '@mui/material/Chip';

interface TagProps {
  label: string;
}

const getRandomColor = (): string => {
const colors = [
    '#FAA919', '#DC2B27', '#3F51B5', '#4CAF50', '#9C27B0', '#FF5722',
    '#E91E63', '#00BCD4', '#8BC34A', '#673AB7', '#FF9800', '#009688',
    '#F44336', '#3F51B5', '#2196F3', '#009688', '#FFEB3B', '#795548',
    '#607D8B', '#FFC107', '#607D8B', '#FFC107', '#795548', '#FF5722',
    '#673AB7', '#9C27B0', '#4CAF50', '#3F51B5', '#DC2B27', '#FAA919',
    '#E91E63', '#00BCD4', '#8BC34A', '#673AB7', '#FF9800', '#009688',
    '#F44336', '#3F51B5', '#2196F3', '#009688', '#FFEB3B', '#795548',
    '#607D8B', '#FFC107', '#607D8B', '#FFC107', '#795548', '#FF5722',
    ];
      
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const Tag: React.FC<TagProps> = ({ label }) => {
  const randomColor = getRandomColor();

  return (
    <Chip
      label={label}
      sx={{
        backgroundColor: randomColor,
        color: '#FFFFFF',
        borderRadius: '4px',
        padding: '4px 8px',
        margin:'2px 0',
        fontWeight: 'bold',
        fontSize: '12px',
      }}
    />
  );
};

export default Tag;
