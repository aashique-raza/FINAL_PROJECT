import React, { useEffect, useState } from "react";
import { Table } from "flowbite-react";
import { NavLink, Link } from "react-router-dom";
import "../styles/UserContactProperty.css";
import {
  getTokenFromLocalStorage,
  refreshAccessToken,
  removeTokenFromLocalStorage,
  removeRefreshTokenFromLocalStorage,
} from "../token";
import { API_URL } from "../configue";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOutSuccess } from "../features/user.slice";
import { clearStateOfUser } from "../features/userProperty.slice";

function PropertyYouContacted() {
  const [contactProperty, setContactProperty] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = getTokenFromLocalStorage();
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Example data, replace this with your actual data
  
  //   contacted-property/:userId

  const fetchUserContactProperty = async () => {
    try {
      setError(null);
      setLoading(false);

      const resp = await fetch(
        `${API_URL}/user/contacted-property/${user._id}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json", // Set content type to JSON
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      const data = await resp.json();
      // console.log(data);
      if (!resp.ok) {
        if (resp.status === 401) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            // Retry original request with new token
            await fetchUserContactPropertyWithNewToken(newToken);
          } else {
            removeTokenFromLocalStorage();
            removeRefreshTokenFromLocalStorage();
            dispatch(logOutSuccess());

            dispatch(clearStateOfUser());

            alert("session expired.");
            navigate("/login");
          }

          return;
        }

        setError(data.message);
        setLoading(false);
        return;
      }

      setError(null);
      setLoading(false);
      setContactProperty(data.contactedProperty);
    } catch (error) {
      setError("something went wrong!");
      console.log("error happened", error);
    }
  };

  useEffect(() => {
    fetchUserContactProperty();
  }, []);

  const fetchUserContactPropertyWithNewToken = async (newToken) => {
    try {
      setError(null);
      setLoading(false);

      const resp = await fetch(
        `${API_URL}/user/contacted-property/${user._id}`,
        {
          method: "GET",

          headers: {
            "Content-Type": "application/json", // Set content type to JSON
            Authorization: `Bearer ${newToken}`,
          },
          credentials: "include",
        }
      );

      const data = await resp.json();

      console.log(data);
      if (!resp.ok) {
        setError(data.message);
        setLoading(false);
        return;
      }
      setError(null);
      setLoading(false);
      setContactProperty(data.contactedProperty);
      return;
    } catch (error) {
      setError("something went wrong!");
      console.log("error happened", error);
    }
  };

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5 lg:ml-5">
    <table className="w-full text-xl text-left text-gray-500 dark:text-gray-400">
      <thead className="text-xl md:text-2xl font-bold font-roboto text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="px-4 py-3 lg:px-8 lg:py-4 whitespace-nowrap">Property Type</th>
          <th scope="col" className="px-4 py-3 lg:px-8 lg:py-4 whitespace-nowrap">Property Name</th>
          <th scope="col" className="px-4 py-3 lg:px-8 lg:py-4 whitespace-nowrap">City</th>
          <th scope="col" className="px-4 py-3 lg:px-8 lg:py-4 whitespace-nowrap">Address</th>
          <th scope="col" className="px-4 py-3 lg:px-8 lg:py-4 whitespace-nowrap">Contact Date</th>
          <th scope="col" className="px-4 py-3 lg:px-8 lg:py-4 whitespace-nowrap">Posted Date</th>
        </tr>
      </thead>
      <tbody>
        {contactProperty.length === 0 ? (
          <tr>
            <td colSpan="7" className="py-6 text-center capitalize text-red-500 text-xl font-bold">
              You have not contacted any property yet
            </td>
          </tr>
        ) : (
          contactProperty.map((item, idx) => (
            <tr
              key={idx}
              className="text-sm md:text-2xl capitalize font-bold font-roboto odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
            >
              <th scope="row" className="px-6 py-4 md:px-8 md:py-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item.propertyType}
              </th>
              <td className="px-6 py-4 md:px-8 md:py-6">
                <Link to={`/property/${item.propertyType.toLowerCase() === "pg" ? 'pg' : 'rental'}/${item.propertyDetails._id}`} className="text-red-500 capitalize font-raleway hover:underline">
                  {item.propertyType.toLowerCase() === "pg"
                    ? `${item.propertyDetails.roomSharing} room sharing`
                    : `${item.propertyDetails.BHKType} ${item.propertyDetails.apartmentType}`}
                </Link>
              </td>
              <td className="px-6 py-4 md:px-8 md:py-6">{item.propertyDetails.location.city}</td>
              <td className="px-6 py-4 md:px-8 md:py-6">{item.propertyDetails.location.localAddress}</td>
              <td className="px-6 py-4 md:px-8 md:py-6">{new Date(item.contactDate).toLocaleDateString()}</td>
              <td className="px-6 py-4 md:px-8 md:py-6">{new Date(item.postedDate).toLocaleDateString()}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
  
  
  );
}

export default PropertyYouContacted;

  /* 
 {error && (
    <p className=" py-4 capitalize text-red-500 text-xl font-bold font-roboto">
      {" "}
      {error}{" "}
    </p>
  )} */

