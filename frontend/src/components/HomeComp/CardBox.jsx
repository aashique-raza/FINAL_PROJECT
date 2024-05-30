import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../../styles/Home.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const images = [
  "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1110562/pexels-photo-1110562.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=600",
];

function CardBox() {
  // Convert image URLs to the format required by react-image-gallery
  const galleryImages = images.map((url) => ({
    original: url,
    thumbnail: url, // Use the same URL for thumbnail for simplicity
  }));

  // Custom render function for right arrow
  const renderRightNav = (onClick, disabled) => (
    <div className="right-nav-wrapper">
      <IoIosArrowForward
        size={"40px"}
        color="gray"
        onClick={onClick}
        disabled={disabled}
        cursor={'pointer'}
      />
    </div>
  );

  const renderLeftNav = (onClick, disabled) => (
    <div className="left-nav-wrapper">
      <IoIosArrowBack
        size={"40px"}
        color="gray"
        onClick={onClick}
        disabled={disabled}
        cursor={'pointer'}
      />
    </div>
  );

  return (
    <div className="home-cardbox">
      <div className="cardbox-image-gallery">
        <ImageGallery
          items={galleryImages}
          showThumbnails={false}
          autoPlay={true}
          slideInterval={3000} // 3 seconds interval
          renderRightNav={renderRightNav}
          renderLeftNav={renderLeftNav}
        />
      </div>
      <div className="cardbox-details">{/* Add your card details here */}</div>
    </div>
  );
}

export default CardBox;
