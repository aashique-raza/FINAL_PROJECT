import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "../../styles/Home.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link, NavLink } from "react-router-dom";
import GetOwnerDetailsBUtton from "../GetOwnerDetailsBUtton";

const images = [
  "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/1110562/pexels-photo-1110562.jpeg?auto=compress&cs=tinysrgb&w=600",
  "https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=600",
];

function CardBox({ data }) {
  // console.log("data0", data);

  // Convert image URLs to the format required by react-image-gallery
  const galleryImages = data.images.map((url) => ({
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
        <NavLink to={`property/${data.BHKType ? 'rental' :'pg'}/${data._id}`} className=" w-full block bg-transparent text-red-600 hover:underline ">
          {data.BHKType && (
            <h2 className="capitalize text-xl sm:text-3xl font-roboto font-medium">
              {data.BHKType === "1bhk" && "1 "}
              {data.BHKType === "2bhk" && "2 "}
              {data.BHKType === "3bhk" && "3 "}
              {data.BHKType === "4bhk" && "4 "}
              {data.BHKType === "4bhk+" && "4+ "}
              <span className="uppercase">
                {data.BHKType === "1rk" ? "1 RK " : "BHK "}
              </span>
              {data.apartmentType}
              {data.apartmentType === "apartment"
                ? data.apartmentName
                : ""} in {data.location.city}
            </h2>
          )}

          {data.roomSharing && (
            <h2 className=" capitalize text-xl sm:text-3xl font-roboto font-medium ">
              {" "}
              {data.roomSharing} sharing room in {data.pgOrHostelName}
            </h2>
          )}
          <p className=" capitalize text-sm md:text-xl   font-medium  font-roboto md:mt-2 mt-1">
            {" "}
            {data.location.localAddress},{data.location.city}
          </p>
        </NavLink>
        <div className=" flex justify-between items-center mt-3">
          <p className=" capitalize text-xl sm:text-2xl font-medium font-mono">
            rent <span className=" font-bold">{data.rentAmount}/m</span>{" "}
          </p>
          <p className=" capitalize text-xl sm:text-2xl font-medium font-mono">
            deposit <span className=" font-bold">{data.depositAmount}</span>{" "}
          </p>
        </div>
        {data.roomSharing && (
          <div className=" flex justify-between items-center mt-4">
            <h3 className=" capitalize font-roboto font-light sm:font-medium text-xl sm:text-2xl">
              {" "}
              available for:
              <span className="  font-extrabold sm:font-bold"> </span>
              {data.availableFor}
            </h3>
            <h3 className=" capitalize font-roboto font-light sm:font-medium text-xl sm:text-2xl">
              food facility:{" "}
              <span className=" font-extrabold sm:font-bold ">
                {" "}
                {data.foodAvaibility === true ? "yes" : "no"}{" "}
              </span>{" "}
            </h3>
          </div>
        )}

        {data.BHKType && (
          <div className=" flex items-center justify-between flex-wrap mt-7 ">
            <h4 className=" flex-grow px-3  border-r-2 border-gray-500 font-medium font-roboto sm:text-xl text-sm uppercase  tracking-wider">
              {" "}
              {data.bedroom} bedroom
            </h4>
            <h4 className=" flex-grow px-3 border-r-2 border-gray-500  font-medium  font-roboto sm:text-xl text-sm uppercase  tracking-wider">
              {data.bathroom ? data.bathroom : 0} bathroom{" "}
            </h4>
            <h4 className=" flex-grow px-3 font-roboto border-gray-500  font-medium sm:text-xl text-sm uppercase  tracking-wider">
              {data.builtUpArea} sqrft{" "}
            </h4>
          </div>
        )}

        <div className=" border-b-2 border-t-2 border-gray-500 flex justify-between items-center py-4 mt-10">
          <div className=" flex  justify-start gap-3 items-center">
            <div className=" w-14 h-14 rounded-full overflow-hidden">
              <img
                src={data.owner.profileImage}
                className=" h-full w-full object-cover"
                alt=""
              />
            </div>
            <div className=" flex flex-col gap-1 items-start">
              <h3 className=" capitalize font-roboto font-bold text-xl sm:text-2xl">
                {data.owner.firstName}
              </h3>
              <p className=" capitalize text-sm sm:text-xl font-roboto  font-medium">
                property owner
              </p>
            </div>
          </div>
          <GetOwnerDetailsBUtton data={data} category={data.roomSharing ? 'pg' :'rental'}  fontsize={'14px'}/>
        </div>
      </div>
    </div>
  );
}

export default CardBox;
