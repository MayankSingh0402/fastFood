const User = require("../models/UserSchema");
const OrderSchema = require("../models/orderSchema");
const bcrypt = require("bcrypt");

exports.deleteUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      // If user is not found
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if ((await bcrypt.compare(password, user.password)) == false) {
      return res.status(400).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const deletedUser = await User.findByIdAndDelete(user._id);

    // when user delete his account, his orders will be deleted too
    const userOrders = await OrderSchema.findOne({ email: email });
    if (userOrders) {
      await OrderSchema.findByIdAndDelete(userOrders._id);
    }

    // Successful deletion
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    // Handle other errors
    return res.status(400).json({
      success: false,
      message: "Internal server error",
    });
  }
};
