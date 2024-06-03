import React from "react";

function EditInputComp({
  label,
  type,
  placeholder,
  id,
  formData,
  setFormData,
}) {
  return (
    <div className="edit-input-wrapper">
      <input placeholder={placeholder} className="input-field focus:ring-0" type={type} id={id} />
      <label for="input-field" className="input-label">
        {label}
      </label>
      <span className="input-highlight text-xl lg:text-2xl capitalize tracking-wider font-sans font-bold"></span>
    </div>
  );
}

export default EditInputComp;
