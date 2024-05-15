
import React, { useState } from 'react';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

function PriceSliderComp() {
    const [price, setPrice] = useState([1000, 100000]); // Initial price range
  
    const handleChange = (event, newValue) => {
      setPrice(newValue);
    };
  return (
    <div style={{ minWidth:'100%' }} className='px-6'>
    <Typography id="range-slider" gutterBottom>
      Price Range
    </Typography>
    <Slider
      value={price}
      onChange={handleChange}
      valueLabelDisplay="auto"
      aria-labelledby="range-slider"
      min={1000}
      max={100000}
    />
    <Typography>
      Rs. {price[0]} - Rs. {price[1]}
    </Typography>
  </div>
  )
}

export default PriceSliderComp