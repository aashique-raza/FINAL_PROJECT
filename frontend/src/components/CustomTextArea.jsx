import React from 'react'
import { Grid, TextField } from '@mui/material';

function CustomTextArea({ inputProps }) {
  return (
    <Grid container spacing={2}>
    <Grid item xs={12}>
      <TextField
        variant="outlined"
        multiline
        fullWidth
        maxRows={10} // Customize as needed
        inputProps={{
          maxLength: 2000, // Maximum length of 2000 characters
          style: {
            fontSize: inputProps?.fontSize || '16px',
            color: inputProps?.color || 'inherit',
            padding: inputProps?.padding || '12px 14px', // Customize padding
          }
        }}
        {...inputProps}
      />
    </Grid>
  </Grid>
  )
}

export default CustomTextArea


{/* <CustomTextArea
  inputProps={{
    fontSize: '18px',
    color: 'blue',
    padding: '10px', // Custom padding
  }}
/> */}