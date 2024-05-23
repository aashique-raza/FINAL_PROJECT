import React,{useEffect,useState} from 'react'
import { API_URL } from '../configue';
import { useParams } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';

function PropertyPage() {

    const { category, id } = useParams();
  const [propertyData, setPropertyData] = useState(null);
  const [error,setError]=useState(null)
  const[loading,setLoading]=useState(false)
  

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
    if(category==='rental'){
        url=`${API_URL}/rent/getSingleProperty/${id}`
    }else{
        url=`${API_URL}/pg/getSingleProperty/${id}`
    }
  try {
    setError(null)
    setLoading(true)
    const response = await fetch(url,{
        headers:{
            "Content-Type": "application/json",
        }
    });
    const data = await response.json();
    // console.log(data)
    if(!response.ok){
        setError(data.message)
        setLoading(false)
        return
    }
    setError(null)
    setLoading(false)
    setPropertyData(data.findProperty);
  } catch (error) {
    setError(error.message)
    setLoading(false)
    console.error("Failed to fetch property data:", error);
  }
};

if(loading){
    return <div className=' w-full flex justify-center items-center'>
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
}

  return (
    <div className=' mt-32'>PropertyPage</div>
  )
}

export default PropertyPage