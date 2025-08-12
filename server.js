const express = require('express');
const cors = require('cors');
const path = require('path');

// --- APP INITIALIZATION ---
const app = express();
const PORT = process.env.PORT || 3001; // Use environment variable for port, or default to 3001

// --- IN-MEMORY DATA STORES ---
// We use Maps for efficient key-based lookups.
global.rooms = new Map();       // Key: roomId, Value: { id, name, isPublic, passwordHash, creatorId, users: Set<userId> }
global.users = new Map();       // Key: userId, Value: { id, alias, currentRoomId }
global.roomNames = new Map();   // Key: normalized room name, Value: roomId (for fast name lookups)
global.messages = new Map();    // Key: roomId, Value: [messageObject]

// --- MIDDLEWARE SETUP ---
// Enable Cross-Origin Resource Sharing for your frontend (chat.nx7.tech)
app.use(cors({
  origin: ['http://localhost:3000', 'https://chat.nx7.tech'], // Add your frontend origins here
  methods: ['GET', 'POST'],
}));

// Parse incoming JSON request bodies
app.use(express.json());

// Serve uploaded image files statically
// This makes the /uploads directory accessible via HTTP
// e.g., http://<your-backend-url>/image-name.png
app.use('/', express.static(path.join(__dirname, 'uploads')));


// --- API ROUTES (We will build these next) ---
const roomRoutes = require('./routes/rooms');
const messageRoutes = require('./routes/messages');
// const uploadRoutes = require('./routes/upload'); // We'll add this when we do uploads

app.use('/api/rooms', roomRoutes);
app.use('/api/messages', messageRoutes);
// app.use('/api/upload', uploadRoutes);


// --- BASIC ROOT ENDPOINT ---
// A simple health-check endpoint to confirm the server is running
app.get('/', (req, res) => {
  res.status(200).send('AnonRoom Backend is running!');
});

// --- START THE SERVER ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});