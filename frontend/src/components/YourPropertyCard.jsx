import React, { useState } from "react";
import "../styles/YourProperty.css";
import { API_URL } from "../configue";
import { LuArrowUpRightSquare } from "react-icons/lu";
import { LuIndianRupee } from "react-icons/lu";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button } from "flowbite-react";
import { useSelector,useDispatch } from "react-redux";
import { getTokenFromLocalStorage } from "../token";
// import { propertyActivated } from "../features/userProperty.slice";
import { deleteUserProperty,changeStatusOfProperty } from "../features/userProperty.slice";

function YourPropertyCard({ showSuccessMessage, property }) {
  const [modal, setModal] = useState(false);
  const { user } = useSelector((state) => state.user);
  // const{activeProperty}=useSelector((state)=>state.activeProperty)
  const token = getTokenFromLocalStorage();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch=useDispatch()

  const [propertyActivate, setPropertyActivate] = useState(false);
  const [activateCompleted, setActivateCompleted] = useState(false);

  const handleDeleteProperty = async (cat, id) => {
    // console.log(cat,id)
    // alert('working...',)
    let url;
    if (cat === "pg") {
      url = `${API_URL}/pg/propertyDelete/${id}/${user._id}`;
    } else {
      url = `${API_URL}/rent/propertyDelete/${id}/${user._id}`;
    }

    // console.log('url',url)

    try {
      setError(null);
      setLoading(true);

      const resp = await fetch(url, {
        method: "DELETE",
        headers: {
          // "Content-Type": "multipart/form-data"// JSON format mein Content-Type header set kiya gaya hai
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      const result = await resp.json();
      // console.log(result)

      if (!resp.ok) {
        setError(result.message);
        setLoading(false);
        return;
      }

      dispatch(deleteUserProperty(id))
      setModal(false);
      showSuccessMessage("deleted successfully!");
    } catch (error) {
      console.log("delete property failed", error);
      setError(error.message);
      setModal(false);
    }
  };

  const handlePropertyActivation = async (cat, id) => {
    // console.log(cat,id)
    let url;
    if (cat === "pg") {
      url = `${API_URL}/pg/activateProperty/${id}/${user._id}`;
      // /activateProperty/:propertyId/:userid
    } else {
      url = `${API_URL}/rent/activateProperty/${id}/${user._id}`;
    }

    // console.log('url',url)

    try {
      setError(null);
      setLoading(true);
      // setActivateCompleted(false)

      const resp = await fetch(url, {
        method: "PATCH",
        headers: {
          // "Content-Type": "multipart/form-data"// JSON format mein Content-Type header set kiya gaya hai
          Authorization: `Bearer ${token}`,
        },
        credentials: "include",
      });

      const result = await resp.json();
      // console.log(result)

      if (!resp.ok) {
        setError(result.message);
        setLoading(false);
        
        return;
      }

      setPropertyActivate(false);
      dispatch(changeStatusOfProperty(id))
      setActivateCompleted(true)
      
      activateCompleted?showSuccessMessage(result.msg):showSuccessMessage(result.msg)
      

    } catch (error) {
      console.log("activate property failed", error);
      setError(error.message);
      setPropertyActivate(false);
    }
  };

  return (
    <div className="your-property-card shadow-xl hover:shadow-2xl transition-all duration-100 ease-in">
      <div className="flex justify-end items-center">
        <button
          onClick={() => setPropertyActivate(true)}
          className={`py-3 px-6 sm:py-4 lg:px-13 capitalize text-sm sm:text-xl lg:text-2xl tracking-wider ${
            property.isPropertyActive
              ? "bg-green-500 text-white"
              : "text-slate-700 bg-gray-100"
          }`}
        >
         {property.isPropertyActive?'active':'inactive'} 
        </button>
      </div>
      <div className=" mt-4">
        {property.BHKType && (
          <NavLink
            to={`/property/rental/${property._id}`}
            className=" hover:text-red-600 hover:underline transition-all ease-in-out duration-150 font-bold flex-shrink flex justify-start items-center gap-1 text-slate-800 bg-transparent capitalize text-xl  lg:text-2xl  font-roboto font"
          >
            {property.BHKType === "1bhk" && "1 "}
            {property.BHKType === "2bhk" && "2 "}
            {property.BHKType === "3bhk" && "3 "}
            {property.BHKType === "4bhk" && "4 "}
            {property.BHKType === "4bhk+" && "4+ "}{" "}
            {property.BHKType === "1rk" ? "1 RK " : " BHK "}{" "}
            {property.apartmentType === "apartment" ? "flat" : "house"} for rent
            in
            {property.location.city}
            <span>
              {" "}
              <LuArrowUpRightSquare className=" inline-block" />{" "}
            </span>
          </NavLink>
        )}
        {property.roomSharing && (
          <NavLink
            to={`/property/pg/${property._id}`}
            className="hover:text-red-600 hover:underline transition-all ease-in-out duration-150 font-bold flex-shrink flex justify-start items-center gap-1 text-slate-800 bg-transparent capitalize text-xl  lg:text-2xl xl:text-3xl font-roboto font"
          >
            {property.roomSharing} room sharing in {property.pgOrHostelName}, in{" "}
            {property.location.city}
            <span>
              {" "}
              <LuArrowUpRightSquare className=" inline-block" />{" "}
            </span>
          </NavLink>
        )}

        <p className=" capitalize my-2 text-sm sm:text-xl  font-sans  font-bold text-gray-600">
          {property.location.localAddress} <span>{property.location.city}</span>{" "}
        </p>
      </div>
      <div className=" my-8 flex items-center lg:gap-12 md:gap-9  gap-6">
        <p className=" capitalize flex items-center gap-3 font-sans tracking-wide font-semibold">
          rent{" "}
          <span className=" font-extrabold">
            {" "}
            <LuIndianRupee className=" inline-block" />
            {property.rentAmount}/m
          </span>{" "}
        </p>
        <h4 className=" capitalize tracking-wider font-semibold font-roboto">
          {property.location.city}
        </h4>
      </div>
      <div className=" flex justify-between items-center mb-10">
        <NavLink
          to={`/edit-property/${property.roomSharing ? "pg" : "rental"}/${
            property._id
          }`}
          className="  tracking-wider flex justify-center items-start gap-1 lowercase  font-raleway text-xl sm:text-2xl px-5 py-3 bg-gray-200 text-teal-800 "
        >
          {" "}
          edit <MdEdit className=" inline-block text-green-700   mt-1" />{" "}
        </NavLink>
        <button
          onClick={() => setModal(true)}
          className=" tracking-wider flex justify-center items-start gap-1 lowercase  font-raleway text-xl sm:text-2xl px-5 py-3 bg-gray-200 text-teal-800 "
        >
          {" "}
          delete <MdDelete className=" inline-block  text-red-500   mt-1" />{" "}
        </button>
      </div>
      <div className=" flex justify-start items-start px-3 w-full">
        <h3 className=" font-bold w-full border-t-2 capitalize text-xl sm:text-xl lg:text-2xl  font-serif tracking-wider py-4 sm:py-6 md:py-9 lg:py-14  ">
          0 contated
        </h3>
      </div>
      {modal && (
        <Modal show={modal} size="md" onClose={() => setModal(false)} popup>
          <Modal.Header />
          <Modal.Body>
            <div className="text-center">
              <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                Are you sure you want to delete this property?
              </h3>
              <div className="flex justify-center gap-4">
                <Button
                  color="failure"
                  onClick={() => {
                    let category = property.roomSharing ? "pg" : "rental";
                    handleDeleteProperty(category, property._id);
                  }}
                >
                  {"Yes, I'm sure"}
                </Button>
                <Button color="gray" onClick={() => setModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
     {propertyActivate && (
  <Modal
    show={propertyActivate}
    size={window.innerWidth >= 768 ? 'lg' : 'md'}
    onClose={() => setPropertyActivate(false)}
    popup
  >
    <Modal.Header />
    <Modal.Body>
      <div className="text-center">
        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
          Are you sure you want to {property.isPropertyActive ? 'deactivate' : 'activate'} this property?
        </h3>
        <div className="flex justify-center gap-4">
          <Button
          size="lg"
            className="text-xl md:text-2xl font-bold font-roboto py-2 px-4 md:py-3 md:px-6"
            color="failure"
            onClick={() => {
              let category = property.roomSharing ? "pg" : "rental";
              handlePropertyActivation(category, property._id);
            }}
          >
            Yes, {property
            .isPropertyActive ? 'deactivate' : 'activate'}
          </Button>
          <Button
          size="lg"
            className="text-xl md:text-2xl font-roboto font-bold py-2 px-4 md:py-3 md:px-6"
            color="gray"
            onClick={() => setPropertyActivate(false)}
          >
            Not Now
          </Button>
        </div>
      </div>
    </Modal.Body>
  </Modal>
)}

    </div>
  );
}

export default YourPropertyCard;
