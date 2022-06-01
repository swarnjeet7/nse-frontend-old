const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
// const cors = require("cors");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
require("dotenv").config();

// Middleware
// app.use(cors);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(bodyParser.json());

const cashReportsBhavcopy = require("./routes/cashReportsBhapcopy");
const foReportsBhavcopy = require("./routes/foReportsBhavcopy");
const portfolio = require("./routes/portfolio");

app.get("/", function (req, res) {
  res.send("App working");
});

app.use("/cash-reports", cashReportsBhavcopy);
app.use("/fo-reports", foReportsBhavcopy);
app.use("/portfolio", portfolio);

mongoose.connect(
  process.env.DB_CONNECTION_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("db connected");
  }
);

//to set the port export PORT=5000;
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`app is working on localhost:${port}`);
});
