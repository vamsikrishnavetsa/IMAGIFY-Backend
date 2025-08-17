import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import connectDB from './configs/mongodb.js';
import imageRouter from './routes/imageRoutes.js';

// App Config
const PORT = process.env.PORT || 4000;
const app = express();

// ❗Fix: Top-level `await` is only allowed in ES modules. 
// Make sure your `package.json` has: `"type": "module"`
await connectDB();

// Initialize Middlewares
app.use(express.json());
app.use(cors({
  origin: "https://imagify-frontend-xi.vercel.app", // ❗ Fix: Extra closing bracket `]` removed
  methods: ["POST", "DELETE", "GET", "PUT", "PATCH"],
  credentials: true,
}));

// API routes
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);

app.get('/', (req, res) => res.send("API Working"));

// Start server
app.listen(PORT, () => console.log('Server running on port ' + PORT));
