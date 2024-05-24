import React, { useEffect, useState } from "react";
import { API_URL } from "../configue";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import "../styles/SingleProperty.css";
import PropertyHeadComp from "../components/SinglePropertyComp/PropertyHeadComp";
import ImageGalleryComp from "../components/SinglePropertyComp/ImageGalleryComp";

function PropertyPage() {
  const { category, id } = useParams();
  const [propertyData, setPropertyData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const ImagesUrl = [
    {
      original:
        "https://images.pexels.com/photos/2091634/pexels-photo-2091634.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      original:
        "https://images.pexels.com/photos/36366/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      original:
        "https://images.pexels.com/photos/2459/stairs-home-loft-lifestyle.jpg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      original:
        "https://images.pexels.com/photos/2834211/pexels-photo-2834211.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      original:
        "https://images.pexels.com/photos/53782/pexels-photo-53782.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      original:
        "https://images.pexels.com/photos/54094/road-distance-landscape-horizon-54094.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
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
      <div className="section section3">
        {/* <ImageGalleryComp images={ImagesUrl} /> */}
      </div>
    </main>
  );
}

export default PropertyPage;
