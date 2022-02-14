// convertToFfmpeg(
//   path.join(__dirname, "videos", "xxanu - silence.mp4"),
//   path.join(__dirname, "videos", "hls", "xxanu - silence.m3u8")
// );

const express = require("express");
var cors = require("cors");
const mediaRouter = require("./routes/media");
const uploadRouter = require("./routes/upload");
const app = express();
var whitelist = [
  "http://localhost:8080",
  "http://localhost:4000",
  "http://localhost:3000",
  "http://103.50.205.199:3000",
];
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
app.use("/upload", uploadRouter);

app.get("/player", (req, res) => {
  res.sendFile(`${__dirname}/client.html`);
});

app.get("/enc.key", (req, res) => {
  res.sendFile(path.join(__dirname, "../enc.key"));
});

app.listen(8080, () => {
  console.log("listening on port 8080");
});

module.exports = app;
