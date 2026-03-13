const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - IMPORTANT ORDER
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Backend is running perfectly!',
    timestamp: new Date().toISOString()
  });
});

// Import routes AFTER middleware
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;

if (!mongoUri) {
  console.error('❌ MongoDB Connection Failed: Missing MONGODB_URI or MONGO_URI');
  process.exit(1);
}

mongoose.connect(mongoUri)
  .then(() => {
    console.log('✅ MongoDB Connected!');
    console.log('📊 Database ready for products');
  })
  .catch(err => {
    console.error('❌ MongoDB Connection Failed:', err.message);
  });

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
  console.log(`📡 Products API: http://localhost:${PORT}/api/products`);
});