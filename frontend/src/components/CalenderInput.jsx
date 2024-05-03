import React from 'react'
import { Grid, TextField, IconButton } from '@mui/material';
import { CalendarToday } from '@mui/icons-material';


function CalenderInput({ icon, inputProps }) {
  return (
    <Grid container spacing={2} >
      <Grid item xs={12}>
        <TextField
        className=' cursor-pointer'
        type='date'
          variant="outlined"
          fullWidth
          InputProps={{
           
            style: {
              fontSize: inputProps?.fontSize || '16px',
              color: inputProps?.color || 'inherit',
              cursor:'pointer'
            }
          }}
          {...inputProps}
        />
      </Grid>
    </Grid>
  )
}

export default CalenderInput


{/* <CalendarInput
  inputProps={{
    fontSize: '18px',
    color: 'blue',
  }}
/> */}