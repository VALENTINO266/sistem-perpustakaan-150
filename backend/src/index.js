require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
    res.json({ message: "Welcome to Sistem Perpustakaan SDN 150 OKU API" });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});