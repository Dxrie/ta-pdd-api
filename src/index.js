const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

const userRoute = require("./Routes/userRoute");

mongoose
  .connect(process.env.MongooseURI)
  .then(() => {
    console.log("MongoDB Connection Established.");
  })
  .catch((err) => {
    console.log("MongoDB Connection Failed: " + err);
  });

app.use(
  cors({
    allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
    exposedHeaders: ["authorization"], // you can change the headers
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json("Something is wrong!");
});

app.get("/", (req, res, next) => {
  res.send("API is up and running");
});

app.use("/api/users", userRoute);

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
