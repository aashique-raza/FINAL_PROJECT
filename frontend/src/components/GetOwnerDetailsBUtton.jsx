import React, { useState } from "react";
import { Modal, Button } from "flowbite-react";
import { useSelector,useDispatch } from "react-redux";
import { getTokenFromLocalStorage,removeRefreshTokenFromLocalStorage,removeTokenFromLocalStorage } from "../token";
import { clearStateOfUser } from "../features/userProperty.slice";
import { logOutSuccess } from "../features/user.slice";
import OwnerDetailsModal from "./OwnerDetailsModal";

import { API_URL } from "../configue";
// import { getTokenFromLocalStorage } from "../token";


function GetOwnerDetailsBUtton({ width = "", padding = "", margin = "",data,category,fontsize='' }) {
  const [isModelOpen, setModalOPen] = useState(false);
  const[responseStatus,setResponseStatus]=useState('')
  const {user}=useSelector(state=>state.user)
  const [loading,setLoading]=useState(false)
  const[error,setError]=useState(null)
  const[successMsg,setSuccessMsg]=useState(null)

  const getOwnerDetailsForLoggedInUser = async (
    propertyId,
    categoryData,
    userId
  ) => {
   
    const token = getTokenFromLocalStorage();
  
    // console.log("logged in user hai");
    // console.log(propertyId, categoryData, userId);
  
    try {
      setLoading(true)
      setError(null)
      const resp = await fetch(
        `${API_URL}/user/getOwnerDetails/${userId}/${propertyId}/${categoryData}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );
  
      const result = await resp.json();
      //   console.log(result)
      if (!resp.ok) {
        if (resp.status === 401) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            // Retry original request with new token
            const data = await getOwnerdetailsWithToken(
              newToken,
              propertyId,
              categoryData,
              userId
            );
            return data;
          } else {
            removeTokenFromLocalStorage();
            removeRefreshTokenFromLocalStorage();
            dispatch(logOutSuccess());
      
            dispatch(clearStateOfUser());
            alert("session expired! please login");
          }
          return
  
         
        }
        setError(result.message)
        setLoading(false)
        return 
      }
      setLoading(false)
      setError(null)
      setSuccessMsg(result.msg)
    } catch (error) {
      setLoading(false)
      setError('please try again later')
      console.log("get owner details failed", error);
      
    }
  };
  
  const getOwnerdetailsWithToken = async (
    newToken,
    propertyId,
    categoryData,
    userId
  ) => {
    try {
      setError(null)
      setLoading(true)
      const resp = await fetch(
        `${API_URL}/user/getOwnerDetails/${userId}/${propertyId}/${categoryData}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${newToken}`,
          },
          credentials: "include",
        }
      );
  
      const result = await resp.json();
      //   console.log(result)
      if (!resp.ok) {
        setError(result.message)
      setLoading(false)
        return ;
      }
      setError(null)
      setLoading(false)
      setSuccessMsg(result.msg)
      
    } catch (error) {
      setError('please try gain later')
      setLoading(false)
      console.log("get owner details failed", error);
      return error.message;
    }
  };

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
      
    }
  };

 

  return (
    <div>
      <button
        style={(width = { width })}
        onClick={() => openOwnerDetailsModal()}
        className=" focus:ring-0 border-none outline-none  w-48 lg:w-56 px-3 py-2 lg:py-5 rounded-sm   bg-red-600 text-white capitalize text-xl font-bold xl:text-2xl font-roboto "
      >
        {
          loading ? 'sending owner details...' :"get owner details"
        }
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
      {error && (
        <p className=" capitalize text-xl font-bold font-roboto text-red-600">
          {error}
        </p>
      )}

      {
        successMsg && (
          <p className=" capitalize text-xl font-bold font-roboto text-green-600">
          {successMsg}
        </p>
        )
      }
    </div>
  );
}

export default GetOwnerDetailsBUtton;
