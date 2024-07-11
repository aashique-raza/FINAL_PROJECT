
import { API_URL } from "./configue"

const getOwnerDetailsForLoggedInUser=async(propertyId,categoryData,userEmail)=>{

    console.log('logged in user hai')
    console.log(propertyId,categoryData,userEmail)
    return


    try {
        const resp = await fetch(`${API_URL}/guest/getOwnerDetails/${propertyId}/${categoryData}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email,mobile }),
        });
      
          const result=await resp.json()
          console.log(result)
          if(!resp.ok){
            setError(result.message)
            setLoading(false)
            return
          }
      
          setError(null)
          setLoading(false)
          console.log(result)
          // setModalOPen(!isOpen)
          setSuccessMsg(result.msg)

    } catch (error) {
        
    }
}

export default getOwnerDetailsForLoggedInUser
