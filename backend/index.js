const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const helpers = require("./utilities/helper");
require("dotenv").config();

// Middleware
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
const portfolioScript = require("./routes/portfolioScript");
const user = require("./routes/user");
const pivot = require("./routes/pivot");

app.get("/", function (req, res) {
  res.send("App working");
});

app.use("/cash-reports", helpers.verifyToken, cashReportsBhavcopy);
app.use("/fo-reports", helpers.verifyToken, foReportsBhavcopy);
app.use("/portfolio", helpers.verifyToken, portfolio);
app.use("/pivot", helpers.verifyToken, pivot);
app.use("/portfolioScript", helpers.verifyToken, portfolioScript);
app.use("/user", user);

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
