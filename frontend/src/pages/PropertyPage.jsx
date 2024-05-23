import React,{useEffect,useState} from 'react'
import { API_URL } from '../configue';
import { useParams } from 'react-router-dom';

function PropertyPage() {

    const { category, id } = useParams();
  const [propertyData, setPropertyData] = useState(null);

  useEffect(() => {
    // You can perform any action with category and id here
    console.log("Category:", category);
    console.log("ID:", id);

    // Example: Fetch property data using the id
    const fetchPropertyData = async () => {
      try {
        const response = await fetch(`${API_URL}/property/${category}/${id}`);
        const data = await response.json();
        setPropertyData(data);
      } catch (error) {
        console.error("Failed to fetch property data:", error);
      }
    };

    // if (id) {
    //   fetchPropertyData();
    // }
  }, [category, id]);

  return (
    <div className=' mt-32'>PropertyPage</div>
  )
}

export default PropertyPage