import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../../styles/Home.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {Link,NavLink} from 'react-router-dom'

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
        cursor={"pointer"}
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
        cursor={"pointer"}
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
      <div className="cardbox-details">
        <NavLink className=" w-full block bg-transparent text-red-600 hover:underline ">
          <h2 className=" capitalize text-2xl sm:text-3xl font-roboto font-medium ">
            2 <span className=" uppercase">BHK</span> flat in gurgao{" "}
          </h2>
          <p className=" capitalize text-sm md:text-xl   font-medium  font-roboto md:mt-2 mt-1">
            {" "}
            sector 56 badhsah pur , gurgoan{" "}
          </p>
        </NavLink>
        <div className=" flex justify-between items-center mt-3">
          <p className=" capitalize text-xl sm:text-2xl font-medium font-mono">
            rent <span className=" font-bold">50,000/m</span>{" "}
          </p>
          <p className=" capitalize text-xl sm:text-2xl font-medium font-mono">
            deposit <span className=" font-bold">50,000</span>{" "}
          </p>
        </div>
        <div className=" flex justify-between items-center mt-4">
          <h3 className=" capitalize font-roboto font-light sm:font-medium text-xl sm:text-2xl">
            {" "}
            room sharing: <span className="  font-extrabold sm:font-bold"> single </span>{" "}
          </h3>
          <h3 className=" capitalize font-roboto font-light sm:font-medium text-xl sm:text-2xl">
            food facility: <span className=" font-extrabold sm:font-bold "> yes </span>{" "}
          </h3>
        </div>

        <div className=" flex items-center justify-between flex-wrap mt-7 ">
          <h4 className=" flex-grow px-3  border-r-2 border-gray-500 font-medium font-roboto sm:text-xl text-sm uppercase  tracking-wider">
            {" "}
            3 bedro0m
          </h4>
          <h4 className=" flex-grow px-3 border-r-2 border-gray-500  font-medium  font-roboto sm:text-xl text-sm uppercase  tracking-wider">
            {" "}
            2 bathroom{" "}
          </h4>
          <h4 className=" flex-grow px-3 font-roboto border-gray-500  font-medium sm:text-xl text-sm uppercase  tracking-wider">
            200 sqrft{" "}
          </h4>
        </div>
        <div className=" border-b-2 border-t-2 border-gray-500 flex justify-between items-center py-4 mt-10">

          <div className=" flex  justify-start gap-3 items-center">
            <div className=" w-14 h-14 rounded-full overflow-hidden">
              <img src="https://images.pexels.com/photos/7230242/pexels-photo-7230242.jpeg?auto=compress&cs=tinysrgb&w=600" className=" h-full w-full object-cover" alt="" />
            </div>
            <div className=" flex flex-col gap-1 items-start">
              <h3 className=" capitalize font-roboto font-bold text-xl sm:text-2xl">alex adem</h3>
              <p className=" capitalize text-sm sm:text-xl font-roboto  font-medium">property owner</p>
            </div>
          </div>
          <button className=" capitalize tracking-wider text-sm sm:text-xl md:2xl cursor-pointer px-5 py-3 sm:px-6  sm:py-4 bg-red-600 hover:bg-red-800 text-white transition-all duration-75 ease-out">
                owner details
          </button>

        </div>
      </div>
    </div>
  );
}

export default CardBox;
