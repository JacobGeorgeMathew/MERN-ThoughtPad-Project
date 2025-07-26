import express from "express";
import User from "../model/User.js";

const router = express.Router();

// Get current user info
router.get('/me', async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    // Return user data (excluding sensitive info like password)
    const userData = {
      id: req.user._id,
      fullName: req.user.fullName,
      email: req.user.email
    };
    
    res.status(200).json({ user: userData });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: "Server error" });
  }
});

// router.get('/signin', (req, res) => {
//   // Your existing code
// });

// router.get('/signup', (req, res) => {
//   // Your existing code
// });

router.post('/signup', async (req, res) => {
  try {
    const {fullName, email, password} = req.body;
    await User.create({
      fullName,
      email,
      password
    });
    res.status(200).json({message: "User account created successfully"});
  } catch (error) {
    console.error('Signup error:', error);
    res.status(400).json({message: error.message || "Error creating user account"});
  }
});

router.post('/signin', async (req, res) => {
  try {
    const {email, password} = req.body;
    const token = await User.matchPasswordAndGenerateToken(email, password);
   //console.log('Generated token:', token);
    
    // Set cookie with security options
    res.status(200).clearCookie('token')
       .cookie('token', token, {
         httpOnly: true,        // Prevents XSS attacks
         secure: process.env.NODE_ENV === 'production', // HTTPS only in production
         sameSite: 'lax',       // CSRF protection
         maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in milliseconds
       })
       .json({
         message: "Sign in successful",
         user: req.user,
       });
  } catch (error) {
    console.error('Signin error:', error);
    res.status(400).json({
      message: error.message || "Invalid credentials"
    });
  }
});

// Logout endpoint
router.post('/logout', (req, res) => {
  res.clearCookie('token')
     .status(200)
     .json({ message: "Logged out successfully" });
});

export default router;