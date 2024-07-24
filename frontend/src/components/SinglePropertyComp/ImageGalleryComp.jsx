import React, { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import ReactModal from 'react-modal';
import { Modal as NewModal, Button } from 'flowbite-react';
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "../../configue";
import {
  getTokenFromLocalStorage,
  refreshAccessToken,
  removeRefreshTokenFromLocalStorage,
  removeTokenFromLocalStorage,
} from "../../token";
import {
  addPropertyToFavourite,
  removePropertyFromFavourite,
} from "../../features/favourite.slice";
import { logOutSuccess } from "../../features/user.slice";
import { clearStateOfUser } from "../../features/userProperty.slice";
import { useNavigate } from "react-router-dom";

// Set the app element
ReactModal.setAppElement("#root");
import "../../styles/SingleProperty.css";
import "react-image-gallery/styles/css/image-gallery.css";

function ImageGalleryComp({ propertyData, category }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.user);

  // store props property data 
  const[newPropertyData,setNewPropertyData]=useState(propertyData)

  useEffect(()=>{
setNewPropertyData(propertyData)
  },[])

  const dispatch = useDispatch();
  const token = getTokenFromLocalStorage();
  const navigate = useNavigate();

  const openModal = () => {
    setModalIsOpen(true);
  };

  // console.log('isFavorite',isFavorite)
  const closeModal = () => {
    setModalIsOpen(false);
  };

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
      console.log(result)
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
            alert("session expired please do login again");
            navigate("/login");
          }

          return;
        }
        setError(result.message);
        return;
      }

      setIsFavorite(false)
      // dispatch(removePropertyFromFavourite(result.newproperty._id));
      // setNewPropertyData(result.newproperty)
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
      // console.log(result)
      if (!resp.ok) {
        setError(result.message);
        return;
      }

      setIsFavorite(false)
      dispatch(removePropertyFromFavourite(result.newproperty._id));
      setNewPropertyData(result.newproperty)
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
      console.log(result)
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
            alert("session expired please do login again");
            navigate("/login");
          }

          return;
        }
        setError(result.message);
        return;
      }

      setIsFavorite(true)

      // dispatch(addPropertyToFavourite(result.updatedProperty));
      // setNewPropertyData(result.updatedProperty)
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
      setIsFavorite(true)
      dispatch(addPropertyToFavourite(result.updatedProperty));
      setNewPropertyData(result.updatedProperty)
    } catch (error) {
      console.log("adding favourite failed", error);
      setError(error.message);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const handleLogin = () => {
    navigate("/login");
  };
  const handleFavourite = (id) => {
    if (!user) return setIsOpen(true);
   isFavorite ? removeToFavourite(id) : addToFavourite(id)
  };

  const firstThree = newPropertyData?.images?.slice(0, 3); // Get the first three objects
  const remainingCount = newPropertyData?.images?.length - firstThree?.length; // Calculate the remaining count
  return (

    
      newPropertyData && (
        <div className="image-gallery-wrapper">
          <div className="image-preview image-preview-large">
            <div className="image-preview-header">
              <button className="photos-button" onClick={openModal}>
                Photos
              </button>
              <button
                className="favorite-button"
                onClick={() => handleFavourite(newPropertyData._id)}
              >
                <span
                  className={`heart-icon ${isFavorite ?  'favorite':''} `}
                >
                  {/* class name favorite */}
                  &#x2764;
                </span>
                {
                  
                  " Add to favorite"}
              </button>
            </div>
            <img src={firstThree[0]} alt="Property" />
          </div>
          <div className="image-preview">
            <img src={firstThree[1]} alt="Property" />
          </div>
          <div className="image-preview relative">
            <img src={firstThree[2]} alt="Property" />
            {remainingCount > 0 && (
              <div className="overlay cursor-pointer" onClick={openModal}>
                <span className="overlay-text sm:text-2xl text-xl">{`+${remainingCount} more`}</span>
              </div>
            )}
          </div>
          {isOpen && (
            <NewModal show={isOpen} onClose={handleClose}>
              <NewModal.Header>Login Required</NewModal.Header>
              <NewModal.Body>
                <div className="space-y-6">
                  <p className="text-base leading-relaxed text-gray-500">
                    You need to log in to access this feature. Please log in or
                    continue without logging in.
                  </p>
                </div>
              </NewModal.Body>
              <NewModal.Footer>
                <Button onClick={handleLogin}>Login</Button>
                <Button color="gray" onClick={handleClose}>
                  Not Now
                </Button>
              </NewModal.Footer>
            </NewModal>
          )}
          {/* React Modal for Image Gallery */}
          <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal}>
            <button onClick={closeModal}>Close</button>
            <div
              style={{ maxWidth: '100%', maxHeight: '100%', overflow: 'hidden' }}
            >
              <ImageGallery
                items={newPropertyData.images.map((image) => ({
                  original: image,
                  originalClass: 'modal-image',
                }))}
                showPlayButton={false} // Optional: Hide play button
                showThumbnails={false} // Optional: Hide thumbnail navigation
              />
            </div>
          </ReactModal>
        </div>
      )
    
    
   
  );
}

export default ImageGalleryComp;
