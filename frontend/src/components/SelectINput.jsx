import React from "react";
import { Grid, FormControl, InputLabel, Select, MenuItem } from "@mui/material";

function SelectINput({
  xsize,
  smSize,
  mdSize,
  lgSize,
  space,
  optionItems = [],
  className = "",
  uppercase,
  capitalize,
  menuItemProps,
  setState,
  formData,
  setFormData
}) {

  const labelStyle = {
    textTransform: menuItemProps?.uppercase ? 'uppercase' : menuItemProps?.capitalize ? 'capitalize' : 'none',
    fontSize: menuItemProps?.fontSize || '16px',
    color: menuItemProps?.color || 'inherit',
    padding:menuItemProps?.paadingY || '6px'
  };


  const handleChange = (e) => {
    const { value, id } = e.target;
    const selectedItem = optionItems.find(item => item.value === value);
    console.log(selectedItem)
    setFormData({
      ...formData,
      [selectedItem.id]: value
    });
  };

  return (
    
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormControl fullWidth sx={{ pt: 1, pb: 1 }}>
          <InputLabel style={labelStyle}>Select </InputLabel>
          <Select id='apartment' defaultValue="" MenuProps={{ sx: { maxHeight: '300px' } }} onChange={handleChange} >
            {optionItems &&
              optionItems.map((item,index) => (
                <MenuItem key={index} id={item.label} value={item.value}  style={labelStyle} >{item.label}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </Grid>
      
    
  );
}

export default SelectINput;

{
  /* <MenuItem value="">None</MenuItem> */
}
{
  /* <MenuItem value="option2">Option 2</MenuItem>
<MenuItem value="option3">Option 3</MenuItem> */
}
