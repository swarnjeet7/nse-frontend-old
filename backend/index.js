const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const upload = require("express-fileupload");
require("dotenv").config();

// Middleware
app.use(cors);
app.use(upload());
app.use(bodyParser.json());

const cashReportsRoutes = require("./routes/cash-reports");

app.get("/", function (req, res) {
  res.send("App working");
});

app.use("/cash-reports", cashReportsRoutes);

mongoose.connect(process.env.DB_CONNECTION_URL, () => {
  console.log("db connected");
});

//to set the port export PORT=5000;
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`app is working on localhost:${port}`);
});
