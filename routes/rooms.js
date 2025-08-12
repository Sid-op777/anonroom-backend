const express = require('express');
const router = express.Router();
const { normalizeRoomName } = require('../utils/validators');

// POST /api/rooms/check-availability
// Checks if a room name is already taken (case-insensitive).
router.post('/check-availability', (req, res) => {
  // 1. Get the room name from the request body
  const { name } = req.body;

  // 2. Basic validation: ensure the name is a non-empty string
  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ message: 'Room name is required.' });
  }

  // 3. Normalize the name for a consistent check (e.g., "My Room" -> "my room")
  const normalizedName = normalizeRoomName(name);

  // 4. Check if the normalized name exists as a key in our global roomNames Map
  if (global.roomNames.has(normalizedName)) {
    // If it exists, the name is NOT available
    res.status(200).json({ available: false });
  } else {
    // If it doesn't exist, the name IS available
    res.status(200).json({ available: true });
  }
});

// We will add more room routes below this line later

module.exports = router;