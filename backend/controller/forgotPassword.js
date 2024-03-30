const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");

exports.forgotPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  console.log(req.body);
  if (!email || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  if (newPassword.length < 8 || newPassword.length > 12) {
    return res.status(400).json({
      success: false,
      message: "Password must be between 8 and 12 characters",
    });
  }
  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Account does not exist with this email",
      });
    }

    if ((await bcrypt.compare(newPassword, user.password)) == true) {
      return res.status(400).json({
        success: false,
        message: "Please enter a password that you haven't used before",
      });
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
