require('dotenv').config();
const express = require('express');
const path = require("path");
const app = express();
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');
const clientRoutes = require('./routes/clientRoutes');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const Chat = require("./models/chat.js");
const http = require('http');
const { Server } = require('socket.io');
const multer = require("multer");
const cors = require('cors');
const { google } = require('googleapis');

const dbUrl = 'mongodb://127.0.0.1:27017/Manikarnika';

// ======================== Database Connection =======================
async function main() {
    await mongoose.connect(dbUrl);
}
main()
    .then(() => console.log("✅ MongoDB connected"))
    .catch(err => console.log("❌ MongoDB connection error:", err));

// ======================== App Setup ================================
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

// ======================== Session & Passport ========================
const sessionConfig = {
    secret: "thisshouldbeabettersecret!",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ======================== Flash Middleware ==========================
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    next();
});

// ======================== Routes ===================================
app.use('/', publicRoutes);
app.use('/admin', adminRoutes);
app.use('/client', clientRoutes);

// ======================== Multer File Upload =======================
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "public/uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    res.json({ fileUrl: `/uploads/${req.file.filename}`, fileType: req.file.mimetype });
});

// ======================== Socket.IO =================================
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Store connected clients
const connectedClients = new Map();

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Admin joins admin room
    socket.on("joinAdmin", () => {
        socket.join("admin");
        console.log("Admin joined admin room");
        
        // Send current connected clients to admin
        const clients = Array.from(connectedClients.values());
        socket.emit("connectedClients", clients);
    });

    // Client joins their room
    socket.on("joinClientRoom", async (userData) => {
        const { userId, userName } = userData;
        const room = `client_${userId}`;
        
        // Store client info
        connectedClients.set(userId, {
            clientId: userId,
            clientName: userName,
            room: room,
            socketId: socket.id
        });

        socket.join(room);
        socket.userId = userId;
        socket.userName = userName;
        socket.room = room;

        console.log(`Client ${userName} joined room: ${room}`);

        // Notify admin about new client
        io.to("admin").emit("newClient", { 
            clientId: userId, 
            clientName: userName, 
            room: room
        });

        // Fetch chat history
        const roomHistory = await Chat.find({ room }).sort({ createdAt: 1 });
        socket.emit("chatHistory", roomHistory);
    });

    // Admin joins specific client room
    socket.on("joinClientChat", async (clientData) => {
        const { room } = clientData;
        
        socket.join(room);
        socket.currentRoom = room;
        console.log(`Admin joined client room: ${room}`);

        // Fetch chat history
        const roomHistory = await Chat.find({ room }).sort({ createdAt: 1 });
        socket.emit("chatHistory", roomHistory);
    });

    // Handle sending messages
    socket.on("sendMessage", async (msgData) => {
        try {
            console.log("Message received:", msgData);
            
            const { room, text, senderName, senderId, senderRole, fileUrl, fileType, fileName, fileSize } = msgData;
            
            // Determine message type
            let messageType = 'text';
            if (fileUrl) {
                if (fileType.startsWith('image/')) messageType = 'image';
                else if (fileType.startsWith('video/')) messageType = 'video';
                else if (fileType.startsWith('audio/')) messageType = 'audio';
                else messageType = 'file';
            }

            // Create message object
            const messageData = {
                room: room,
                text: text,
                senderName: senderName,
                senderId: senderId,
                senderRole: senderRole,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                seenBy: [senderId],
                messageType: messageType,
                // Add file fields if they exist
                ...(fileUrl && { fileUrl: fileUrl }),
                ...(fileType && { fileType: fileType }),
                ...(fileName && { fileName: fileName }),
                ...(fileSize && { fileSize: fileSize })
            };

            // Save to database
            const chatMessage = new Chat(messageData);
            await chatMessage.save();
            console.log("Message saved to DB");

            // Send to all in the room
            io.to(room).emit("newMessage", messageData);
            console.log("Message sent to room:", room);

        } catch (error) {
            console.error("Error handling message:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.userName || socket.id);
        
        // Remove from connected clients if it was a client
        if (socket.userId) {
            connectedClients.delete(socket.userId);
            io.to("admin").emit("clientDisconnected", socket.userId);
        }
    });
});

// ======================== Google Meet / Calendar ====================
const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "http://localhost:5000/auth/google/callback"
);

const SCOPES = ['https://www.googleapis.com/auth/calendar'];

// Google OAuth Routes
app.get('/auth/google', (req, res) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
    });
    res.redirect(url);
});

app.get('/auth/google/callback', async (req, res) => {
    const code = req.query.code;
    try {
        const { tokens } = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);
        req.session.tokens = tokens;
        res.redirect('/meet');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error during Google authentication.');
    }
});

app.get('/meet', (req, res) => {
    if (!req.session.tokens) {
        req.flash('error', 'Please log in with Google first!');
        return res.redirect('/auth/google');
    }
    res.render('admin/meetForm');
});

app.post('/create-meet', async (req, res) => {
    const { summary, startTime, endTime } = req.body;

    if (!req.session.tokens) return res.status(401).send("User not authenticated!");

    oauth2Client.setCredentials(req.session.tokens);
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    const event = {
        summary: summary || 'Google Meet Meeting',
        start: { dateTime: startTime },
        end: { dateTime: endTime },
        conferenceData: {
            createRequest: {
                requestId: "meet-" + Date.now(),
                conferenceSolutionKey: { type: "hangoutsMeet" }
            }
        }
    };

    try {
        const response = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
            conferenceDataVersion: 1
        });

        const meetLink = response.data.hangoutLink;
        res.json({ meetLink });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error creating Meet link');
    }
});

// ======================== Start Server ==============================
server.listen(5000, () => {
    console.log("✅ Server running on http://localhost:5000");
});