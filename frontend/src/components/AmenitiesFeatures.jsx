import React,{useState,useEffect} from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { roomAmenitiesList } from "../rentUtils";

function AmenitiesFeatures() {
    const [checkedItems, setCheckedItems] = useState({});

    const handleChange = (label) => {
      setCheckedItems(prevState => ({
        ...prevState,
        [label]: !prevState[label]
      }));
    };


  return (
    <div className="flex flex-wrap">
      {roomAmenitiesList.map((amenity, index) => (
        <div
          key={index}
          className="w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/4 px-3 mb-4 "
        >
          <FormControlLabel
            control={
              <Checkbox
              size="small"
                checked={checkedItems[amenity.label]}
                onChange={() => handleChange(amenity.label)}
              />
            }
            labelPlacement="end"
            label={
              <div className="flex items-center ">
                {amenity.icon && <span className="mr-2 text-sm md:text-base lg:text-lg">{amenity.icon}</span>}
                {amenity.label}
              </div>
            }
          />
        </div>
      ))}
    </div>
  );
}

export default AmenitiesFeatures;
