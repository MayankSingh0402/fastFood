const User = require("../models/UserSchema");
const nodemailer = require("nodemailer");
const emailValidator = require("email-validator");
const userfeedback = require("../models/feedbackSchema");

const tarnsporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

exports.feedback = async (req, res) => {
  const { name, email, feedback } = req.body;
  if (!name || !email || !feedback) {
    return res.status(422).json({
      success: false,
      message: "All fields are Required",
    });
  }
  // email validation
  if (!emailValidator.validate(email)) {
    return res.status(422).json({
      success: false,
      message: "Please enter valid email id",
    });
  }
  try {
    const user = await User.findOne({ email });
    // when user is not found
    if (!user) {
      return res.status(422).json({
        success: false,
        message: "Please Create an account first then contact us",
      });
    }
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: `Team Mom's Magic`,
      text: `hii ${user.name} Thank You for Your Feedback, we will get back to you soon`,
    };
    const existEmail = await userfeedback.findOne({ email });
    if (existEmail) {
      const updateFeedback = await userfeedback.findByIdAndUpdate(
        { _id: existEmail._id },
        { feedback: feedback },
        { new: true }
      );
    } else {
      const newFeedback = new userfeedback({
        name,
        email,
        feedback,
      });
      // await new feedback(res.body).save();
      await newFeedback.save();
    }
    tarnsporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("error", error);
        return res.status(400).json({
          success: false,
          message: "Internal Server Error",
        });
      }
    });
    return res.status(200).json({
      success: true,
      message: "Thank You for Your Feedback , we will get back to you soon",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
