import React from "react";

function DescriptionInput({ label, placeholder }) {
  return (
    <div className="description-input">
      <label className=" font-raleway">{label}</label>
      <textarea
        placeholder={placeholder}
        className="focus:ring-0 focus:outline-none focus:border-2 sm:w-3/4 lg:w-2/4 w-full h-36 font-raleway text-xs capitalize rounded-sm border-2 border-gray-300 px-4 py-3 resize-none text-gray-700 placeholder:text-gray-500 font-medium"
      ></textarea>
    </div>
  );
}

export default DescriptionInput;
