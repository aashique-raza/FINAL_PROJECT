import React from "react";

function CheckBoxInput({
  htmlFor,
  label = "",
  type = "",
  id = "",
  setFormData,
  pgRuleSet = false,
}) {
 
  const handleCheckboxChange = (event, id) => {
    const { checked } = event.target;

    if (checked) {
      // Add the checked amenity to the roomAmenities array
      if (pgRuleSet) {
        setFormData((prevData) => ({
          ...prevData,
          pgRules: [...prevData.pgRules, id],
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          roomFacilities: [...prevData.roomFacilities, id],
        }));
      }
    } else {
      if (pgRuleSet) {
        setFormData((prevData) => ({
          ...prevData,
          pgRules: prevData.pgRules.filter(
            (amenityId) => amenityId !== id
          ),
        }));
      } else {
        // Remove the unchecked amenity from the roomAmenities array
        setFormData((prevData) => ({
          ...prevData,
          roomFacilities: prevData.roomFacilities.filter(
            (amenityId) => amenityId !== id
          ),
        }));
      }
    }
  };

  return (
    <div className="room-amenities">
      <label htmlFor={htmlFor}>{label}: </label>
      <input
      className=" focus:ring-0"
        type={type}
        id={id}
        onChange={(e) => handleCheckboxChange(e, id)}
      />
    </div>
  );
}

export default CheckBoxInput;
