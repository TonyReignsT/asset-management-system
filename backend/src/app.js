const express = require("express");
require("dotenv").config();

const app = express();

// middlewares
app.use(express.json()); // parse incoming json bodies

// Routes
const userRoutes = require("./users/users.route");
const departmentRoutes = require("./departments/departments.route");

app.use("/api/users", userRoutes);
app.use("/api/departments", departmentRoutes);

app.get("/", (req, res) => {
  res.send("We are live...");
});

module.exports = app;
