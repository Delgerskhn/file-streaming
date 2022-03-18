const { Router } = require("express");
const { fileUploader } = require("../../../file/multer");
const { saveFileLocation } = require("../middlewares/saveFileLocation");
const authorize = require("../middlewares/authorize");
const { getFile } = require("../../utils/getResource");

const router = Router();

router
  .get("/:fname", async (req, res) => {
    const { fname } = req.params;
    if (!fname) res.status(400).send("Bad request");
    res.send(await getFile(fname));
  })
  .post(
    "/",
    authorize,
    (req, res, next) => {
      fileUploader.single("file")(req, res, function (err) {
        if (err) return res.status(400).send(err.message);
        next();
      });
    },
    saveFileLocation,
    (req, res) => {
      const { uploadedFileName } = req.body;
      res.json({
        fname: uploadedFileName,
      });
    }
  );

module.exports = router;
