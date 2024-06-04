import React from "react";

function DescriptionInput({ label, placeholder, id, formData, setFormData }) {
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  return (
    <div className="description-input">
      <label className=" font-raleway">{label}</label>
      <textarea
        placeholder={placeholder}
        onChange={handleChange}
        id={id}
        className="focus:ring-0 focus:outline-none focus:border-2 sm:w-3/4 lg:w-2/4 w-full h-36 font-raleway text-xs capitalize rounded-sm border-2 border-gray-300 px-4 py-3 resize-none text-gray-700 placeholder:text-gray-500 font-medium"
      ></textarea>
      <span className=" font-bold text-xs font-raleway ">
        {formData.description ? "remaining character" : "maximum character"}{" "}
        <strong className=" text-red-500">
          {formData.description
            ? 2000 - formData.description.trim().length
            : 2000}
        </strong>{" "}
      </span>
    </div>
  );
}

export default DescriptionInput;
