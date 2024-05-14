import React from "react";
import { Radio } from "@mui/material";

function RadioInput({
  id = "",
  name = "",
  lable = "",
  value,
  setFormData,
  formData,
}) {
  const handleChange = (e) => {
    const { id, value, name } = e.target;

    setFormData({
      ...formData,
      [id]: value,
    });
  };

  return (
    <div className="radio_input_container">
      <label htmlFor={id}>{lable}</label>
      <input
        value={value}
        type="radio"
        id={id}
        name={name}
        onChange={handleChange}
        className="  focus:ring-0  cursor-pointer"
      />
    </div>
  );
}

export default RadioInput;

{
  /* <div className="radio_input_container">
<label htmlFor={id} >{lable}</label>
<input value={value} type="radio" id={id} name={name} onChange={handleChange} />
</div> */
}
