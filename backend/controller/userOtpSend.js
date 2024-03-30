const User = require("../models/UserSchema");
const userotp = require("../models/userOtpSchema");
const emailValidator = require("email-validator");
const nodemailer = require("nodemailer");

// email config
const tarnsporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

exports.userOtpSend = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Invalid Credentials",
    });
  }
  const validEmail = emailValidator.validate(email);

  if (!validEmail) {
    return res.status(400).json({
      success: false,
      message: "Please enter valid email id",
    });
  }

  try {
    const preuser = await User.findOne({ email });

    if (preuser) {
      const OTP = Math.floor(100000 + Math.random() * 900000);
      console.log(OTP);

      const existEmail = await userotp.findOne({ email });
      console.log(existEmail);

      if (existEmail) {
        const updateOtp = await userotp.findByIdAndUpdate(
          { _id: existEmail._id },
          { otp: OTP },
          { new: true }
        );
        await updateOtp.save();

        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Mom's Magic User Verification",
          text: `Hii ${preuser.name} Your OTP for Account Verification is ${OTP}. This OTP is valid for 10 minutes only. -Team Mom's Magic`,
        };

        tarnsporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            return res.status(400).json({
              success: false,
              message: "email not send",
              error: "email not send",
            });
          } else {
            console.log("Email sent", info.response);
            return res
              .status(200)
              .json({ success: true, message: "OTP sent Successfully !" });
          }
        });
      } else {
        const otpInfo = userotp({
          email,
          otp: OTP,
        });

        await otpInfo.save();

        const mailOptions = {
          from: process.env.EMAIL,
          to: email,
          subject: "Mom's Magic User Verification",
          text: `  
          Hii ${preuser.name} Your OTP for Account Verification is ${OTP}. This 
          OTP is valid for 10 minutes only. -Team Mom's Magic`,
        };

        tarnsporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            return res.status(400).json({
              success: false,
              message: "email not send",
              error: "email not send",
            });
          } else {
            console.log("Email sent", info.response);
            return res
              .status(200)
              .json({ success: true, message: "Email sent Successfully" });
          }
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message:
          "Account Does Not exits with this Email id Please Continue to Register",
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
      message: "Internal Server Error !",
    });
  }
};
