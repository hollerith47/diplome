const express = require('express');

const routes = require('./routes');

const morgan = require('morgan');

const rateLimit = require("express-rate-limit");

const helmet = require("helmet");
const mongosanitize = require("express-mongo-sanitize");

const bodyParser = require('body-parser');

const xss = require('xss');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: "*",
    methods: ['GET', 'PATCH', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json({ limit : "10kb"}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());
if (process.env.NODE_ENV === 'development'){
    app.use(morgan("dev"));
}
const limiter = rateLimit({
    max: 3000,
    windowMs: 60 * 60 * 1000, // in one hour 3000 request
    message : 'Rate limit exceeded from this IP'
})
app.use("/", limiter);

app.use(express.urlencoded({
    extended: true,
}));

app.use(mongosanitize());
// app.use(xss());

app.use(routes);
app.use("/status", (req, res)=>{
    return res.status(200).json({
        status: "OK",
        message: "backend server responded"
    });
})

//http://localhost:5000/v1/auth/login
module.exports = app;
