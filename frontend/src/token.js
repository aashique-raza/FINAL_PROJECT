// Function to set JWT token in local storage
const setTokenInLocalStorage = (token, cookieExpiry) => {
  // Store token and its expiry in localStorage
  const tokenWithExpiry = JSON.stringify({ token, cookieExpiry });
  localStorage.setItem('jwtToken', tokenWithExpiry);
};
  
  // Function to get JWT token from local storage
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem('jwtToken');
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


  export {setTokenInLocalStorage,getTokenFromLocalStorage,removeTokenFromLocalStorage,isLoggedIn}