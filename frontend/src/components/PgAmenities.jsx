import React from "react";
import RadioInput from "./RadioInput";
// pg available amenities----
import {
  Tv,
  Fastfood,
  PowerSettingsNew,
  ArrowUpward,
} from "@mui/icons-material";
import TvIcon from "@mui/icons-material/Tv";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import EditRadioInput from "./EditComp/EditRadioInput";

function PgAmenities({ formData, setFormData }) {
  const pgAvailableAmenities = [
    { label: "commonTv", value: "tv", icon: <TvIcon /> },
    { label: "mess", value: "mess", icon: <FastfoodIcon /> },
    
    { label: "power backup", value: "power", icon: <PowerSettingsNew /> },
    { label: "lift", value: "lift", icon: <ArrowUpward /> },
  ];

  const handleChange = (e) => {
    const { checked, id, value } = e.target;
    if (checked) {
      setFormData((prevData) => ({
        ...formData,
        ameinites: [...prevData.ameinites, id],
      }));
    } else {
      setFormData((prevdata) => ({
        ...formData,
        ameinites: formData.ameinites.filter((amenityId) => amenityId !== id),
      }));
    }
  };

  return (
    <div className="pg-amenities_container bg-white py-3 px-2 md:px-4 lg:px-6 rounded-md">
      <section className="pg-amenities-first">
        <h3 className=" capitalize font-extrabold font-roboto tracking-wider text-xl md:text-2xl text-black" >availabel service</h3>
        <div className="service-itms">
          <div className="service-name">
            <p className="required">laundary</p>
            <div className="service-option">
              <RadioInput
                name="laundary"
                id="laundary"
                lable="yes"
                value="yes"
                setFormData={setFormData}
                formData={formData}
              />
              <RadioInput
                name="laundary"
                id="laundary"
                lable="no"
                value="no"
                setFormData={setFormData}
                formData={formData}
              />
            </div>
          </div>

          <div className="service-name">
            <p className="required">room cleaning</p>
            <div className="service-option">
              <RadioInput
                name="roomCleaning"
                id="roomCleaning"
                lable="yes"
                value="yes"
                setFormData={setFormData}
                formData={formData}
              />
              <RadioInput
                name="roomCleaning"
                id="roomCleaning"
                lable="no"
                value="no"
                setFormData={setFormData}
                formData={formData}
              />
             
            </div>
          </div>

          <div className="service-name">
            <p className="required">warden facility</p>
            <div className="service-option">
              
              <RadioInput
                name="warden"
                id="warden"
                lable="yes"
                value="yes"
                setFormData={setFormData}
                formData={formData}
              />
              <RadioInput
                name="warden"
                id="warden"
                lable="no"
                value="no"
                setFormData={setFormData}
                formData={formData}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="pg-amenities-second  flex  flex-col gap-3">
        <h3 className=" capitalize font-extrabold font-roboto tracking-wider text-xl md:text-2xl text-black" >available amenities</h3>
        <div className="available-amenities">
          {pgAvailableAmenities.map((ameniti, index) => (
            <div key={index} className="available-amenities-item">
              <input
                type="checkbox"
                name={ameniti.value}
                id={ameniti.value}
                onChange={handleChange}
                className="  w-6 h-6 lg:h-8 lg:w-8 focus:ring-0"
              />
              <label htmlFor={ameniti.value}>
                {" "}
                <span>{ameniti.icon}</span> {ameniti.label}
              </label>
            </div>
          ))}
        </div>
      </section>
      
    </div>
  );
}

export default PgAmenities;

{
  /* <EditRadioInput
name="propertyAvailableFor"
id="propertyAvailableForRent"
label="Rent"
value="rent"
isChecked={editFormData.propertyAvailableFor === "rent"}
formData={editFormData}
setFormData={setEditFormData}
/> */
}
