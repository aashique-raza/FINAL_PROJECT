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
      <label className="  font-roboto font-bold text-xl md:text-2xl   capitalize ">{label}</label>
      <textarea
        placeholder={placeholder}
        onChange={handleChange}
        id={id}
        className="focus:ring-0    w-full    overflow-y-scroll   font-roboto font-semibold text-xl md:text-2xl  tracking-wider"
      ></textarea>
      <span className=" font-bold text-sm font-raleway pb-4 ">
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
