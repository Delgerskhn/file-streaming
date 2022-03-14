const whitelist = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const imgValidator = (req, file, cb) => {
  if (!whitelist.includes(file.mimetype)) {
    return cb(new Error("File type not supported!"));
  }

  cb(null, true);
};

module.exports = {
  imgValidator,
};
