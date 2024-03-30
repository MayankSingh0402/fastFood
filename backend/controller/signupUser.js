const User = require("../models/UserSchema");
const emailValidator = require("email-validator");
const multer = require("multer");
const path = require("path");

// ----------->  store image in the uploads folder ---------<
/*
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});
*/

// save it as a binary blob in the database
// ----------->  store image in the database instead of stored in the upload folder ---------<

const storage = multer.memoryStorage(); // Use memory storage to store the file as a Buffer
const upload = multer({ storage: storage });

// Middleware for handling image upload
exports.uploadMiddleware = upload.single("img");

exports.signupUser = async (req, res) => {
  const { name, email, password, confirmPassword, location } = req.body;
  // const imgPath = req.file.path;
  const imgBuffer = req.file.buffer; // Get the image data as a Buffer
  console.log(name, email, password, confirmPassword, location, imgBuffer);
  if (
    !name ||
    !email ||
    !password ||
    !confirmPassword ||
    !location ||
    !imgBuffer
  ) {
    return res.status(400).json({
      name,
      email,
      password,
      confirmPassword,
      location,
      message: "All fields are required",
    });
  }

  // Check if password and confirm password match
  if (password !== confirmPassword) {
    return res.status(400).json({
      success: false,
      message:
        "Passwords do not match. Please ensure your password and confirm password are the same.",
    });
  }

  // Check name length
  if (name.length < 3 || name.length > 20) {
    return res.status(400).json({
      success: false,
      message: "Name must be between 3 and 20 characters",
    });
  }

  // Check password length
  if (password.length < 8 || password.length > 12) {
    return res.status(400).json({
      success: false,
      message: "Password must be between 8 and 12 characters ",
    });
  }

  // Check address length
  if (location.length < 3) {
    return res.status(400).json({
      success: false,
      message: "Address must be at least 3 characters",
    });
  }

  const validEmail = emailValidator.validate(email);

  if (!validEmail) {
    return res.status(400).json({
      success: false,
      message: "Please enter a valid email id",
    });
  }

  // create a new user and save to the database
  try {
    const userInfo = new User({
      name,
      email,
      password,
      location,
      //  img: imgPath, // Save the image path
      img: {
        data: imgBuffer,
        contentType: req.file.mimetype, // Save the content type of the image
      },
    });

    const result = await userInfo.save();

    // send the response to frontend
    res.status(200).json({
      success: true,
      message: "Registration Successful. Continue to Login",
      result,
    });
  } catch (err) {
    if (err.code === 11000) {
      // if a duplicate entry is detected (if user already exists)
      return res.status(400).json({
        success: false,
        message: "An account already exists with this email",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
