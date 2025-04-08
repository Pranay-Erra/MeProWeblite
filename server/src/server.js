const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('DB error:', err));

// User model
const User = mongoose.model('User', new mongoose.Schema({
  email: String,
  password: String,
}));

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email, password }); // for demo only, use hashed passwords in production
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../ui/build')));

// Serve frontend for all routes not starting with /api
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../ui/build', 'index.html'));
// });

// Serve frontend for all routes not starting with /api
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../ui/build', 'index.html'));
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
