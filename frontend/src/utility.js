
import { API_URL } from "./configue"
import {getTokenFromLocalStorage} from './token'

const getOwnerDetailsForLoggedInUser=async(propertyId,categoryData,userId)=>{

    const token=getTokenFromLocalStorage()

    console.log('logged in user hai')
    console.log(propertyId,categoryData,userId)
 


    try {
        const resp = await fetch(`${API_URL}/user/getOwnerDetails/${userId}/${propertyId}/${categoryData}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
             credentials:'include'
           
        });
       
          const result=await resp.json()
          console.log(result)
          if(!resp.ok){
           
            return result.message
          }
          return result.msg
      
    } catch (error) {
        console.log('get owner details failed',error)
        return error.message
        
    }
}

export default getOwnerDetailsForLoggedInUser
