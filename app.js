require('dotenv').config({path: "./vars/.env"});
const {PORT} = process.env;
const express = require("express");
const path = require("path");
const cors = require("cors");
const createError = require("http-errors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const mongoose = require('mongoose')
const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(logger("dev"));
app.use(cors());
app.options("*", cors()); // Attach 'Access-Control-Allow-Origin' to preflight



app.get('/', (req, res) => {
    res.json({
        success: true,
    });
});

mongoose.connect(process.env.DB_URL).then(() => console.log('MongoDB connected...'))
.catch(error => console.log(error))

const authRouter = require("./src/routes/auth");
const questionRouter = require("./src/routes/question");
app.use("/auth", authRouter);
app.use("/question", questionRouter);

app.listen(PORT, () => {
    console.log(`server is listening at localhost:${PORT}`);
});