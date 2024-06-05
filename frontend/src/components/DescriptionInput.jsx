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
      <label className=" font-raleway font-bold text-xl md:text-2xl xl:text-3xl  capitalize ">{label}</label>
      <textarea
        placeholder={placeholder}
        onChange={handleChange}
        id={id}
        className="focus:ring-0 focus:outline-none focus:border-2 sm:w-3/4 lg:w-2/4 w-full h-36  font-roboto font-semibold text-xl md:text-2xl xl:text-3xl tracking-wider"
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
