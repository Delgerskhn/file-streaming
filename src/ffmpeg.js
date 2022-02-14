const ffmpeg = require("fluent-ffmpeg");
const ffmpegInstaller = require("@ffmpeg-installer/ffmpeg");

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

const convertToFfmpeg = (videoPath, outputPath) => {
  ffmpeg(videoPath, { timeout: 432000 })
    .addOptions([
      "-profile:v baseline",
      "-level 3.0",
      "-start_number 0",
      "-hls_time 10",
      // "-hls_key_info_file enc.keyinfo",
      "-hls_list_size 0",
      "-f hls",
    ])
    .output(outputPath)
    .on("end", (err, data) => {
      console.log("end", err, data);
    })
    .run();
};

module.exports = convertToFfmpeg;
