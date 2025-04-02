const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/register");
const TransportationProvider = require("../models/TransportationProvider");

// Register route
router.post("/create", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // 1. Hash password for User model
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. Create User (auth record)
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
    });
    console.log("Registering user:", username, email);
    await newUser.save();
    console.log("✅ User saved");

    // 3. Create TransportationProvider (profile record)
    const newProvider = new TransportationProvider({
      Name: username,
      Email: email,
      Password: password, // will be hashed by schema pre-save hook
      Phone: "000-000-0000", // ❗ temporary placeholder — update later
      ProviderType: "Transportation Provider",
      Portfolio: { PastWorkMedia: [] },
      Reviews: [],
      ProfilePhoto: "",
    });

    await newProvider.save();
    console.log("✅ Provider saved");
    // 4. Create JWT token
    const token = jwt.sign(
      {
        userID: newUser._id,
        username: newUser.username,
        email: newUser.email,
        providerID: newProvider._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User and provider created",
      token,
      userID: newUser._id,
    });
  } catch (error) {
    if (error.code === 11000) {
      const duplicateKey = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        error: `Duplicate ${duplicateKey}. That ${duplicateKey} is already taken.`,
      });
    }
  
    console.error("❌ Registration error:", error.message);
    res.status(500).json({ error: "Failed to register user and provider" });
  }
});



// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.status(400).json('Invalid credentials');

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).json('Invalid credentials');

  const token = jwt.sign(
    { userID: user._id, username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token, userID: user._id });
});

module.exports = router;
