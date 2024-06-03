import React, { useState, useEffect } from "react";

function EditSelectComp({
  id,
  name,
  optionName,
  optionValues,
  formData,
  setFormData,
  defaultValue,
}) {
  const [selectedValue, setSelectedValue] = useState(
    defaultValue || formData[id] || ""
  );
  // console.log('selected value',selectedValue)

  useEffect(() => {
    setSelectedValue(defaultValue || formData[id] || "");
  }, [defaultValue, formData[id]]);

  const handleChange = (e) => {
    const { value, id } = e.target;
    setSelectedValue(value)
    console.log(value);
  };

  return (
    <div>
      <p>bhk type</p>
      <select id={id} value={selectedValue} name={name} onChange={handleChange}>
        {optionValues.map((item, index) => (
          <option key={index} value={item.value}>{item.label}</option>
        ))}
      </select>
    </div>
  );
}

export default EditSelectComp;
