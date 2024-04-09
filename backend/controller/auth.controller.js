

  import { hashPassword ,validateEmail,validatePassword} from "../utility/user.utility.js";
  
  import errorHandler from '../utility/errorHandler.utility.js'
 
  
  import User from "../models/user.model.js";


const createAccount = async (req, res, next) => {
    const { firstName,lastName, email,phoneNumber, password,profileImage } = req.body;
  
    if (!firstName || !lastName || !email || !phoneNumber|| !password || !profileImage) {
      return next(errorHandler(500, "All fields are required"));
    }
  
    try {
     
  
      // Check if user already exists
      const existsEmail = await User.findOne({ email: email });
      if (existsEmail) {
        return next(errorHandler(403, "user already exists"));
      }

    //   check phoneNumber--
    const existPhone=await User.findOne({phoneNumber:phoneNumber})
    if (existPhone) {
        return next(errorHandler(403, "use another mobile number"));
      }
  
    
  
      // Validate password
      const verificationResult = validatePassword(password);
      if (!verificationResult) {
        return next(
          errorHandler(
            403,
            "Invalid password! Password must be 8 characters long including one capital letter, special character, and number"
          )
        );
      }
  
      // Hash password
      const hashedPassword = hashPassword(password);
      if (!hashedPassword) {
        // return next(errorHandler(500, 'Something went wrong, please try again later'));
        return res.json({ success: false, msg: "something went wrong" });
      }
  
      // Create new user
      const newUser = new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword,
        profileImage
      });
  
      // Save user to database
      const user = await newUser.save();
  
   
      res.status(201).json({ success: true, msg: "user created", user });
    } catch (error) {
      // Handle errors
      console.log(`User signup failed ${error}`);
      return next(errorHandler(500, "Something went wrong"));
    }
  };

  export {createAccount}