// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize app
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/bgmi', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

  mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/bgmi?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


// Player Schema (Model)
const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  kills: { type: Number, required: true }
});

const Player = mongoose.model('Player', playerSchema);

// API Route: Save player data
app.post('/api/player', async (req, res) => {
  const { name, kills } = req.body;

  if (!name || !kills) {
    return res.status(400).json({ message: "Both name and kills are required" });
  }

  try {
    const newPlayer = new Player({ name, kills });
    await newPlayer.save();
    res.status(200).json({ message: "Player saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving player", error });
  }
});

// Server Start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
