import React from 'react'
import { Grid, FormControlLabel, Checkbox } from '@mui/material';

function CustomCheckbox({checkboxProps,options=[] }) {

    const labelStyle = {
        textTransform: checkboxProps?.uppercase ? 'uppercase' : checkboxProps?.capitalize ? 'capitalize' : 'none',
        fontSize: checkboxProps?.fontSize || '16px',
        color: checkboxProps?.color || 'inherit',
        paddingLeft: checkboxProps?.paddingLeft || '0',
        paddingRight: checkboxProps?.paddingRight || '0',
      };

  return (
    <Grid container spacing={1}>
    {options?.map((item,index) => (
      <Grid item xs={6} sm={4} md={4} lg={3} key={index}>
        <FormControlLabel
          control={<Checkbox value={item.value} />}
          label={<span style={labelStyle}>{item.label}</span>}
        />
      </Grid>
    ))}
  </Grid>
  )
}

export default CustomCheckbox