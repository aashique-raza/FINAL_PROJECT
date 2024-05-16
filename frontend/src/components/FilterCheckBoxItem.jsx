import React, { useState } from "react";
import "../styles/SearchPage.css";
function FilterCheckBoxItem({
  option,
  type,
  name = "radioGroup",
  isChecked = "",
  setQParam,
  value,
}) {
  return (
    <div className="filter_checkbox_item">
      <input
        type={type}
        id={option}
        value={value}
        name={name ? name : "radio-group"}
        checked={isChecked}
        onChange={(e) => setQParam(e.target.value)}
      />
      <label htmlFor={option}>{option}</label>
    </div>
  );
}

export default FilterCheckBoxItem;
