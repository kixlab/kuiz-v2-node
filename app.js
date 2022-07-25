// require("dotnev").config();
const express = require('express');
const app = express();
const port = 4000;
require('dotenv').config();

app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});

const mongoose = require('mongoose')
mongoose.connect(process.env.DB_URL).then(() => console.log('MongoDB connected...'))
.catch(error => console.log(error))

app.listen(port, () => {
    console.log(`server is listening at localhost:${port}`);
});