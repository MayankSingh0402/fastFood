const express = require("express");
const AuthRouter = express.Router();
const { signupUser, uploadMiddleware } = require("../controller/signupUser.js");
const { loginUser } = require("../controller/loginUser.js");
const { foodData } = require("../controller/foodData.js");
const { orderData } = require("../controller/orderData.js");
const { myOrderData } = require("../controller/myOrderdata.js");
const { getlocation } = require("../controller/getLocation.js");
const { forgotPassword } = require("../controller/forgotPassword.js");
const { deleteUser } = require("../controller/deleteUser.js");
const { getUserDetails } = require("../controller/getUserDetails.js");
const { updatePhoneNumber } = require("../controller/updatePhoneNumber.js");
const { updateAddress } = require("../controller/updateAddress.js");
const { feedback } = require("../controller/feedback.js");
const { userOtpSend } = require("../controller/userOtpSend.js");
const { otpLogin } = require("../controller/otpLogin.js");
AuthRouter.post("/createuser", uploadMiddleware, signupUser);
AuthRouter.post("/login", loginUser);
AuthRouter.post("/foodData", foodData); // fetch food data
AuthRouter.post("/orderData", orderData); // user order data
AuthRouter.post("/myOrderData", myOrderData); // fetch user order data
AuthRouter.post("/getlocation", getlocation);
AuthRouter.post("/forgotPassword", forgotPassword);
AuthRouter.post("/deleteUser", deleteUser);
AuthRouter.post("/getUserDetails", getUserDetails); // get user details in profile
AuthRouter.post("/updatePhoneNumber", updatePhoneNumber);
AuthRouter.post("/updateAddress", updateAddress);
AuthRouter.post("/contact", feedback);
AuthRouter.post("/sendotp", userOtpSend); // send otp to user
AuthRouter.post("/otplogin", otpLogin); // login with otp
module.exports = AuthRouter;
