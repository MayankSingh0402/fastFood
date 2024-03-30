// when user want to see their order data 

const Order = require("../models/orderSchema");

exports.myOrderData = async (req, res) => {
  try {
    const userEmail = req.body.email;

    if (!userEmail) {
      return res
        .status(400)
        .json({ error: "Email not provided in the request body" });
    }

    const orderData = await Order.findOne({ 'email': userEmail });
    //  console.log(orderData);
    if (!orderData) {
      return res
        .status(404)
        .json({ error: "Order data not found for the provided email" });
    }

    res.json({ orderData:orderData });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
};
