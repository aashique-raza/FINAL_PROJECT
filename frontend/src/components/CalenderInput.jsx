import React from 'react'
import { Grid, TextField, IconButton } from '@mui/material';
import { CalendarToday } from '@mui/icons-material';


function CalenderInput({ icon, inputProps,setFormData,formData,date }) {


  const handleChange=(e)=>{
    const {id,value}=e.target;
    setFormData({
      ...formData,
      [id]:value
    })
  }

  return (
    <Grid container spacing={2} >
      <Grid item xs={12}>
        <TextField
        className=' cursor-pointer'
        type='date'
        id={date}
        onChange={handleChange}
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