const { Router } = require("express");
const authorize = require("../middlewares/authorize");
var path = require("path");
const fs = require("fs");
const router = Router();

//WARNING: MEDIA FILE NAME CANNOT CONTAIN .ts SUBSTRING!!!!!

router.use("", authorize);
router.get("/*.m3u8$", (req, res) => {
  console.log("m3u8");
  const filename = req.path.substring(1).replaceAll("%20", " ");
  const p = path.join(__dirname, "../videos", filename);
  fs.readFile(p, (err, data) => {
    if (err) return res.status(400).send("file not found!");
    const tokenInsertedFile = data
      .toString()
      .replaceAll(".m3u8", ".m3u8?t=" + req.query.t)
      .replaceAll(".ts", ".ts?t=" + req.query.t)
      .replace(".key", ".key?t=" + req.query.t);
    res.send(tokenInsertedFile);
  });
});

router.get("/:chunkPath/*.m3u8$", (req, res) => {
  const filename = req.path.substring(1).replaceAll("%20", " ");
  const p = path.join(__dirname, "../videos", filename);
  console.log("chunkm3u8");
  fs.readFile(p, (err, data) => {
    if (err) return res.status(400).send("file not found!");
    const tokenInsertedFile = data
      .toString()
      .replaceAll(".ts", ".ts?t=" + req.query.t)
      .replace(".key", ".key?5=" + req.query.t);
    res.send(tokenInsertedFile);
  });
});

router.get("/:chunkPath/*.ts$", (req, res) => {
  const filename = req.path.substring(1).replaceAll("%20", " ");
  console.log(filename);
  fs.readFile(path.join(__dirname, "../videos", filename), (err, data) => {
    if (err) res.status(400).send("file not found!");
    res.send(data);
  });
});

router.get("/*.key$", (req, res) => {
  const filename = req.path.substring(1).replaceAll("%20", " ");
  fs.readFile(path.join(__dirname, "../videos", filename), (err, data) => {
    if (err) res.status(400).send("file not found!");
    res.send(data);
  });
});

module.exports = router;
