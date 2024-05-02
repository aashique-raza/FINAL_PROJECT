import React from "react";
import { Grid, TextField } from "@mui/material";

function TextInput({ uppercase, capitalize,label='' }) {
    const labelStyle = {
        textTransform: uppercase ? 'uppercase' : capitalize ? 'capitalize' : 'none',
        fontSize: '14px', // Default font size
        '@media (max-width:600px)': { // Define responsive font size
          fontSize: '14px', // Font size for smaller screens
        },
      };
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <TextField
        
        variant="outlined"
        fullWidth
        placeholder={`${label}...`}
        
        InputLabelProps={{
          style: labelStyle,
        }}
        className=" text-xs"
        sx={{
            
            fontSize: '14px', // Default font size
            '@media (max-width:600px)': { // Define responsive font size
              fontSize: '14px', // Font size for smaller screens
            },
          }}
      />
    </Grid>
  );
}

export default TextInput;
