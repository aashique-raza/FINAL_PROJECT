import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

function PropertyDescription({ desc }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white px-4 py-6">
      <p
        className={` leading-10  capitalize text-sm sm:text-xl md:text-2xl  font-roboto text-slate-600 font-light tracking-wider ${
          isExpanded ? "" : "line-clamp-4"
        }`}
      >
      {desc}
      </p>
      <button
        onClick={toggleDescription}
        className=" capitalize font-roboto  mt-10 border-t-2 border-slate-200 w-full text-red-600 text-2xl flex items-center justify-center gap-2 py-3"
      >
        {isExpanded ? (
          <>
            show less <IoIosArrowUp size={"30px"} />{" "}
          </>
        ) : (
          <>
            {" "}
            show more <IoIosArrowDown size={"30px"} />{" "}
          </>
        )}
      </button>
    </div>
  );
}

export default PropertyDescription;
