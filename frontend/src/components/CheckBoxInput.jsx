import React from 'react'

function CheckBoxInput({htmlFor,label='',type='',id='',setFormData}) {

    const handleCheckboxChange = (event, id) => {
        const { checked } = event.target;
    
        if (checked) {
          // Add the checked amenity to the roomAmenities array
          setFormData((prevData) => ({
            ...prevData,
            roomAmenities: [...prevData.roomAmenities, id],
          }));
        } else {
          // Remove the unchecked amenity from the roomAmenities array
          setFormData((prevData) => ({
            ...prevData,
            roomAmenities: prevData.roomAmenities.filter(
              (amenityId) => amenityId !== id
            ),
          }));
        }
      };


  return (
    <div className="room-amenities" >
      <label htmlFor={htmlFor}>{label}: </label>
      <input
        type={type}
        id={id}
        onChange={(e) => handleCheckboxChange(e, id)}
      />
    </div>
  )
}

export default CheckBoxInput