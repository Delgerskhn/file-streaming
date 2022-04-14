const whitelist = [
  "video/x-flv",
  "video/mp4",
  "video/quicktime",
  "video/x-msvideo",
  "video/x-ms-wmv",
  "video/webm",
  "video/ogg",
  "video/x-f4v",
  "video/x-matroska",
  "video/MP2T",
  "video/3gpp",
];

const validateVideoType = (req, file, cb) => {
  if (!whitelist.includes(file.mimetype)) {
    return cb(new Error("File type not supported!"));
  }

  cb(null, true);
};

module.exports = { validateVideoType };
