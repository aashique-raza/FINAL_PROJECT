import React, { useEffect, useState } from "react";
import CardComp from "./CardComp";

import { getTokenFromLocalStorage,refreshAccessToken } from "../token";
import { API_URL } from "../configue";
import { useSelector, useDispatch } from "react-redux";
import { ThreeDots } from "react-loader-spinner";
import {
  startfetchingUserFavouriteProperties,
  fetchedSuccessfullyUserProperties,
  fetchingFailedUserProperties,
  clearStateUserFavouriteProperty
} from "../features/favourite.slice";

// favouriteProperty
function FavouritePropperty() {
 
  const token = getTokenFromLocalStorage();
  const { user } = useSelector((state) => state.user);
  const { favouriteProperty,loading,error } = useSelector((state) => state.favouriteProperty);

  const dispatch = useDispatch();
  // /addFavorite/:userId"
  // const { userId } = req.params;
  // const { propertyId, propertyType } = req.body;

  const getFavouriteProperty = async () => {
    try {
      dispatch(startfetchingUserFavouriteProperties())
      
      const resp = await fetch(`${API_URL}/user/getFavorites/${user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // JSON format mein Content-Type header set kiya gaya hai
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await resp.json();
      console.log('result',result)

      if (!resp.ok) {
        if (resp.status === 401) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            // Retry original request with new token
            await getFavouriteWithToken(newToken);
          } else {
            dispatch(fetchingFailedUserProperties('Failed to refresh access token'))
            setError("Failed to refresh access token");
          }

          return;
        }
       dispatch(fetchingFailedUserProperties(result.message))
        return;
      }

      dispatch(fetchedSuccessfullyUserProperties(result.favorites))
    } catch (error) {
      dispatch(fetchingFailedUserProperties('please try again later!'))
      console.log("fetching favourite property failed", error);
    }
  };

  useEffect(() => {
    getFavouriteProperty();
  }, []);


  const getFavouriteWithToken=async(newToken)=>{
    try {
      dispatch(startfetchingUserFavouriteProperties())
      
      const resp = await fetch(`${API_URL}/user/getFavorites/${user._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // JSON format mein Content-Type header set kiya gaya hai
          Authorization: `Bearer ${newToken}`,
        },
      });
      const result = await resp.json();

      if (!resp.ok) {
        
       dispatch(fetchingFailedUserProperties(result.message))
        return;
      }

      dispatch(fetchedSuccessfullyUserProperties(result.favorites))
    } catch (error) {
      dispatch(fetchingFailedUserProperties('please try again later!'))
      console.log("fetching favourite property failed", error);
    }

  }

  // console.log(loading);
  if (loading) {
    <div className="flex justify-center items-center bg-white py-4 w-full">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="red"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>;
  }
  if (error) {
    <div className="flex justify-center items-center bg-white py-4">
      <h1 className="capitalize font-bold font-roboto text-sm sm:text-xl md:text-2xl tracking-wider text-red-400">
        {error}
      </h1>
    </div>;
    return;
  }

  return (
    <div className=" bg-white flex flex-wrap justify-start  items-start  py-3 xl:px-2 gap-3 w-full">
      {favouriteProperty?.length === 0 ? (
        <h1 className=" px-3 capitalize text-red-500 text-xl md:text-2xl lg:text-3xl font-bold font-roboto tracking-wider">
          you don't have favourite property !
        </h1>
      ) : (
        favouriteProperty !== null && 
        favouriteProperty?.map((fav) => (
          <CardComp key={fav?._id} data={fav} typeOfProperty={true} userFavouriteProperties={true} />
        ))

      )}
    </div>
  );
}

export default FavouritePropperty;

