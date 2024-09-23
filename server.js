// const connectDB = require('./config/db')

const express = require('express');
const mongoose = require('mongoose');
// const config = require('./config/database');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const port = process.env.PORT || 3000;
const uri = "mongodb+srv://esakkimuthurajm12:I6gX1kYc83fEgnti@cluster0.oewf6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
// Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Parse JSON request bodies
app.use(express.json());

// Use routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

console.log('Hello peter parker');
// connectDB()