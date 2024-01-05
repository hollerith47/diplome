const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (error) => {
  console.log(error);
  console.log("UNCAUGHT Exception! Shutting down ...");
  process.exit(1);
});

const http = require("http");

const server = http.createServer(app);

const DB = process.env.DB_URI.replace(
  "<PASSWORD>",
  process.env.DB_PASSWORD
).replace("<USERNAME>", process.env.DB_USERNAME);
// console.log(DB)
mongoose
  .connect(DB, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    // useUnifiedToplogy: true,
  })
  .then((con) => {
    console.log("connection to database successfully");
  })
  .catch((error) => {
    console.error(error);
  });

// console.log(DB);

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log("App running on port " + port);
});

process.on("unhandledRejection", (error) => {
  console.log(error);
  server.close(() => {
    process.exit(1);
  });
});
