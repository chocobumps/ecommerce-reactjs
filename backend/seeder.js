/*this is completely separate from the database*/
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

/*putting await before connectBD() ensures the database connection is established first before moving on */
await connectDB();

/*function for importing the data. async is used because everything in mongoose returns a promise */
const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    /*.deleteMany wipes out the existing data from the models*/

    const createdUsers = await User.insertMany(users);
    /*createdUsers constains is an array containing all users in users.js */

    const adminUser = createdUsers[0]._id;
    /*adminUser contains the first user in users.js */

    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser };
    });
    /*products array is mapped and for each product it returns all the data(spread operator) + adding a "user: adminUser" field in each product*/

    await Product.insertMany(sampleProducts);
    /*sampleProducts is inserted in the Product model */

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

/*function for destroying the data*/
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

/*typing 'node backend/seeder' in the terminal to import the data, add '-d' to destroy the data. this code runs destrotData() when '-d' is typed, else, importData() runs */
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
