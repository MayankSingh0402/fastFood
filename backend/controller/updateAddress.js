const User = require("../models/UserSchema");

exports.updateAddress = async (req, res) => {
  const { email, newAddress } = req.body;

  if (!email || !newAddress) {
    return res.status(422).json({ error: "Please fill all the fields" });
  }

  try {
    const user = await User.findOne({ email }).select("+location");

    if (!user) {
      return res.status(422).json({ error: "User does not exist" });
    }

    if (user.location == newAddress) {
      return res.status(400).json({
        success: false,
        message:
          "The entered Address already exists. Please Enter a different Address",
      });
    }
    user.location = newAddress;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
