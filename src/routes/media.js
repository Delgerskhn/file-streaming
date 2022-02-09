const { Router } = require("express");
const authorize = require("../middlewares/authorize");
var path = require("path");
const fs = require("fs");
const router = Router();

//WARNING: MEDIA FILE NAME CANNOT CONTAIN .ts SUBSTRING!!!!!

router.use("", authorize);
router.get("/*.m3u8", (req, res) => {
  const filename = req.path.substring(1).replaceAll("%20", " ");
  const p = path.join(__dirname, "../videos", "hls", filename);
  fs.readFile(p, (err, data) => {
    if (err) res.status(400).send("file not found!");
    const tokenInsertedFile = data
      .toString()
      .replaceAll(".ts", ".ts?t=" + req.query.t);
    res.send(tokenInsertedFile);
  });
});

router.get("/*.ts", (req, res) => {
  const filename = req.path.substring(1).replaceAll("%20", " ");
  fs.readFile(
    path.join(__dirname, "../videos", "hls", filename),
    (err, data) => {
      if (err) res.status(400).send("file not found!");
      res.send(data);
    }
  );
});

module.exports = router;
