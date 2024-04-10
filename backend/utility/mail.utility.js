import nodemailer from 'nodemailer'

const sendMail=async(user,token)=>{
    // console.log(email)
    // console.log(user.email,user._id)
    try {
        // Create a nodemailer transporter using your email service credentials
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS:true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: process.env.AUTH_USER,
          pass: process.env.AUTH_PASSWORD,
        },
      });
      const link=`http://localhost:5173/reset-password/?id=${user._id}&&reset=${token}`
      // Set up email data
      const mailOptions = {
        from: process.env.AUTH_USER,
        to: user.email,
        subject: 'Password Reset Request',
        html: ` <a href=${link}>click here to reset your password</a>`,
      };
    
      // Send the email
      const result = await transporter.sendMail(mailOptions);
    
    //   console.log('Email sent:', result);
      return result
        
      } catch (error) {
        console.log(`email sending failed: ${error}`)
      }

}




export default sendMail