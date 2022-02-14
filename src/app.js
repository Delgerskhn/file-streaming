// convertToFfmpeg(
//   path.join(__dirname, "videos", "xxanu - silence.mp4"),
//   path.join(__dirname, "videos", "hls", "xxanu - silence.m3u8")
// );

const express = require("express");
const mediaRouter = require("./routes/media");
const uploadRouter = require("./routes/upload");
const app = express();

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
