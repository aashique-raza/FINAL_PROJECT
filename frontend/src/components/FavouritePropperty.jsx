import React,{useEffect,useState} from 'react'
import CardComp from './CardComp'
import { useSelector,useDispatch } from 'react-redux'
import { getTokenFromLocalStorage } from '../token'
import { API_URL } from '../configue'

function FavouritePropperty() {

    const[error,setError]=useState(null)
    const[loading,setLoading]=useState(false)

    const token=getTokenFromLocalStorage()
    const{user}=useSelector((state)=>state.user)

    // /addFavorite/:userId"
    // const { userId } = req.params;
    // const { propertyId, propertyType } = req.body;


    const getFavouriteProperty=async()=>{

        try {
            setError(null)
            setLoading(true)
            const resp = await fetch(`${API_URL}/user/getFavorites/${user._id}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json", // JSON format mein Content-Type header set kiya gaya hai
                  Authorization: `Bearer ${token}`,
                },
               
              });
              const result=await resp.json()

             
              if(!resp.ok){
                setError(result.message)
                setLoading(false)
              }
            
              setError(null)
              setLoading(false)
              console.log(result)
        } catch (error) {
            setError(error.message)
            setLoading(false)
            console.log('fetching favourite property failed',error)
        }

    }

    useEffect(()=>{
            getFavouriteProperty()
    },[])

  return (
    <div className=' bg-white flex flex-wrap justify-start items-center gap-3 w-full'>

    </div>
  )
}

export default FavouritePropperty