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
  FaBiking,
  FaClock,
  FaCalendar,
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
import SharingRoomDetailes from "../components/SinglePropertyComp/SharingRoomDetailes";
import PgRules from "../components/SinglePropertyComp/PgRules";
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
  FaUsers,
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
import { FaBowlFood, FaKitchenSet } from "react-icons/fa6";
import { iconButtonClasses } from "@mui/material";

function PropertyPage() {
  const { category, id } = useParams();
  const [propertyData, setPropertyData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [facilityItems, setFacilityItems] = useState([]);


  useEffect(() => {
    // You can perform any action with category and id here
    // console.log("Category:", category);
    // console.log("ID:", id);
    if (id) {
      fetchPropertyData();
    }
  }, [category, id]);

  // render prefered icon according to value
  const renderIcon = (type) => {
    switch (type) {
      case "family":
        return <FaUsers />;
      case "anyone":
        return <MdPeople />;
      case "bachelor male":
        return <FaMale />;
      case "bachelor female":
        return <FaFemale />;
      case "company":
        return <FaBuilding />;
      case "office":
        return <FaSuitcase />;
      default:
        return null;
    }
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

  // amenities item
  const [showAllAmenities, setShowAllAmenities] = useState(false);

  // Function to toggle amenities visibility
  const toggleAmenities = () => {
    setShowAllAmenities(!showAllAmenities);
  };

  const amenitiesToShow = showAllAmenities
    ? roomAmenitiesitems
    : roomAmenitiesitems.slice(0, 5);

  const pgFacilityItem = [
    { type: "prefrred tenet", name: "girls", icon: <FaFemale /> },
    { type: "parking", name: "bike", icon: <FaBiking /> },
    { type: "food facility", name: "yes", icon: <FaBowlFood /> },
    { type: "door closing time", name: "11:00 pm", icon: <FaClock /> },
    { type: "avaibility", name: "immidiate", icon: <FaKey /> },
    { type: "posted on", name: "girls", icon: <FaFemale /> },
    { type: "prefrred tenet", name: "may 07 2024", icon: <FaCalendar /> },
    { type: "kitchen", name: "yes", icon: <FaKitchenSet /> },
  ];

  // property overview data----------------

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
      console.log(data);
      if (!response.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setError(null);
      setLoading(false);
      setPropertyData(data.findProperty);
      if (category.trim().toLocaleLowerCase() === "rental") {
       const result= rentFacilityItems(data.findProperty);
       setFacilityItems(result)
       const result2= propertyOverview(data.findProperty)
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.error("Failed to fetch property data:", error);
    }
  };

  function rentFacilityItems(data) {
    console.log('rent fcilitu',data)
    return [
      {
        type: "no of bedroom",
        name: `${data?.bedroom} Bedroom`,
        icon: <FaBed />,
      },
      {
        type: "building age",
        name: `${data?.propertyAge}`,
        icon: <FaTree />,
      },
      {
        type: "prefered tentet",
        name: `${data?.preferedTenats[0]}`,
        icon: renderIcon(data?.preferedTenats[0]),
      },
      {
        type: "avaibility",
        name: `${extractDate(data?.availableFrom)}`,
        icon: <FaKey />,
      },
      { type: "parking", name: `${data?.parking}`, icon: <FaCar /> },
      { type: "posted on", name: "12-05-24", icon: <FaCalendarAlt /> },
      { type: "balcony", name: `${data?.balcony}`, icon: <FaWrench /> },
      {
        type: "property type",
        name: `${data?.apartmentType}`,
        icon: <FaBuilding />,
      },
    ];
  }
  function propertyOverview(data) {
    console.log('property overview',data)
    return [
      { icon: <FaBed />, name: "bedroom", status: data.bedroom },
      {
        icon: <IoMdWater />,
        name: "water supply",
        status:
        data.waterSupply.toLocaleLowerCase().trim() === "both"
            ? "corporation and boring"
            : data.waterSupply,
      },
      {
        icon: <FaBuilding />,
        name: "floor",
        status: `${data.floor}/${data.totalFloor}`,
      },
      {
        icon: <FaTools />,
        name: "monthly maintenance",
        status: data.monthlyMaintenance,
      },
      {
        icon: <MdOutlineCurrencyRupee />,
        name: "maintenance charge",
        status:
        data.monthlyMaintenance.trim().toLocaleLowerCase() ===
          "extraMaintenance".trim().toLocaleLowerCase()
            ? data.maintenanceAmount
            : "00.00",
      },
      {
        icon: <FaCouch />,
        name: "furnishing",
        status: data.furnishing,
      },
      {
        icon: <FaTree />,
        name: "balcony",
        status: data.balcony,
      },
      {
        icon: <FaUserFriends />,
        name: "allowed guest",
        status: data.guest,
      },
      {
        icon: <FaBolt />,
        name: "electricity charge",
        status: data.electricity,
      },
      {
        icon: <FaCompass />,
        name: "facing",
        status: data.facing,
      },
    ];
  }

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

  console.log('property data',propertyData)

  return (
    <main className="property-main-container">
      {error ? (
        <div className=" py-5 w-full px-4 justify-center items-center bg-gray-200 text-red-600">
          <h1 className=" font-bold font-roboto capitalize tracking-wider text-xl sm:text-2xl">
            {error}
          </h1>
        </div>
      ) : (
        <>
        {
          propertyData && (<PropertyHeadComp
            rent={propertyData?.rentAmount}
            deposit={propertyData?.depositAmount}
            sqrfit={propertyData?.builtUpArea}
            name={propertyData?.apartmentName}
            location={propertyData?.location}
            bhktype={propertyData?.BHKType}
            propertyAvailableFor={propertyData?.propertyAvailableFor}
            apartment_name={propertyData?.apartmentName}
          />
)
        }
          
          <div className="property-section property-section2  ">
            {/* <ImageGalleryComp images={propertyData.images} /> */}
            <aside className="property-left-side-box">
              <div className="facilities_items px-3 lg:py-6 flex flex-wrap  gap-5 lg:gap-8 py-3 border-2 w-full ">
                {category.trim().toLocaleLowerCase() ===
                "rental".trim().toLocaleLowerCase()
                  ? facilityItems?.map((item, index) => (
                      <FacilityItem
                        key={index}
                        icon={item.icon}
                        type={item.type}
                        name={item.name}
                      />
                    ))
                  : pgFacilityItem?.map((item, index) => (
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
              {category.trim().toLocaleLowerCase() ===
                "pg".trim().toLocaleLowerCase() && (
                <>
                  {" "}
                  <SharingRoomDetailes />
                  <PgRules />
                </>
              )}

              <div className="overview-container w-full bg-white border-2 border-gray-400 py-4 px-3">
                <h3 className=" py-5 inline-block border-b-2 border-red-600 capitalize font-bold font-roboto tracking-wide text-xl sm:text-2xl md:text-4xl ">
                  overview
                </h3>
                <div className="overview-wrapper w-full flex justify-start items-center  gap-10 mt-10 py-3  flex-wrap">
                  {/* {propertyOverview?.map((item, index) => (
                    <PropertyOverview
                      key={index}
                      icon={item.icon}
                      name={item.name}
                      status={item.status}
                    />
                  ))} */}
                </div>
              </div>
              <div
                className="property-description-wrapper  w-full bg-white border-2 border-gray-400 py-4 px-3 mt-10
         "
              >
                <h3 className=" py-5 inline-block border-b-2 border-red-600 capitalize font-bold font-roboto tracking-wide text-xl sm:text-2xl md:text-4xl ">
                  description
                </h3>
                {/* <PropertyDescription desc={propertyData.description} /> */}
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
        </>
      )}
    </main>
  );
}

export default PropertyPage;
