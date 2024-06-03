import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RentEditComp from "../components/EditComp/RentEditComp";
import PgEditComp from "../components/EditComp/PgEditComp";
import { API_URL } from "../configue";
import { ThreeDots } from "react-loader-spinner";

function EditPage() {
  const { category, id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editProperty, setEditProperty] = useState([]);

  console.log(category);

  useEffect(() => {
    if (id) {
      fetchDataFromDB();
    }
  }, []);

  //   get data from data base for edit property------------------------

  const fetchDataFromDB = async () => {
    let url;

    if (category === "rental") {
      url = `${API_URL}/rent/getSingleProperty/${id}`;
    } else {
      url = `${API_URL}/pg/getSingleProperty/${id}`;
    }

    try {
      setError(null);
      setLoading(true);

      const resp = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!resp.ok) {
        setError(resp.message);
        setLoading(false);
        return;
      }
      const data = await resp.json();
      // console.log(data);
      setLoading(false);

      setEditProperty(data.findProperty);
    } catch (error) {
      console.log("fetch data for edit failed", error);
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className=" mt-32">
      {loading && (
        <div className="flex justify-center items-center bg-white py-4">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="red"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center bg-white py-4">
          <h1 className="capitalize font-bold font-roboto text-sm sm:text-xl md:text-2xl tracking-wider text-red-400">
            {error}
          </h1>
        </div>
      )}
      {category === "pg"
        ? editProperty && <PgEditComp editData={editProperty} />
        : editProperty && <RentEditComp editData={editProperty} />}
    </div>
  );
}

export default EditPage;
