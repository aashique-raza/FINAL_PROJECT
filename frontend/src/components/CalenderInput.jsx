import React,{useState,useEffect} from 'react'
import { Grid, TextField, IconButton } from '@mui/material';
import { CalendarToday } from '@mui/icons-material';


function CalenderInput({ icon, inputProps, setFormData, formData, date, defaultDate }) {
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (defaultDate) {
      setSelectedDate(defaultDate.split('T')[0]);
    }
  }, [defaultDate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSelectedDate(value);
    setFormData({
      ...formData,
      [id]: value
    });
  }

  return (
    <Grid container spacing={1} >
      <Grid item xs={12} >
        <TextField
          className='cursor-pointer'
          type='date'
          id={date}
          onChange={handleChange}
          value={selectedDate}
          variant="outlined"
          fullWidth
          InputProps={{
            style: {
              fontSize: inputProps?.fontSize || '16px',
              color: inputProps?.color || 'inherit',
              cursor: 'pointer',
              padding: '-7px 0px'
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