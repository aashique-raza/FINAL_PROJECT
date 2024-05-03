import React from "react";
import { TextField } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";

function NumberInput({
  permonth = true,
  placeholder,
  label,
  color,
  fontSize,
  textTransform,
  ...otherProps
}) {
  return (
    <div className="custom-number-input">
      <p className=" label text-xs md:text-xl font-raleway font-bold capitalize text-gray-700">{label}</p>

      <div className="custom_number_input_wrapper">
        <img
          src="https://cdn-icons-png.flaticon.com/512/25/25473.png"
          alt="ruppe-icon"
          className=" md:w-4 md:h-4 w-3 h-3"
        />
        <input type="number" className=" text-xs md:text-xl  font-raleway capitalize focus:ring-0" placeholder={placeholder} />

        <p className=" text-xs md:xl text-gray-700 font-raleway  capitalize">{permonth && "/month"}</p>
      </div>
    </div>
  );
}

export default NumberInput;
