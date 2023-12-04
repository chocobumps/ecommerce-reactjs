/*this is completely separate from the database*/
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users';
import products from './data/products.js';
import User from './models/userModel';
import Product from './models/productModel';
import Order from './models/orderModel';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

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

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

/*function for destroying the data*/
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

/*typing 'node backend/seeder' in the terminal to import the data, add '-d' to destroy the data. this code runs destrotData() when '-d' is typed, else, importData() runs */
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
