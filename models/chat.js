const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    room: { 
        type: String, 
        required: true
    },
    senderId: { 
        type: String, 
        required: true 
    },
    senderName: { 
        type: String, 
        required: true 
    },
    senderRole: { 
        type: String, 
        required: true 
    },
    text: { 
        type: String
    },
    fileUrl: { 
        type: String 
    },
    fileType: { 
        type: String 
    },
    fileName: {
        type: String
    },
    fileSize: {
        type: Number
    },
    time: { 
        type: String 
    },
    seenBy: [{ 
        type: String
    }],
    messageType: {
        type: String,
        enum: ['text', 'file', 'image', 'video', 'audio'],
        default: 'text'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Chat", chatSchema);