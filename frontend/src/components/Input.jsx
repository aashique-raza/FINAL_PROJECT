import React from "react";

function Input({
  label='',
  type = "text",
  placeholder = "",
  id = "",
  setFormData,
  formData,
}) {
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };
  return (
    <div  className=" input-container ">
      <label htmlFor={id} className="required">{label}: </label>
      <input type={type} placeholder={placeholder} id={id} onChange={handleChange} />
    </div>
  );
}

export default Input;
// <input type={type} placeholder={placeholder} id={id} onChange={handleChange} />
