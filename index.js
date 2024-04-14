import express from 'express';
import 'dotenv/config';
import {connectDB} from './configs/db.cfg.js'
import router from './routes/index.js';
connectDB().then();
const PORT = process.env.PORT || 3002;
const app = express();

app.use(express.json());
app.use('/', router)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})