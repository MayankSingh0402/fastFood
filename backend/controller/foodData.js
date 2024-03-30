// use of this file is to send the food data to the frontend and display on the screen 


const express = require("express");
exports.foodData = async (req, res) => {
  try {
    // we send the data to the frontend in the form of array ( because we can't use .map function on objects, so we need to convert it to an array )

    // if (Array.isArray(global.food_items)) {
    //   console.log(global.food_items.length);
    //   console.log("yes it is array ");
    // } else {
    //   console.log(" no it is not array ");
    // }

    res.send([global.food_items, global.foodCategory]);

    // res.status(200).json(
    //   {
    //     food_items: global.food_items,
    //     foodCategory: global.foodCategory
    //   }
    // );
  } catch (err) {
    console.log(err.message);
    res.send("Server Error");
  }
};
