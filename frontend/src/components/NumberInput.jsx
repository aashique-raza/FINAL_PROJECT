import React from 'react'
import {  InputAdornment, IconButton,FormControl,OutlinedInput,FormHelperText } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function NumberInput({ icon, iconColor, padding, textTransform, fontSize, ...rest }) {

    
  return (
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
      <OutlinedInput
        type="number"
        id="outlined-adornment-weight"
        startAdornment={
          <InputAdornment position="start">
            <IconButton style={{ color: iconColor, padding }}>
              {React.cloneElement(icon, { style: { fontSize, textTransform } })}
            </IconButton>
          </InputAdornment>
        }
        aria-describedby="outlined-weight-helper-text"
        inputProps={{
          'aria-label': 'weight',
        }}
        {...rest}
      />
      <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
    </FormControl>
  )
}

export default NumberInput


// import { Phone } from '@mui/icons-material'; // Example icon

{/* <NumberInput
  icon={<Phone />} // Example icon
  inputProps={{
    fontSize: '18px',
    color: 'blue',
  }}
/> */}

// endAdornment: (
          //   <InputAdornment position="end">
          //     <IconButton onClick={togglePasswordVisibility}>
          //       {showPassword ? <Visibility /> : <VisibilityOff />}
          //     </IconButton>
          //   </InputAdornment>
          // ),