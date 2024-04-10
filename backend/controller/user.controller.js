
import { validateEmail,validatePassword,hashPassword } from "../utility/user.utility.js";
import errorHandler from "../utility/errorHandler.utility.js";
import User from "../models/user.model.js";

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

 


  export {updateAccount}