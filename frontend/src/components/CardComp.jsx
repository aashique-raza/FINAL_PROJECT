import React, { useState, useEffect } from "react";
import "../styles/CardComp.css";
import { Link } from "react-router-dom";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import ImageSLiderComp from "./ImageSLiderComp";
import FacilityItem from "./FacilityItem";
import { FaHeart, FaKey, FaFemale } from "react-icons/fa";

// clock
import AccessTimeIcon from "@mui/icons-material/AccessTime";
// food
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { useLocation } from "react-router-dom";

import HomeIcon from "@mui/icons-material/Home";
import WeekendIcon from "@mui/icons-material/Weekend";

import { useDispatch, useSelector } from "react-redux";
// import getOwnerDetailsForLoggedInUser from "../utility";
import {
  addPropertyToFavourite,
  removePropertyFromFavourite,
} from "../features/favourite.slice";
import { API_URL } from "../configue";
import { Modal, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { getTokenFromLocalStorage, refreshAccessToken,removeRefreshTokenFromLocalStorage,removeTokenFromLocalStorage } from "../token";
import GetOwnerDetailsBUtton from "./GetOwnerDetailsBUtton";

// MonetizationOnOutlined

function CardComp({
  data,
  typeOfProperty = false,
  showSuccessMessage,
  handleFavouriteProperty,
  userFavouriteProperties = false,
}) {
  const location = useLocation();
  const [category, setCategory] = useState(null);
  // console.log(category);

  const { favouriteProperty } = useSelector((state) => state.favouriteProperty);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const token = getTokenFromLocalStorage();
  const [userFavouriteProperty, setUserFavouriteProperty] = useState(false);
  const[tempIsFav,setTempIsFav]=useState(false)

  const [newPropertyData, setNewPropertyData] = useState(data);
  useEffect(() => {
    setNewPropertyData(data);
  }, []);

  const { user } = useSelector((state) => state.user);
  // console.log('property type',data.propertyType)

  useEffect(() => {
    const path = location.pathname; // Yaha se pura path mil jayega, jaise "/search/:category"
    const category = path.split("/")[2]; // Yaha se category ke value ko extract kiya jata hai
    // console.log(category)
    if (typeOfProperty) {
      setCategory(data.roomSharing ? "pg" : "rental");
    } else {
      setCategory(category);
    }
  }, [location.pathname]);

  function extractDate(isoString) {
    // Create a new Date object from the ISO string
    const date = new Date(isoString);

    // Extract the month, date, and year from the Date object
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are zero-based
    const day = date.getUTCDate().toString().padStart(2, "0");
    const year = date.getUTCFullYear();

    // Format the date as MM/DD/YYYY
    return `${month}/${day}/${year}`;
  }

  const removeToFavourite = async (propertyId) => {
    try {
      setError(null);
      const resp = await fetch(
        `${API_URL}/user/removeFromeFavrouiteList/${user._id}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json", // JSON format mein Content-Type header set kiya gaya hai
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ propertyId, category }),
        }
      );
      const result = await resp.json();
      console.log(result);
      if (!resp.ok) {
        if (resp.status === 401) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            // Retry original request with new token
            await handleRemoveFavouriteWithToken(newToken, propertyId);
          } else {
            removeTokenFromLocalStorage();
            removeRefreshTokenFromLocalStorage();
            dispatch(logOutSuccess());
      
            dispatch(clearStateOfUser());
            alert("session expired! please login");
          }

          return;
        }
        setError(result.message);
        return;
      }

      if (!userFavouriteProperties) {
        handleFavouriteProperty(result.updatedProperty);
        showSuccessMessage("remove from favourite");
      }else{
        console.log(result.updatedProperty._id)
        dispatch(removePropertyFromFavourite(result.updatedProperty._id))
      }
      setUserFavouriteProperty(false)
      

      setError(null);
    } catch (error) {
      console.log("removing favourite failed", error);
      setError("please try again later");
    }
  };

  const handleRemoveFavouriteWithToken = async (newToken, propertyId) => {
    try {
      setError(null);
      const resp = await fetch(
        `${API_URL}/user/removeFromeFavrouiteList/${user._id}`,
        {
          method: "delete",
          headers: {
            "Content-Type": "application/json", // JSON format mein Content-Type header set kiya gaya hai
            Authorization: `Bearer ${newToken}`,
          },
          body: JSON.stringify({ propertyId, category }),
        }
      );
      const result = await resp.json();
      console.log(result);
      if (!resp.ok) {
        setError(result.message);
        return;
      }

      if (!userFavouriteProperties) {
        handleFavouriteProperty(result.updatedProperty);
        showSuccessMessage("remove from favourite");
      }else{
        dispatch(removePropertyFromFavourite(result.updatedProperty._id))
      }
      setUserFavouriteProperty(false)

     

      setError(null);
    } catch (error) {
      console.log("removing favourite failed", error);
      setError("please try again later");
    }
  };

  const addToFavourite = async (propertyId) => {
    try {
      setError(null);
      const resp = await fetch(`${API_URL}/user/addFavorite/${user._id}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json", // JSON format mein Content-Type header set kiya gaya hai
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ propertyId, category }),
      });
      const result = await resp.json();
      // console.log(result)
      if (!resp.ok) {
        if (resp.status === 401) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            // Retry original request with new token
            await handleAddToFavouriteWithToken(newToken, propertyId);
          } else {
            removeTokenFromLocalStorage();
            removeRefreshTokenFromLocalStorage();
            dispatch(logOutSuccess());
      
            dispatch(clearStateOfUser());
            alert("session expired! please login");
          }

          return;
        }
        setError(result.message);
        return;
      }
      // updatedProperty.
      // isPropertyFavorite
      if (!userFavouriteProperties) {
        handleFavouriteProperty(result.updatedProperty);
        showSuccessMessage("addedd to favourite");
      }
      setError(null);
      setUserFavouriteProperty(true)

      
    } catch (error) {
      console.log("adding favourite failed", error);
      setError(error.message);
    }
  };

  const handleAddToFavouriteWithToken = async (newToken, propertyId) => {
    try {
      setError(null);
      const resp = await fetch(`${API_URL}/user/addFavorite/${user._id}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json", // JSON format mein Content-Type header set kiya gaya hai
          Authorization: `Bearer ${newToken}`,
        },
        body: JSON.stringify({ propertyId, category }),
      });
      const result = await resp.json();
      // console.log(result)
      if (!resp.ok) {
        setError(result.message);
        return;
      }
      // updatedProperty.
      // isPropertyFavorite

      if (!userFavouriteProperties) {
        handleFavouriteProperty(result.updatedProperty);
        showSuccessMessage("addedd to favourite");
      }
     
      setError(null);
      setUserFavouriteProperty(true)
    } catch (error) {
      console.log("adding favourite failed", error);
      setError(error.message);
    }
  };
  const handleLogin = () => {
    navigate("/login");
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (user) {
      if (newPropertyData?.addFavoritesByUser?.length > 0) {
        const isFavorite = newPropertyData.addFavoritesByUser.some(
          (id) => id === user._id
        );
        // console.log('is favourite',isFavorite)
        setUserFavouriteProperty(isFavorite);
      } else {
        setUserFavouriteProperty(false);
      }
    }
  }, [user, newPropertyData]);

  const handleFavourite = (id) => {
    if (!user) return setIsOpen(true);
    userFavouriteProperty ? removeToFavourite(id) : addToFavourite(id);
  };

  return (
    newPropertyData && (
      <div className="card_container">
        <section className="card_heading_text py-6 px-5 ">
          <Link to={`/property/${category}/${newPropertyData._id}`}>
            <h2 className=" flex gap-2 items-center font-roboto  capitalize text-2xl text-gray-500  hover:underline hover:text-red-600">
              {category?.trim().toLowerCase() === "pg".trim()
                ? `PG for ${data.availableFor} in ${newPropertyData.location.city},${newPropertyData.location.state} `
                : `${newPropertyData.BHKType} flat in ${newPropertyData.apartmentName} for ${newPropertyData.propertyAvailableFor},in ${newPropertyData.location.city}`}
              <HiOutlineExternalLink />
            </h2>
          </Link>
          <p className=" capitalize text-gray-400 font-slab font-normal mt-3 text-xl">
            {category?.trim().toLowerCase() === "pg".trim()
              ? `${newPropertyData.location.localAddress},${newPropertyData.location.city}`
              : `${newPropertyData.location.localAddress},${newPropertyData.location.city}`}
          </p>
        </section>
        <section className="card_details_wrapper ">
          <div className="amount_wrapper flex  justify-evenly items-center  py-6 px-5">
            <div className="amount_wrapper_items w-1/4 flex-grow border-r-2 ">
              <h3 className=" justify-center flex items-center gap-2 font-mono font-normal  capitalize text-2xl ">
                <FaIndianRupeeSign />{" "}
                {category?.trim().toLowerCase() === "pg".trim()
                  ? `${newPropertyData.rentAmount}`
                  : `${newPropertyData.rentAmount}`}
              </h3>
              <p className=" text-center capitalize font-medium font-roboto mt-2 text-xl text-gray-400">
                rent amount
              </p>
            </div>
            <div className="amount_wrapper_items w-1/4 flex-grow border-r-2">
              <h3 className=" justify-center flex items-center gap-2 font-mono font-normal  capitalize text-2xl ">
                {" "}
                <FaIndianRupeeSign />{" "}
                {category?.trim().toLowerCase() === "pg".trim()
                  ? `${newPropertyData.depositAmount}`
                  : `${newPropertyData.depositAmount}`}
              </h3>
              <p className=" text-center capitalize font-medium font-roboto mt-2 text-xl text-gray-400">
                depost amount
              </p>
            </div>
            {category?.trim().toLowerCase() === "rental".trim() && (
              <div className="amount_wrapper_items w-1/4 flex-grow border-r-2">
                <h3 className=" justify-center flex items-center gap-2  font-slab font-normal  capitalize text-2xl ">
                  {newPropertyData.builtUpArea}
                  sqrft.
                </h3>
                <p className=" text-center capitalize font-medium font-roboto mt-2 text-xl text-gray-400">
                  built up area
                </p>
              </div>
            )}

            {category?.trim().toLowerCase() === "pg".trim() && (
              <div className="amount_wrapper_items w-1/4 flex-grow ">
                <h3 className=" justify-center flex items-center gap-2  font-slab font-normal  capitalize text-2xl ">
                  {newPropertyData.roomSharing}
                </h3>
                <p className=" text-center capitalize font-medium font-roboto mt-2 text-xl text-gray-400">
                  room type
                </p>
              </div>
            )}
          </div>
          <div className="card_image_wrapper py-3 px-5 flex gap-3 items-center justify-start border-red-500">
            <div className="image_slider md:w-full lg:w-1/2 ">
              <ImageSLiderComp imagesUrl={newPropertyData.images} />
            </div>
            <div className="facilities_box flex-1   flex flex-col gap-16 justify-start items-start">
              {category?.trim().toLowerCase() === "rental".trim() && (
                <div className="facilities_items px-1 flex flex-wrap  gap-1 py-1 border-2">
                  <FacilityItem
                    icon={<FaKey />}
                    type={"avaibility"}
                    name={extractDate(newPropertyData.availableFrom)}
                  />
                  <FacilityItem
                    icon={<HomeIcon />}
                    type={"apartment type"}
                    name={newPropertyData.apartmentType}
                  />

                  <FacilityItem
                    icon={<WeekendIcon />}
                    type={"furnishing"}
                    name={newPropertyData.furnishing}
                  />
                  <FacilityItem
                    icon={<FaFemale />}
                    type={"prefered tentas"}
                    name={newPropertyData?.preferedTenats[0]}
                  />
                </div>
              )}

              {category?.trim().toLowerCase() === "pg".trim() && (
                <div className="facilities_items px-1 flex flex-wrap  gap-1 py-1 border-2">
                  <FacilityItem
                    icon={<FaKey />}
                    type={"avaibility"}
                    name={newPropertyData.placeAvaibility}
                  />
                  <FacilityItem
                    icon={<AccessTimeIcon />}
                    type={"closing time"}
                    name={newPropertyData.doorClosingTime}
                  />

                  <FacilityItem
                    icon={<FastfoodIcon />}
                    type={"food facility"}
                    name={
                      newPropertyData.foodAvaibility === true ? "yes" : "no"
                    }
                  />
                  <FacilityItem
                    icon={<FaFemale />}
                    type={"prefered tentas"}
                    name={newPropertyData.availableFor}
                  />
                </div>
              )}

              <div className="get_owner_wrapper w-full flex  justify-between items-start ">
                <GetOwnerDetailsBUtton
                  width="200px"
                  data={newPropertyData}
                  category={category}
                />

                <div
                  onClick={() => handleFavourite(newPropertyData._id)}
                  className={` py-3 px-6 flex justify-center items-start  font-slab text-4xl border-2 cursor-pointer`}
                >
                  <FaHeart
                    className={`${
                       userFavouriteProperty  ? "text-red-600" : "text-slate-300"
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
          {isOpen && (
            <Modal show={isOpen} onClose={handleClose}>
              <Modal.Header>Login Required</Modal.Header>
              <Modal.Body>
                <div className="space-y-6">
                  <p className="text-base leading-relaxed text-gray-500">
                    You need to log in to access this feature. Please log in or
                    continue without logging in.
                  </p>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={handleLogin}>Login</Button>
                <Button color="gray" onClick={handleClose}>
                  Not Now
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </section>
      </div>
    )
  );
}

export default CardComp;
