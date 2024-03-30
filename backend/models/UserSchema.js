const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: [3, "Password must be between 8 and 12 characters"],
    maxlength: [20, "Name Password must be between 3 and 20 characters"],
    trim: true,
  },
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Please enter your email"],
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    trim: true,
    minlength: [8, "Password must be at least 8 characters "],
    maxlength: [12, "Password must be between 8 and 12 characters"],
    select: false,
  },
  location: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    default: "1234567890",
    required: true,
  },
  // img: {
  //   type: String,
  //   default:
  //     "https://th.bing.com/th/id/OIP.F3zGG73Ua5hxRAhIEoPmSAHaHa?w=179&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  // },
  img: {
    data: Buffer,
    contentType: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// custom middleWare to hash the password and phone Number
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  if (this.isModified("phoneNumber")) {
    this.phoneNumber;
  }

  if (this.isModified("location")) {
    this.location;
  }

  return next();
});

UserSchema.methods = {
  jwtToken() {
    try {
      return JWT.sign(
        { _id: this._id, email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE }
      );
    } catch (error) {
      // Handle the error, e.g., log it or throw a custom error
      throw new Error(`Error signing JWT: ${error.message}`);
    }
  },
};

module.exports = mongoose.model("user", UserSchema);
