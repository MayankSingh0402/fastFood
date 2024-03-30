const User = require("../models/UserSchema");
exports.updatePhoneNumber = async (req, res) => {
  const { email, newPhoneNumber } = req.body;

  if (!newPhoneNumber) {
    return res.status(400).json({
      success: false,
      message: "Phone number is required",
    });
  }

  if (newPhoneNumber.length != 10) {
    return res.status(400).json({
      success: false,
      message: "Phone number must be 10 digits",
    });
  }

  try {
    const user = await User.findOne({ email }).select("+phoneNumber").exec();

    if (user.phoneNumber == newPhoneNumber) {
      return res.status(400).json({
        success: false,
        message:
          "The entered phone number already exists. Please choose a different phone number",
      });
    }

    user.phoneNumber = newPhoneNumber;
    await user.save();
    return res.status(200).json({
      success: true,
      message: "Phone number updated successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
