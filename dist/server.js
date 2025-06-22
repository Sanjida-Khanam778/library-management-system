"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookById = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
require("dotenv/config");
const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/library-management';
// MongoDB connection options for serverless
const mongooseOptions = {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    bufferMaxEntries: 0,
    bufferCommands: true, // Changed to true for serverless
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
// Global variable to track connection status
let isConnected = false;
// Connect to MongoDB
const connectDB = async () => {
    if (isConnected) {
        console.log('Using existing database connection');
        return;
    }
    try {
        await mongoose_1.default.connect(uri, mongooseOptions);
        isConnected = true;
        console.log('Connected to MongoDB successfully');
    }
    catch (error) {
        console.error('MongoDB connection failed:', error);
        isConnected = false;
    }
};
// Handle MongoDB connection events
mongoose_1.default.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    isConnected = false;
});
mongoose_1.default.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
    isConnected = false;
});
// Middleware to ensure DB connection before handling requests
app_1.default.use(async (req, res, next) => {
    if (!isConnected) {
        await connectDB();
    }
    next();
});
// Start server only if not in serverless environment
if (process.env.NODE_ENV !== 'production' || process.env.VERCEL !== '1') {
    connectDB().then(() => {
        app_1.default.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    });
}
// Export for Vercel
exports.default = app_1.default;
const getBookById = async (req, res, next) => {
    // ...
};
exports.getBookById = getBookById;
