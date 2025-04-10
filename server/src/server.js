const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const multer = require('multer');
const uploadToBlob = require('./uploadToBlob');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const Pitch = require('./models/Pitch');

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



// app.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file received' });
//     }

//     const fileBuffer = req.file.buffer;
//     const fileName = req.file.originalname;

//     const fileUrl = await uploadToBlob(fileBuffer, fileName);
//     res.json({ url: fileUrl });
//   } catch (error) {
//     console.error('Upload failed:', error);
//     res.status(500).json({ error: 'Upload failed', details: error.message });
//   }
// });

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const fileBuffer = req.file?.buffer;
    const fileName = req.file?.originalname;
    const { category, note } = req.body;

    if (!fileBuffer || !fileName) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileUrl = await uploadToBlob(fileBuffer, fileName);

    // Save pitch info to MongoDB
    const newPitch = new Pitch({
      fileName,
      category,
      note,
      fileUrl,
    });

    await newPitch.save();

    res.json({ message: 'Pitch uploaded successfully', url: fileUrl });
  } catch (error) {
    console.error('Upload failed:', error.message);
    res.status(500).json({ error: 'Upload failed' });
  }
});
app.get('/hello', (req, res) => {
  res.status(200).json({ message: 'Hello! Server is healthy ✅' });
});


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
