
import { API_URL } from "./configue";

// Function to set JWT token in local storage
const setTokenInLocalStorage = (token) => {
  const expirationDate = new Date();
  expirationDate.setTime(expirationDate.getTime() + 3 * 24 * 60 * 60 * 1000); // Adding expiration in 3 days
  
  const tokenData = {
    token: token,
    expiresAt: expirationDate.getTime() // Store expiration date as a timestamp
  };

  localStorage.setItem('jwtToken', JSON.stringify(tokenData));

  // Optionally, you may want to use setTimeout to remove the token after it expires
  setTimeout(() => {
    localStorage.removeItem('jwtToken');
  }, 3 * 24 * 60 * 60 * 1000); // Remove token after three days
};

// expirationDate.setDate(expirationDate.getDate() + 3); // Set expiration to 3 days from now

  
  // Function to get JWT token from local storage
  const getTokenFromLocalStorage = () => {
    const tokenDataString = localStorage.getItem('jwtToken');
    if (!tokenDataString) return null;
  
    const tokenData = JSON.parse(tokenDataString);
    return tokenData.token;
  };
  
  // Function to remove JWT token from local storage
  const removeTokenFromLocalStorage = () => {
    localStorage.removeItem('jwtToken');
  };
  
  // Function to check if user is logged in
  const isLoggedIn = () => {
    const token = getTokenFromLocalStorage();
    if (token) {
      // Here you might want to decode and verify the token's validity
      return true;
    }
    return false;
  };

  const getRefreshTokenFromLocalStorage = () => {
    return localStorage.getItem('refreshToken');
  };
  const setRefreshTokenInLocalStorage=(token)=>{
    localStorage.setItem('refreshToken',JSON.stringify(token))
  }
  const removeRefreshTokenFromLocalStorage = () => {
    localStorage.removeItem('refreshToken');
  };

  const refreshAccessToken = async () => {
    const refreshToken = JSON.parse(getRefreshTokenFromLocalStorage());
    
    // console.log('token from local storage',refreshToken)
    const response = await fetch(`${API_URL}/user/refresh-token`, {
      method: "POST",
      body: JSON.stringify({ refreshToken }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    });
  
    const result = await response.json();
    // console.log('result for refresh token',result)
  
    if (response.ok) {
      setTokenInLocalStorage(result.accessToken);
      return result.accessToken;
    } else {
      // Handle refresh token error
      // console.log(result.message);
      return null;
    }
  };

  const apiRequest = async (url, options) => {
    let token = getTokenFromLocalStorage();
  
    if (!options.headers) {
      options.headers = {};
    }
  
    options.headers["Authorization"] = `Bearer ${token}`;
  
    let response = await fetch(url, options);
  
    if (response.status === 401) { // Unauthorized, try to refresh token
      token = await refreshAccessToken();
  
      if (token) {
        options.headers["Authorization"] = `Bearer ${token}`;
        response = await fetch(url, options);
      }
    }
  
    return response;
  };
  
  


  export {removeRefreshTokenFromLocalStorage,refreshAccessToken, setTokenInLocalStorage,getTokenFromLocalStorage,removeTokenFromLocalStorage,isLoggedIn,setRefreshTokenInLocalStorage}