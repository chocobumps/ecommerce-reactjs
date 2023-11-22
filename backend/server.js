import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import products from './data/products.js';

dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API is running....');
  /* '.send' also converts to JSON content */
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => String(p._id) === req.params.id);
  res.json(product);
});

const PORT =
  process.env.PORT ||
  5000; /*setting the port on what is on .env file. if PORT is not found, port would be 5000*/

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
