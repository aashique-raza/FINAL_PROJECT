import React from 'react';


import { Radio,RadioGroup,FormControlLabel,FormControl,makeStyles } from '@mui/material';



function CustomRadio({ options, color, font, padding, margin, textTransform,name,optionName,fontSize }) {


    const [value, setValue] = React.useState(options[0].value);
  
    const handleChange = (event) => {
      setValue(event.target.value);
    };
  

    // aria-label="gender"
    //   name="gender"


  return (
    <FormControl component="fieldset">
    <RadioGroup
      aria-label={optionName}
      name={optionName}
      value={value}
      onChange={handleChange}
     
      row
    >
      {options.map((option) => (
        <FormControlLabel
          key={option.value}
          value={option.value}
          control={<Radio sx={{
            
            '&.Mui-checked': {
              color: 'green',
            },
          }} />}
          label={option.label}
          style={{
            color: color || '#333',
            fontFamily: font || 'Arial, sans-serif',
            padding: padding || '8px',
            margin: margin || '8px',
            textTransform: textTransform || 'none',
            fontSize:fontSize || '12px'
          }}
        />
      ))}
    </RadioGroup>
  </FormControl>
  );
}

export default CustomRadio;


// <GenderSelection
//   options={[
//     { label: 'Male', value: 'male' },
//     { label: 'Female', value: 'female' },
//   ]}
//   color="#FF5733"
//   font="Roboto, sans-serif"
//   padding="10px"
//   margin="5px"
//   textTransform="uppercase"
// />