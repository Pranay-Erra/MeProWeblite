const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const uploadToBlob = require('./uploadToBlob');
const Pitch = require('./models/Pitch');

const app = express();
const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
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
    const user = await User.findOne({ email, password }); // Note: In production, always hash passwords
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    res.json({ message: 'Login successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload route
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const fileBuffer = req.file?.buffer;
    const fileName = req.file?.originalname;
    const { category, note } = req.body;

    if (!fileBuffer || !fileName) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileUrl = await uploadToBlob(fileBuffer, fileName);

    const newPitch = new Pitch({ fileName, category, note, fileUrl });
    await newPitch.save();

    res.json({ message: 'Pitch uploaded successfully', url: fileUrl });
  } catch (error) {
    console.error('Upload failed:', error.message);
    res.status(500).json({ error: 'Upload failed' });
  }
});

// Health check endpoint
app.get('/hello', (req, res) => {
  res.status(200).json({ message: 'Hello! Server is healthy ✅' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
