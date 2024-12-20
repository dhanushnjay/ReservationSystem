const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/notices', require('./routes/notice'));
app.use('/api/users', require('./routes/user'));
app.use('/api/lecturehalls', require('./routes/lecturehall')); // Add this line
app.use('/api/bookingrequests', require('./routes/bookingrequests'));
app.use('/api/labs', require('./routes/labs'));
app.use('/api/reservations', require('./routes/reservations'));
app.use('/api/semester', require('./routes/semester'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
