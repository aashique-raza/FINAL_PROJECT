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


  export {setTokenInLocalStorage,getTokenFromLocalStorage,removeTokenFromLocalStorage,isLoggedIn}