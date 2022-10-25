const { RESOURCE_PATH } = require("../../../const/paths");

const path = require("path");
const fs = require("fs");

const getImg = (fname) => {
  return new Promise((res, rej) =>
    fs.readFile(path.join(RESOURCE_PATH, "images", fname), (err, data) => {
      if (err) {
        rej(err);
      }
      res(data);
    })
  );
};

const getFile = (fname) => {
  return new Promise((res, rej) =>
    fs.readFile(path.join(RESOURCE_PATH, "files", fname), (err, data) => {
      if (err) rej(err);
      res(data);
    })
  );
};

const getVideo = (fname) => {
  return new Promise((res, rej) =>
    fs.readFile(path.join(RESOURCE_PATH, "videos", fname), (err, data) => {
      if (err) rej(err);
      res(data);
    })
  );
};

const getPublicVideo = (fname) => {
  return new Promise((res, rej) =>
    fs.readFile(
      path.join(RESOURCE_PATH, "publicVideos", fname),
      (err, data) => {
        if (err) rej(err);
        res(data);
      }
    )
  );
};

module.exports = {
  getImg,
  getFile,
  getVideo,
  getPublicVideo,
};
