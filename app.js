const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");
const cors = require("cors");
const env = require("dotenv").config();  // dotenv file is created to define constant
const LoginAPIRoutes = require("./router/LoginAPIRoutes");



app.use(bodyParse.json()) // it help to interpret the data in the body of an HTTP request.

const allowedOrigins = [
    'http://127.0.0.1:5500',  // Add other allowed origins here
];

const corsOptions = {
    origin: 'allwoedOrigins',
    methods: 'GET,PUT,POST,DELETE',
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Connection establish

const dburl = process.env.DBURL;  // process.env help to access the environment variable of the current process.

mongoose.connect(dburl).then(() => {
    console.log("Connection established");
}).catch((err) => {
    console.log(err);
})

// MiddleWare
app.use(cookieParser());

const port = process.env.PORT || 3000;  // define port

app.listen(port, () => {
    console.log(`Server is running on the port ${port}`);
})

// Default Route work as a middleware

app.options('*', cors());

app.use("/api/users", LoginAPIRoutes)