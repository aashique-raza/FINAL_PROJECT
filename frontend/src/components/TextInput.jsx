import React from "react";
import { Grid, TextField } from "@mui/material";

function TextInput({ uppercase, capitalize, label = "",formData,setFormData, id='' }) {
  const labelStyle = {
    textTransform: uppercase ? "uppercase" : capitalize ? "capitalize" : "none",
    fontSize: "14px", // Default font size
    "@media (max-width:600px)": {
      // Define responsive font size
      fontSize: "14px", // Font size for smaller screens
    },
  };

  const handleChange=(e)=>{
    const {id,value}=e.target;

    setFormData({
      ...formData,
      [id]: id==='built_up_area' ? parseInt(value) : value
    })
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <TextField
        variant="outlined"
        fullWidth
        placeholder={`${label}...`}
        onChange={handleChange}
        id={id}
        InputLabelProps={{
          style: labelStyle,
        }}
        className=" text-xs"
        sx={{
          fontSize: "14px", // Default font size
          "@media (max-width:600px)": {
            // Define responsive font size
            fontSize: "14px", // Font size for smaller screens
          },
        }}
      />
    </Grid>
  );
}

export default TextInput;
