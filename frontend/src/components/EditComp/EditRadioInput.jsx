import React, { useState, useEffect } from "react";
import "../../styles/EditPage.css";

// import React, { useState, useEffect } from 'react';

function EditRadioInput({
  name,
  id,
  label, // Fixed spelling for 'label'
  value,
  setEditedFormData,
  editFormData,
  defaultChecked,
}) {

    const [isChecked, setIsChecked] = useState(defaultChecked);

    useEffect(() => {
      setIsChecked(defaultChecked);
    }, [defaultChecked]);
  
    const handleChange = (e) => {
      const { value,id } = e.target;
      console.log(value);
      setEditedFormData({ ...editFormData, [id]: value });
      setIsChecked(true); // Ensuring the current radio button is checked
    };
 
  return (
    <div className="edit-radio-button">
      <input
        type="radio"
        className="edit-radio-button__input"
        id={id}
        name={name}
        value={value}
        checked={defaultChecked}
        onChange={handleChange}
      />
      <label className="edit-radio-button__label" htmlFor={id}>
        <span className="edit-radio-button__custom"></span>
        {label}
      </label>
    </div>
  );
}

export default EditRadioInput;
