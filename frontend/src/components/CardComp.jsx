import React, { useState } from "react";
import "../styles/CardComp.css";
import { Link } from "react-router-dom";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import ImageSLiderComp from "./ImageSLiderComp";
import FacilityItem from "./FacilityItem";
import { FaHeart } from "react-icons/fa";
import {
  FaUserFriends,
  FaFemale,
  FaMale,
  FaKey,
  FaClock,
} from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
// clock
import AccessTimeIcon from "@mui/icons-material/AccessTime";
// food
import FastfoodIcon from "@mui/icons-material/Fastfood";

// MonetizationOnOutlined

function CardComp() {
  const [isAddFavroute, setAddFavroute] = useState(false);

  const handleFavroute = () => {
    setAddFavroute(!isAddFavroute);
  };

  return (
    <div className="card_container">
      <section className="card_heading_text py-6 px-5 ">
        <Link>
          <h2 className=" flex gap-2 items-center font-roboto  capitalize text-2xl text-gray-500  hover:underline hover:text-red-600">
            3 BHK flat in delhi for rent <HiOutlineExternalLink />
          </h2>
        </Link>
        <p className=" capitalize text-gray-400 font-slab font-normal mt-3 text-xl">
          Opp AdityaCityCenter Ahinsa Khand 1, Indirapuram, Ghaziabad
        </p>
      </section>
      <section className="card_details_wrapper ">
        <div className="amount_wrapper flex  justify-evenly items-center  py-6 px-5">
          <div className=" w-1/4 flex-grow border-r-2 ">
            <h3 className=" justify-center flex items-center gap-2 font-mono font-normal  capitalize text-2xl ">
              {" "}
              <FaIndianRupeeSign /> 60,000
            </h3>
            <p className=" text-center capitalize font-medium font-roboto mt-2 text-xl text-gray-400">
              rent amount
            </p>
          </div>
          <div className="w-1/4 flex-grow border-r-2">
            <h3 className=" justify-center flex items-center gap-2 font-mono font-normal  capitalize text-2xl ">
              {" "}
              <FaIndianRupeeSign /> 60,000
            </h3>
            <p className=" text-center capitalize font-medium font-roboto mt-2 text-xl text-gray-400">
              depost amount
            </p>
          </div>
          <div className="w-1/4 flex-grow border-r-2">
            <h3 className=" justify-center flex items-center gap-2  font-slab font-normal  capitalize text-2xl ">
              {" "}
              1500 sqrft.
            </h3>
            <p className=" text-center capitalize font-medium font-roboto mt-2 text-xl text-gray-400">
              built up area
            </p>
          </div>
          <div className="w-1/4 flex-grow ">
            <h3 className=" justify-center flex items-center gap-2  font-slab font-normal  capitalize text-2xl ">
              {" "}
              single sharing
            </h3>
            <p className=" text-center capitalize font-medium font-roboto mt-2 text-xl text-gray-400">
              room type
            </p>
          </div>
        </div>
        <div className="card_image_wrapper py-3 px-5 flex gap-3 items-center justify-start">
          <div className=" w-1/3">
            <ImageSLiderComp />
          </div>
          <div className=" flex-1   flex flex-col gap-16 justify-start items-start">
            <div className="facilities_items px-1 flex flex-wrap  gap-1 py-1 border-2">
              <FacilityItem
                icon={<FaKey />}
                type={"avaibility"}
                name={"immediate"}
              />
              <FacilityItem
                icon={<AccessTimeIcon />}
                type={"closing time"}
                name={"11:00 pm"}
              />

              <FacilityItem
                icon={<FastfoodIcon />}
                type={"food facility"}
                name={"yes"}
              />
              <FacilityItem
                icon={<FaFemale />}
                type={"prefered tentas"}
                name={"girl"}
              />
            </div>
            <div className="get_owner_wrapper w-full flex gap-2 items-center">
              <button className=" focus:ring-0 border-none outline-none  w-3/4 px-12 py-6 bg-red-600 text-white capitalize text-2xl font-roboto ">
                get owner details
              </button>
              <div
                onClick={handleFavroute}
                className={` py-5 px-6 flex justify-center items-start  font-slab text-4xl border-2 cursor-pointer`}
              >
                <FaHeart className={`${isAddFavroute ? 'text-red-600' :"text-slate-300"}`} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CardComp;
