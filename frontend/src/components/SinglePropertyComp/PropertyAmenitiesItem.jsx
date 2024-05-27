import React from "react";

function PropertyAmenitiesItem({ icon, name }) {
  return (
    <div className="bg-gray-200  flex  flex-col items-center justify-center gap-5  w-44 px-2 py-10 property-amenity-item-list">
      <div className=" text-center text-teal-800">{icon}</div>
      <h3 className=" text-sm sm:text-xl capitalize text-center font-roboto tracking-wider font-semibold">
        {name}
      </h3>
    </div>
  );
}

export default PropertyAmenitiesItem;
