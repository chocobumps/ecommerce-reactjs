import mongoose from 'mongoose';

/*async was used because in MongoDb, when methods(.connect,.find, etc.) are used, it returns a promise*/
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    /*below are must add options to avoid having warnings in the console */

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
    /*passing 1 will exit the process with error*/
  }
};

export default connectDB;
