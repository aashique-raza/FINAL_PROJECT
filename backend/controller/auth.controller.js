

  import { hashPassword ,validateEmail,validatePassword,generateRandomPassword} from "../utility/user.utility.js";
  
  import errorHandler from '../utility/errorHandler.utility.js'
 
  
  import User from "../models/user.model.js";
  import jwt from 'jsonwebtoken'
  import bcrypt from 'bcrypt'


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

  const loginAccount = async (req, res, next) => {
    const { email, password } = req.body;
    let number
    try {
      if (!email || !password) {
        return next(errorHandler(403, "fill the empty fileds"));
      }
  
      // check if email is actually a number
      if ( typeof email === 'number') {
        number = email;
      }
      const userExists = await User.findOne({
        $or: [{ email: email }, { phoneNumber: number }],
      });
  
      if (!userExists) {
        return next(errorHandler(401, "user not found"));
      }
  
      // password verify
  
      const checkPassword = await bcrypt.compare(password, userExists.password);
      console.log(checkPassword)
      if (!checkPassword) {
        return next(errorHandler(401, "username or password invalid"));
      }
  
      // Generate JWT token with user data and expiration time of 1 day
      const token = jwt.sign(
        { userId: userExists._id },
        process.env.JWT_SECRET_KEY
        
      );
  
      // Set token as a cookie with name 'auth_token'
      res.cookie("token", token, );
  
      const { password: pass, ...user } = userExists._doc;
  
      res.status(201).json({ success: true, msg: "login seccessfully", user,token });
    } catch (error) {
      console.log(`failed login ${error}`);
      next(errorHandler(500, "internal server error"));
    }
  };

  const logOut=async(req,res)=>{
    try {
        // Clear the token cookie
        res.clearCookie("token");
    
        res.status(200).json({ success: true, msg: "Logged out successfully" });
      } catch (error) {
        console.log(`Failed logout ${error}`);
        next(errorHandler(500, "Internal server error"));
      }
  }

  const google = async (req, res, next) => {
    const { email, firstName, profileImage } = req.body;
    try {
      const userexists = await User.findOne({ email });
      if (userexists) {
        const token = jwt.sign(
          { userId: userexists._id },
          process.env.JWT_SECRET_KEY
        );
        const { password, ...user } = userexists._doc;
        // Set cookie with HTTPOnly flag
        res.cookie("token", token, { httpOnly: true });
        res.json({ success: true, msg: "login successfull", user });
      } else {
        const generatedPassword = generateRandomPassword();
  
        const hashedPassword = hashPassword(generatedPassword);
        const newUser = new User({
            firstName:
            firstName,
          email,
          password: hashedPassword,
          profilePicture: profileImage,
        });
        const savedUser = await newUser.save();
        const token = jwt.sign(
          { userId: savedUser._id },
          process.env.JWT_SECRET_KEY
        );
        // Set cookie with HTTPOnly flag
        res.cookie("token", token, { httpOnly: true });
        const { password, ...user } = savedUser._doc;
        res.json({ success: true, msg: "login successfull", user });
      }
    } catch (error) {
      console.log(`google auth failed ${error}`);
      next(errorHandler(500, "internal server error"));
    }
  };

  export {createAccount,loginAccount,logOut,google}