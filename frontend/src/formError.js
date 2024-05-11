const pgFormDataValidation = (setFormError, formData) => {
 

  // Validate array fields
  if (formData.images.length === 0) {
    setFormError("Please upload at least 5 image");
    // errors.images = 'Please upload at least 5 image';
    
    return;
  }

  // Add similar validations for other array fields

  // Example validation for non-empty fields
  if (!formData.roomSharing.trim()) {
    setFormError("Room sharing field is required");
    // errors.roomSharing = 'Room sharing field is required';
    
    return;
  }
  if (!formData.kitchen.trim()) {
    setFormError("Kitchen field is required");
    // errors.kitchen = 'Kitchen field is required';
    
    return;
  }
  if (!formData.balcony.trim()) {
    setFormError("balcony field is required");
    // errors.balcony = 'balcony field is required';
   
    return;
  }
  if (!formData.rentAmount > 0) {
    setFormError("please fill rent amount");
    // errors.rentAmount = 'please fill rent amount';
    
    return;
  }
  if (!formData.depositAmount >= formData.rentAmount) {
    setFormError("deposit amount can not be less than rent amount");
    // errors.depositAmount = 'deposit amount can not be less than rent amount';
   
    return;
  }
  if (!formData.availableFor.trim()) {
    setFormError("place available for is required field");
    // errors.availableFor = 'place available for is required field';
   
    return;
  }
  if (!formData.placeAvaibility.trim()) {
    setFormError(" placeAvaibility is required field for is required field");
    // errors.placeAvaibility = ' placeAvaibility is required field for is required field';
    
    return;
  }
  if (!formData.doorClosingTime.trim()) {
    setFormError("doorClosingTime is required field for is required field ");
    // errors.doorClosingTime = 'doorClosingTime is required field for is required field ';
   
    return;
  }
  if (!formData.foodType.trim()) {
    setFormError("foodType is required field for is required field");
    // errors.foodType = 'foodType is required field for is required field';
   
    return;
  }
  if (!formData.pgOrHostelName.trim()) {
    setFormError("pgOrHostelName is required field for is required field");
    // errors.pgOrHostelName = 'pgOrHostelName is required field for is required field';
   
    return;
  }
  if (!formData.description.trim()) {
    setFormError("description is required field for is required field");
    // errors.description = 'description is required field for is required field';
   
    return;
  }
  if (!formData.state.trim()) {
    setFormError("state is required field for is required field");
    // errors.state = 'state is required field for is required field';
   
    return;
  }
  if (!formData.city.trim()) {
    setFormError("city is required field for is required field");
    // errors.city = 'city is required field for is required field';
   
    return;
  }
  if (!formData.localAddress.trim()) {
    setFormError("localAddress is required field for is required field");
    // errors.localAddress = 'localAddress is required field for is required field';
    
    return;
  }
  if (!formData.laundary.trim()) {
    setFormError("laundary is required field for is required field");
    // errors.laundary = 'laundary is required field for is required field';
   
    return;
  }
  if (!formData.roomCleaning.trim()) {
    setFormError("roomCleaning is required field for is required field");
    // errors.roomCleaning = 'roomCleaning is required field for is required field';
    
    return;
  }
  if (!formData.warden.trim()) {
    setFormError("warden is required field for is required field");
    // errors.warden = 'warden is required field for is required field';
   
    return;
  }

 

  
};

export const formErrorHandler = (formData) => {
  if (
    !formData.roomSharing.trim() ||
    !formData.balcony.trim() ||
    !formData.availableFor.trim() ||
    !formData.rentAmount > 0 ||
    !formData.depositAmount >= formData.rentAmount ||
    !formData.city.trim() ||
    !formData.state.trim() ||
    !formData.localAddress.trim() ||
    !formData.laundary.trim() ||
    !formData.description.trim() ||
    !formData.doorClosingTime.trim() ||
    
    !formData.kitchen.trim() ||
    !formData.pgOrHostelName.trim() ||
    !formData.placeAvaibility.trim() ||
    !formData.roomCleaning.trim() ||
    !formData.warden.trim() ||
    !formData.foodAvaibility.trim()
  ) {
    return false
  }else{
    return true
  }

 
};
// Email validation function
 export const validateEmail = (email) => {
  // Regular expression for validating email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Mobile number validation function
export const validateMobileNumber = (mobileNumber) => {
  // Regular expression for validating mobile number format (exactly 10 digits)
  const mobileRegex = /^\d{10}$/;
  return mobileRegex.test(mobileNumber);
};

export default pgFormDataValidation;
