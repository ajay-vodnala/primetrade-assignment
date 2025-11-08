import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("mongoose database is connected"))
.catch((error)=>console.log(error))

app.use('/user',userRoutes);
app.use('/task',taskRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
