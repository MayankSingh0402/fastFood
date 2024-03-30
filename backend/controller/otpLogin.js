const User = require("../models/UserSchema");
const userotp = require("../models/userOtpSchema");

exports.otpLogin = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({
      success: false,
      message: "Invalid Credentials",
    });
  }
  try {
    const otpverification = await userotp.findOne({ email });

    if (otpverification.otp == otp) {
      const user = await User.findOne({ email });

      const authToken = user.jwtToken();

      const cookieOption = {
        maxAge: 24 * 60 * 60 * 1000, // hours (24 hours * 60 minutes/hour * 60 seconds/minute * 1000 milliseconds/second).
        // httpOnly: true, // cookie ko frontend se access nhi kr skte hai
        secure: true, // Set to true if your app is served over HTTPS
      };

      res.cookie("token", authToken, cookieOption);

      return res.status(200).json({
        success: true,
        message: "Login Successful",
        // userAddress: user.location,
        userName: user.name,
        authToken, // return the token to frontend so he token can be stored locally and used for authenticating subsequent requests.
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      error: err,
      message: "Internal Server Error",
    });
  }
};
