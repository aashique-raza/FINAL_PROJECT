import React, { useEffect, useState } from "react";
import { API_URL } from "../configue";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
// facilites icon
import {
  FaTv,
  FaFan,
  FaBath,
  FaBoxOpen,
  FaWifi,
  FaLock,
  FaTable,
  FaFire,
  FaSnowflake,
  FaRegSnowflake,
} from "react-icons/fa";
// import { FaRegSnowflake } from "react-icons/gi";
import { TbAirConditioning } from "react-icons/tb";
import { roomAmenitiesitems } from "../rentUtils";

import "../styles/SingleProperty.css";
import PropertyHeadComp from "../components/SinglePropertyComp/PropertyHeadComp";
import ImageGalleryComp from "../components/SinglePropertyComp/ImageGalleryComp";
import FacilityItem from "../components/FacilityItem";
import PropertyOverview from "../components/SinglePropertyComp/PropertyOverview";
import PropertActivity from "../components/SinglePropertyComp/PropertActivity";
import PropertySimillarComp from "../components/SinglePropertyComp/PropertySimillarComp";
import { FaCompass } from "react-icons/fa";
import { IoMdWater } from "react-icons/io";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import {
  FaBed,
  FaMale,
  FaFemale,
  FaUser,
  FaKey,
  FaBicycle,
  FaCar,
  FaCalendarAlt,
  FaWrench,
} from "react-icons/fa";
import { AiFillMessage } from "react-icons/ai";
import {
  FaBuilding,
  FaTools,
  FaCouch,
  FaTree,
  FaUserFriends,
  FaBolt,
} from "react-icons/fa";
import PropertyDescription from "../components/SinglePropertyComp/PropertyDescription";
import PropertyAmenitiesItem from "../components/SinglePropertyComp/PropertyAmenitiesItem";

function PropertyPage() {
  const { category, id } = useParams();
  const [propertyData, setPropertyData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // amenities item
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  // Function to toggle amenities visibility
  const toggleAmenities = () => {
    setShowAllAmenities(!showAllAmenities);
  };

  const amenitiesToShow = showAllAmenities
    ? roomAmenitiesitems
    : roomAmenitiesitems.slice(0, 5);

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

  // Facilities icon map
  const facilityIconMap = {
    cupboard: <FaBoxOpen />,
    ac: <TbAirConditioning />,
    "attached bathroom": <FaBath />,
    fan: <FaFan />,
    TV: <FaTv />,
    bedding: <FaBed />,
    geyser: <FaRegSnowflake />,
    "room heater": <FaFire />,
    "study table": <FaTable />,
    WiFi: <FaWifi />,
    locker: <FaLock />,
  };

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
              <AiFillMessage />
            </button>
          </div>
        </aside>
      </div>
      <div className="property-section3 propertysection">
        <aside className="property-left-sidebar property-detailes-sidebar ">
          <div className="overview-container w-full bg-white border-2 border-gray-400 py-4 px-3">
            <h3 className=" py-5 inline-block border-b-2 border-red-600 capitalize font-bold font-roboto tracking-wide text-xl sm:text-2xl md:text-4xl ">
              overview
            </h3>
            <div className="overview-wrapper w-full flex justify-start items-center  gap-10  flex-wrap mt-10 py-3  flex-wrap">
              <PropertyOverview icon={<FaBed />} name={"bedroom"} status={2} />
              <PropertyOverview
                icon={<IoMdWater />}
                name={"water supply"}
                status={"corporation"}
              />
              <PropertyOverview
                icon={<FaBuilding />}
                name={"floor"}
                status={"10/17"}
              />
              <PropertyOverview
                icon={<FaTools />}
                name={"maintenance"}
                status={"included"}
              />
              <PropertyOverview
                icon={<MdOutlineCurrencyRupee />}
                name={"maintenance charge"}
                status={500}
              />
              <PropertyOverview
                icon={<FaCouch />}
                name={"furnishing"}
                status={"full"}
              />
              <PropertyOverview
                icon={<FaTree />}
                name={"balcony"}
                status={"yes"}
              />
              <PropertyOverview
                icon={<FaUserFriends />}
                name={"allowed guest"}
                status={1}
              />
              <PropertyOverview
                icon={<FaBolt />}
                name={"electricity charge"}
                status={"included"}
              />
              <PropertyOverview
                icon={<FaCompass />}
                name={"facing"}
                status={"east"}
              />
            </div>
          </div>
          <div
            className="property-description-wrapper  w-full bg-white border-2 border-gray-400 py-4 px-3 mt-10
           "
          >
            <h3 className=" py-5 inline-block border-b-2 border-red-600 capitalize font-bold font-roboto tracking-wide text-xl sm:text-2xl md:text-4xl ">
              description
            </h3>
            <PropertyDescription />
          </div>
          <div className="property-amenities-container w-full bg-white border-2 border-gray-400 py-4 px-3 mt-10">
            <h3 className=" py-5 inline-block border-b-2 border-red-600 capitalize font-bold font-roboto tracking-wide text-xl sm:text-2xl md:text-4xl ">
              amenities
            </h3>
            <div className="w-full flex flex-wrap gap-8 mt-14">
              {amenitiesToShow?.map((amenity, index) => (
                <PropertyAmenitiesItem
                  key={index}
                  icon={amenity.icon}
                  name={amenity.label}
                />
              ))}
              {roomAmenitiesitems.length > 5 && !showAllAmenities && (
                <div
                  className="shadow-lg  flex justify-center items-center rounded-full  w-24 h-24 text-white bg-teal-700 capitalize font-roboto text-sm sm:text-2xl cursor-pointer"
                  onClick={toggleAmenities}
                >
                  +{roomAmenitiesitems.length - 5}
                </div>
              )}
              {showAllAmenities && (
                <div
                  className="shadow-lg  flex justify-center items-center rounded-full w-24 h-24  bg-teal-700 text-white capitalize font-roboto text-sm sm:text-xl text-center cursor-pointer"
                  onClick={toggleAmenities}
                >
                  Show Less
                </div>
              )}
            </div>
          </div>
        </aside>
        <aside className="property-right-sidebar simillar-property-sidebar bg-white ">
          <div className=" flex flex-col justify-center items-start gap-5 border-2  px-4 py-10 property-simillar-container">
            <h3 className=" py-5 inline-block border-b-2 border-red-600 capitalize font-bold font-roboto tracking-wide text-xl sm:text-2xl md:text-4xl ">
              simillar properties
            </h3>
            <div className="flex flex-col justify-center items-start gap-8 w-full mt-7">
              <PropertySimillarComp />
              <PropertySimillarComp />
              <PropertySimillarComp />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}

export default PropertyPage;
