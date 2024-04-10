
import { validateEmail,validatePassword,hashPassword } from "../utility/user.utility.js";
import errorHandler from "../utility/errorHandler.utility.js";
import User from "../models/user.model.js";


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

const updateAccount = async (req, res, next) => {
    const { firstName,lastName, email,phoneNumber, profilePicture,} = req.body;
    console.log(firstName,lastName,email,phoneNumber,profilePicture)
    const { userID } = req.params;
    console.log(userID)
    // console.log(profilePicture)
    // console.log(`ye raha username aapka ${username} and ${email}`);
  
    try {
      if (req.user.userId !== userID) {
        return next(errorHandler(400, "you are not authenticated"));
      }

      const check = await User.findOne({ _id: userID });
      console.log('ye hai id',check);
  
      if (email) {
        const checkValidEmail = validateEmail(email);
        if (!checkValidEmail) {
         return  next(errorHandler(403, "please enter valid email"));
        }
      } 
  
      //  update user--
  
      const updatedUser = await User.findByIdAndUpdate(
        userID,
        {
          $set: {
            firstName:firstName,
            lastName:lastName,
            email:email,
            phoneNumber:phoneNumber,
            profileImage: profilePicture,
          },
        },
        { new: true }
      );
      console.log(updatedUser)
  
    //   const { password: pass, ...user } = updatedUser._doc;
  
      res
        .status(200)
        .json({ success: true, msg: "user successfully updated", updatedUser });
    } catch (error) {
      console.log(error);
      next(errorHandler(500, "internal server error"));
    }
  };

  const changePassword=async(req,res,next)=>{
      const {userID}=req.params
      const {newPassword}=req.body
      try {
        
        
        if(req.user.userId.trim()!==userID.trim()){
          return next(errorHandler(403,'unauthorized request'))
        }
        if(!newPassword){
          return next(errorHandler(402,'password field empty'))
        }

         // Validate password
      const verificationResult = validatePassword(newPassword);
      if (!verificationResult) {
        return next(
          errorHandler(
            403,
            "Invalid password! Password must be 8 characters long including one capital letter, special character, and number"
          )
        );
      }
  
      // Hash password
      const hashedPassword = hashPassword(newPassword);
      if (!hashedPassword) {
        // return next(errorHandler(500, 'Something went wrong, please try again later'));
        return res.json({ success: false, msg: "something went wrong" });
      }

      const updateUserPass = await User.findOneAndUpdate(
        { _id: userID.trim()},
        { $set: { password: hashedPassword } },
        {new:true}
      );

      res.status(200).json({success:true,msg:"password changed successfully"})

        
      } catch (error) {
        console.log(`change password failed ${error.message}`)
        next(errorHandler(500,'internal server error'))
      }
  }

 


  export {updateAccount,logOut,changePassword}