const pgFormDataValidation = (setFormError, formData) => {
  let isValid = true;
  const errors = {};

  // Validate array fields
  if (formData.images.length === 0) {
    setFormError("Please upload at least 5 image");
    // errors.images = 'Please upload at least 5 image';
    isValid = false;
    return;
  }

  // Add similar validations for other array fields

  // Example validation for non-empty fields
  if (!formData.roomSharing.trim()) {
    setFormError("Room sharing field is required");
    // errors.roomSharing = 'Room sharing field is required';
    isValid = false;
    return;
  }
  if (!formData.kitchen.trim()) {
    setFormError("Kitchen field is required");
    // errors.kitchen = 'Kitchen field is required';
    isValid = false;
    return;
  }
  if (!formData.balcony.trim()) {
    setFormError("balcony field is required");
    // errors.balcony = 'balcony field is required';
    isValid = false;
    return;
  }
  if (!formData.rentAmount > 0) {
    setFormError("please fill rent amount");
    // errors.rentAmount = 'please fill rent amount';
    isValid = false;
    return;
  }
  if (!formData.depositAmount >= formData.rentAmount) {
    setFormError("deposit amount can not be less than rent amount");
    // errors.depositAmount = 'deposit amount can not be less than rent amount';
    isValid = false;
    return;
  }
  if (!formData.availableFor.trim()) {
    setFormError("place available for is required field");
    // errors.availableFor = 'place available for is required field';
    isValid = false;
    return;
  }
  if (!formData.placeAvaibility.trim()) {
    setFormError(" placeAvaibility is required field for is required field");
    // errors.placeAvaibility = ' placeAvaibility is required field for is required field';
    isValid = false;
    return;
  }
  if (!formData.doorClosingTime.trim()) {
    setFormError("doorClosingTime is required field for is required field ");
    // errors.doorClosingTime = 'doorClosingTime is required field for is required field ';
    isValid = false;
    return;
  }
  if (!formData.foodType.trim()) {
    setFormError("foodType is required field for is required field");
    // errors.foodType = 'foodType is required field for is required field';
    isValid = false;
    return;
  }
  if (!formData.pgOrHostelName.trim()) {
    setFormError("pgOrHostelName is required field for is required field");
    // errors.pgOrHostelName = 'pgOrHostelName is required field for is required field';
    isValid = false;
    return;
  }
  if (!formData.description.trim()) {
    setFormError("description is required field for is required field");
    // errors.description = 'description is required field for is required field';
    isValid = false;
    return;
  }
  if (!formData.state.trim()) {
    setFormError("state is required field for is required field");
    // errors.state = 'state is required field for is required field';
    isValid = false;
    return;
  }
  if (!formData.city.trim()) {
    setFormError("city is required field for is required field");
    // errors.city = 'city is required field for is required field';
    isValid = false;
    return;
  }
  if (!formData.localAddress.trim()) {
    setFormError("localAddress is required field for is required field");
    // errors.localAddress = 'localAddress is required field for is required field';
    isValid = false;
    return;
  }
  if (!formData.laundary.trim()) {
    setFormError("laundary is required field for is required field");
    // errors.laundary = 'laundary is required field for is required field';
    isValid = false;
    return;
  }
  if (!formData.roomCleaning.trim()) {
    setFormError("roomCleaning is required field for is required field");
    // errors.roomCleaning = 'roomCleaning is required field for is required field';
    isValid = false;
    return;
  }
  if (!formData.warden.trim()) {
    setFormError("warden is required field for is required field");
    // errors.warden = 'warden is required field for is required field';
    isValid = false;
    return;
  }

  //   setFormError(errors);

  return isValid;
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
    !formData.images.length>0 ||
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

export default pgFormDataValidation;
