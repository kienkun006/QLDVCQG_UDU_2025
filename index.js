import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { AppRoute } from './routes/AppRoute.js';

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'GUI')));

AppRoute(app);

//---định tuyến ---
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'GUI/home.html'));
});

app.get('/Users', (req, res) => {
    res.sendFile(path.join(__dirname, 'GUI/Users/maniUsers.html'));
});

app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'GUI/admin/mainAdmin.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server chạy tại http://localhost:${PORT}/home`);
});
setInterval(() => {}, 1000); //  test sống