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
}) {
  const labelStyle = {
    textTransform: uppercase ? "uppercase" : capitalize ? "capitalize" : "none",
  };

  return (
    
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <FormControl fullWidth sx={{ pt: 1, pb: 1 }}>
          <InputLabel style={labelStyle}>Select </InputLabel>
          <Select defaultValue="">
            {optionItems &&
              optionItems.map((item,index) => (
                <MenuItem key={index} value={item.value}>{item.label}</MenuItem>
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
