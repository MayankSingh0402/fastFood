const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userOtpSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  otp: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("userotp", userOtpSchema);
