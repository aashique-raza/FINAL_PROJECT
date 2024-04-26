import React from "react";
import RadioInput from "./RadioInput";
// pg available amenities----
import { Tv, Fastfood, PowerSettingsNew, ArrowUpward } from '@mui/icons-material';
import TvIcon from '@mui/icons-material/Tv';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import { Button } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



function PgAmenities() {
    
  const pgAvailableAmenities = [
    { label: "commonTv", value: "tv", icon: <TvIcon /> },
    { label: "mess", value: "mess", icon: <FastfoodIcon /> },
    // { label: "commonfridge", value: "regrigatoor", icon: <Refrigerator /> },
    { label: "power backup", value: "power", icon: <PowerSettingsNew /> },
    { label: "lift", value: "lift", icon: <ArrowUpward /> },
  ];
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // Handle the file here
  };

  return (
    <div className="pg-amenities_container">
      <section className="pg-amenities-first">
        <h3>availabel service</h3>
        <div className="service-itms">
          <div className="service-name">
            <p className="required">laundary</p>
            <div className="service-option">
              <RadioInput name="laundary_option" id="yes" lable="yes" />
              <RadioInput name="laundary_option" id="no" lable="no" />
            </div>
          </div>

          <div className="service-name">
            <p className="required">room cleaning</p>
            <div className="service-option">
              <RadioInput name="room_cleaning_option" id="yes" lable="yes" />
              <RadioInput name="room_cleaning_option" id="no" lable="no" />
            </div>
          </div>

          <div className="service-name">
            <p className="required">warden facility</p>
            <div className="service-option">
              <RadioInput name="warden_option" id="yes" lable="yes" />
              <RadioInput name="warden_option" id="no" lable="no" />
            </div>
          </div>
        </div>
      </section>

      <section className="pg-amenities-second">
        <h3>available amenities</h3>
        <div className="available-amenities">
          {pgAvailableAmenities.map((ameniti,index) => (
            <div key={index} className="available-amenities-item">
              <input type="checkbox" name={ameniti.value}  id={ameniti.value}/>
              <label htmlFor={ameniti.value}> <span>{ameniti.icon}</span> {ameniti.label}</label>
            </div>
          ))}
        </div>
      </section>
      <section className="section-3">
      <Button
      component="label"
      variant="contained"
      startIcon={<CloudUploadIcon />}
    >
      Upload file
      <input
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        accept="image/*" 
      />
    </Button>
   
      </section>
    </div>
  );
}

export default PgAmenities;
