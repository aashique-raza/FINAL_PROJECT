import React, { useState, useEffect } from "react";
import "../../../styles/EditPage.css";

function EditSelectComp({
  id,
  name,
  optionName,
  optionValues,
  formData,
  setFormData,
  defaultValue,
  editFormData,
  setEditFormData,
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
    setSelectedValue(value);
    setEditFormData({
      ...editFormData,
      [id]: id === "floor" || id === "totalFloor" ? parseInt(value) : value,
    });
    // console.log(value);
  };

  return (
    <div className="edit-select-wrapper ">
      <p className=" pl-2 mb-2 text-xl lg:text-2xl capitalize tracking-wider font-sans font-bold ">
        {optionName}
      </p>
      <div className="edit_select w-full">
        <select
          id={id}
          className="edit_select_tag focus:ring-0"
          value={selectedValue}
          name={name}
          onChange={handleChange}
        >
          {optionValues.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default EditSelectComp;
