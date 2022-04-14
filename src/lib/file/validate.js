const whitelist = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/msword",
  "application/vnd.openxmlformats",
  "officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/epub+zip",
  "application/zip",
  "application/vnd.rar",
  "text/plain",
];

const fileValidator = (req, file, cb) => {
  if (!whitelist.includes(file.mimetype)) {
    return cb(new Error("File type not supported!"));
  }

  cb(null, true);
};

module.exports = {
  fileValidator,
};
