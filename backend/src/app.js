const express = require("express");
require("dotenv").config();

const app = express();

// middlewares
app.use(express.json())   // parse incoming json bodies

// Routes
const assetRoute = require('./routes/assetRoute');
const testRoutes = require('./routes/testRoutes');
const userRoutes = require("./routes/userRoutes")
const departmentRoutes = require("./routes/departmentRoute")
app.use('/api/assets', assetRoute);
app.use('/api', testRoutes);
app.use('/api/users', userRoutes)
app.use('/api/departments', departmentRoutes)

app.get("/", (req, res) => {
  res.send("We are live...");
});

module.exports = app;
