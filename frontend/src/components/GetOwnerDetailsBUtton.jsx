import React, { useState } from "react";
import { Modal, Button } from "flowbite-react";
import { useSelector,useDispatch } from "react-redux";
import { getTokenFromLocalStorage } from "../token";
import OwnerDetailsModal from "./OwnerDetailsModal";
import getOwnerDetailsForLoggedInUser from "../utility";


function GetOwnerDetailsBUtton({ width = "", padding = "", margin = "",data,category,fontsize='' }) {
  const [isModelOpen, setModalOPen] = useState(false);
  const[responseStatus,setResponseStatus]=useState('')
  const {user}=useSelector(state=>state.user)

  const openOwnerDetailsModal = async (id) => {
    // alert(id)
    // console.log(user)
    setResponseStatus("");
    if (!user) {
      setModalOPen(!isModelOpen);
    } else {
      const response = await getOwnerDetailsForLoggedInUser(
        data._id,
        category,
        user._id
      );
      setResponseStatus(response);
    }
  };

 

  return (
    <div>
      <button
        style={(width = { width })}
        onClick={() => openOwnerDetailsModal()}
        className=" focus:ring-0 border-none outline-none  w-3/4 px-12 py-4 bg-red-600 text-white capitalize text-2xl font-roboto "
      >
        get owner details
      </button>
      {isModelOpen && (
        <OwnerDetailsModal
          isOpen={isModelOpen}
          setModalOPen={setModalOPen}
          onClose={() => setModalOPen(false)}
          id={data._id}
          dataCategory={category}
        />
      )}
      {responseStatus && (
        <p className=" capitalize text-xl font-bold font-roboto">
          {responseStatus}
        </p>
      )}
    </div>
  );
}

export default GetOwnerDetailsBUtton;
