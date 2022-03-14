const express = require("express");
var cors = require("cors");
require("dotenv").config();

const mediaRouter = require("./routes/media");
const videoUploadRouter = require("./routes/upload");
const imgUploadRouter = require("./routes/imgupload");
const fileUploadRouter = require("./routes/file");
const app = express();
console.log(process.env.ELEARN_APP_HOST);
var whitelist = [process.env.ELEARN_APP_HOST, "http://localhost:3535"];
app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (origin === undefined || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by cors"));
      }
    },
  })
);
app.use("/media", mediaRouter);
app.use("/upload", videoUploadRouter);
app.use("/upload/img", imgUploadRouter);
app.use("/upload/file", fileUploadRouter);

app.get("/player", (req, res) => {
  res.sendFile(`${__dirname}/client.html`);
});

app.get("/enc.key", (req, res) => {
  res.sendFile(path.join(__dirname, "../enc.key"));
});

module.exports = app;
