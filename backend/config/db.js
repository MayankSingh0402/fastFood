const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);

    // Fetch data from the "food_items" and foodCategory collections
    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    const data = await foodItemsCollection.find({}).toArray();
    const foodCategoriesCollection =
      mongoose.connection.db.collection("foodCategory");
    const data1 = await foodCategoriesCollection.find({}).toArray();

    // Store the fetched data globally as arrays
    global.food_items = Array.isArray(data) ? data : [];
    global.foodCategory = Array.isArray(data1) ? data1 : [];
    
    // Print the fetched data
    // console.log(global.food_items);
  } catch (err) {
    console.error(err.message);
    throw new Error("Database Connection Failed");
  }
};

module.exports = connectDB;
