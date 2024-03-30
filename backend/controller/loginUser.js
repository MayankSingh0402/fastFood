const User = require("../models/UserSchema");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const user = await User.findOne({ email }).select(
      "+password +name +location"
    );
    // console.log(user);

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Account Does Not exits with this Email id Please Continue to Register",
      });
    }
    if ((await bcrypt.compare(password, user.password)) == false) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    // const authToken = user.jwtToken();
    const authToken = "asfasfasfsafsf";
    user.password = undefined;

    // const cookieOption = {
    //   maxAge: 24 * 60 * 60 * 1000, // hours (24 hours * 60 minutes/hour * 60 seconds/minute * 1000 milliseconds/second).
    //   // httpOnly: true, // cookie ko frontend se access nhi kr skte hai
    //   secure: true, // Set to true if your app is served over HTTPS
    // };

    // res.cookie("token", authToken, cookieOption);

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      // userAddress: user.location,
      userName: user.name,
      authToken, // return the token to frontend so he token can be stored locally and used for authenticating subsequent requests.
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
