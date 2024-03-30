const User = require("../models/UserSchema");

exports.getUserDetails = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email }).select(
      "+name +location +phoneNumber +img"
    );

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Account Does Not exits with this Email id Please Continue to Register",
      });
    }
    // When sending user details from the backend to the frontend,
    // convert the binary blob to a base64-encoded string.
    const userImage = {
      contentType: user.img.contentType,
      data: user.img.data.toString("base64"),
    };
    res.status(200).json({
      success: true,
      message: " Fetch User Details Successful",
      userAddress: user.location,
      userName: user.name,
      userPhoneNumber: user.phoneNumber,
      userImage: userImage,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
