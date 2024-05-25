import React, { useEffect, useState } from "react";
import { API_URL } from "../configue";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import "../styles/SingleProperty.css";
import PropertyHeadComp from "../components/SinglePropertyComp/PropertyHeadComp";
import ImageGalleryComp from "../components/SinglePropertyComp/ImageGalleryComp";
import FacilityItem from "../components/FacilityItem";
import {
  FaBed,
  FaBuilding,
  FaMale,
  FaFemale,
  FaUser,
  FaKey,
  FaBicycle,
  FaCar,
  FaCalendarAlt,
  FaWrench,
  FaTree,
} from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";

function PropertyPage() {
  const { category, id } = useParams();
  const [propertyData, setPropertyData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const iconsArray = [
    { type: "no of bedroom", name: "2 Bedroom", icon: <FaBed /> },
    { type: "number", name: "Building", icon: <FaBuilding /> },
    { type: "prefered tentet", name: "Male", icon: <FaMale /> },

    { type: "avaibility", name: "immidiate", icon: <FaKey /> },

    { type: "parking", name: "Car parking", icon: <FaCar /> },
    { type: "posted on", name: "24/05/2-24", icon: <FaCalendarAlt /> },
    { type: "balcony", name: "2", icon: <FaWrench /> },
    { type: "building age", name: "above thre years", icon: <FaTree /> },
  ];

  const ImagesUrl = [
    "https://images.pexels.com/photos/2091634/pexels-photo-2091634.jpeg?auto=compress&cs=tinysrgb&w=600",

    "https://images.pexels.com/photos/36366/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",

    "https://images.pexels.com/photos/2459/stairs-home-loft-lifestyle.jpg?auto=compress&cs=tinysrgb&w=600",

    "https://images.pexels.com/photos/2834211/pexels-photo-2834211.jpeg?auto=compress&cs=tinysrgb&w=600",

    "https://images.pexels.com/photos/53782/pexels-photo-53782.jpeg?auto=compress&cs=tinysrgb&w=600",

    "https://images.pexels.com/photos/54094/road-distance-landscape-horizon-54094.jpeg?auto=compress&cs=tinysrgb&w=600",
  ];

  useEffect(() => {
    // You can perform any action with category and id here
    // console.log("Category:", category);
    // console.log("ID:", id);
    // if (id) {
    //   fetchPropertyData();
    // }
  }, [category, id]);

  // Example: Fetch property data using the id
  const fetchPropertyData = async () => {
    let url;
    if (category === "rental") {
      url = `${API_URL}/rent/getSingleProperty/${id}`;
    } else {
      url = `${API_URL}/pg/getSingleProperty/${id}`;
    }
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      // console.log(data)
      if (!response.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setError(null);
      setLoading(false);
      setPropertyData(data.findProperty);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.error("Failed to fetch property data:", error);
    }
  };

  if (loading) {
    return (
      <div className=" w-full flex justify-center items-center">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#FF0000"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  return (
    <main className="property-main-container">
      <PropertyHeadComp />
      <div className="property-section property-section2  ">
        <ImageGalleryComp images={ImagesUrl} />
        <aside className="property-left-side-box">
          <div className="facilities_items px-3 lg:py-6 flex flex-wrap  gap-5 lg:gap-8 py-3 border-2 w-full ">
            {iconsArray?.map((item, index) => (
              <FacilityItem
                key={index}
                icon={item.icon}
                type={item.type}
                name={item.name}
              />
            ))}
          </div>
          <div className="flex items-center gap-3 justify-start w-full px-6 mt-10 border-2 border-gray-200 py-6">
            <button className=" w-auto focus:ring-0 border-none outline-none   px-12 py-6 bg-red-600 text-white capitalize text-2xl font-roboto ">
              get owner details
            </button>

            <button className="bg-green-600  px-12 py-6 text-3xl sm:text-4xl text-white">
              <AiFillMessage/>
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default PropertyPage;
