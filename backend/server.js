const express = require('express');
const connectDB = require('./config/db'); // Ensure the correct path to db.js
const userRoutes = require('./routes/users');
const multer = require('multer');
const path = require('path');
const User = require('./models/User'); // Ensure the correct path to the User model
const cors = require('cors'); // Import the cors package

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Routes
app.use('/users', userRoutes);

// Resume Upload Route
app.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    const { email, phone } = req.body; // Extract email and phone from the request body
    const resumePath = req.file.path; // Path to the uploaded file

    // Check if the user already exists by email
    let user = await User.findOne({ email });

    if (user) {
      // Update the existing user's resume and phone
      user.phone = phone;
      user.resume = resumePath;
    } else {
      // If user does not exist, create a new user
      user = new User({
        email,
        phone,
        resume: resumePath
      });
    }

    // Save the user details (create or update)
    await user.save();

    res.status(200).json({ message: 'Resume uploaded successfully', user });
  } catch (error) {
    console.error('Error uploading resume:', error);
    res.status(500).json({ error: 'Error uploading resume' });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
