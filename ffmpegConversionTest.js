const { convertToFfmpeg } = require("./src/lib/video/ffmpeg");
const path = require("path");
const { RESOURCE_PATH } = require("./src/const/paths");

convertToFfmpeg(
  "ea763717-1cb1-4fe7-b3bc-6829ab825e64.mp4",
  path.join(RESOURCE_PATH, "publicVideos"),
  "http://localhost:3535/public/video"
);
