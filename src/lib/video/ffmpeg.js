const util = require("util");
const exec = util.promisify(require("child_process").exec);

const path = require("path");
const { randomUUID, randomBytes } = require("crypto");
const { writeFileSync } = require("fs");

const convertToFfmpeg = async (filename, videoPath, hostname) => {
  const basePath = path.join(__dirname, "../../../resource/videos");
  const key = randomBytes(8).toString("hex");
  const keyPath = path.join(basePath, filename + ".key");
  const keyInfoPath = path.join(basePath, filename + ".keyinfo");
  writeFileSync(keyPath, key);
  writeFileSync(keyInfoPath, `${hostname}/video/${filename}.key\n${keyPath}`);

  const commandToScaleSplitEncryptVideo = `ffmpeg -i ${videoPath}  
  -filter_complex  "[0:v]split=2[v1][v2]; [v1]scale=w=1280:h=720[v1out]; [v2]scale=w=640:h=360[v2out]"  
  -map [v1out] -c:v:0 libx264 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:0 3M -maxrate:v:0 3M -minrate:v:0 3M -bufsize:v:0 3M -preset slow -g 48 -sc_threshold 0 -keyint_min 48  
  -map [v2out] -c:v:1 libx264 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:1 1M -maxrate:v:1 1M -minrate:v:1 1M -bufsize:v:1 1M -preset slow -g 48 -sc_threshold 0 -keyint_min 48  
  -map a:0 -c:a:0 aac -b:a:0 96k -ac 2  
  -map a:0 -c:a:1 aac -b:a:1 48k -ac 2  -f 
  hls  
  -hls_time 10
  -hls_playlist_type vod  
  -hls_flags independent_segments 
  -hls_segment_type mpegts  
  -hls_key_info_file ${keyInfoPath} 
  -hls_segment_filename ${path.join(basePath, filename)}_%v/data%02d.ts  
  -master_pl_name ${filename}.m3u8  
  -var_stream_map "v:0,a:0 v:1,a:1" ${path.join(
    basePath,
    filename
  )}_%v/stream.m3u8
`;

  const { stdout, stderr } = await exec(
    commandToScaleSplitEncryptVideo.split("\n").join(" ")
  );
  if (stderr) {
    console.error(`error: ${stderr}`);
  }
  console.log(`Number of files ${stdout}`);
};

// convertToFfmpeg(
//   "1234.mp4",
//   path.join(__dirname, "videos", "1234.mp4"),
//   path.join(__dirname, "videos", "index.m3u8")
// );

module.exports = { convertToFfmpeg };

// ffmpeg -i C:\Users\delge\source\repos\elearn-video-service\src\videos\9d3d0e81-6839-48c0-a099-6065fab12de3.mp4 -filter_complex  "[0:v]split=3[v1][v2][v3];  [v1]copy[v1out]; [v2]scale=w=1280:h=720[v2out]; [v3]scale=w=640:h=360[v3out]" -map [v1out] -c:v:0 libx264 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:0 5M -maxrate:v:0 5M -minrate:v:0 5M -bufsize:v:0 10M -preset slow -g 48 -sc_threshold 0 -keyint_min 48 -map [v2out] -c:v:1 libx264 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:1 3M -maxrate:v:1 3M -minrate:v:1 3M -bufsize:v:1 3M -preset slow -g 48 -sc_threshold 0 -keyint_min 48 -map [v3out] -c:v:2 libx264 -x264-params "nal-hrd=cbr:force-cfr=1" -b:v:2 1M -maxrate:v:2 1M -minrate:v:2 1M -bufsize:v:2 1M -preset slow -g 48 -sc_threshold 0 -keyint_min 48 -map a:0 -c:a:0 aac -b:a:0 96k -ac 2 -map a:0 -c:a:1 aac -b:a:1 96k -ac 2 -map a:0 -c:a:2 aac -b:a:2 48k -ac 2  -f hls -hls_time 2 -hls_playlist_type vod -hls_flags independent_segments -hls_segment_type mpegts -hls_segment_filename stream_%v/data%02d.ts -master_pl_name master.m3u8 -var_stream_map "v:0,a:0 v:1,a:1 v:2,a:2" stream_%v.m3u8
