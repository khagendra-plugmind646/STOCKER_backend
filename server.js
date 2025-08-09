import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import productRoute from './routes/productRoute.js';
import userRoute from './routes/userRoute.js';
import contactRoute from './routes/contactRoute.js';
import errorHandler from './middleWare/errorMiddleware.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module fix for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
// PORT will be set by Railway

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS Configuration
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://inventory-manager-webapp.vercel.app',
  'https://*.vercel.app',
  'https://*.railway.app'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
//Route Middleware

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/contactUs", contactRoute);

//Routes

app.get("/", (req, res) => {
  res.send("This is Working Fine-Home Page");
});

//Error Middleware
app.use(errorHandler);

// Connect to MongoDB and Start Server
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on PORT ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
