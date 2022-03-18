const { Router } = require("express");
const authorize = require("../middlewares/authorize");
const { imgUploader } = require("../../../img/multer");
const { saveFileLocation } = require("../middlewares/saveFileLocation");
const { getImg } = require("../../utils/getResource");

const router = Router();

router
  .get("/:fname", async (req, res) => {
    const { fname } = req.params;
    if (!fname) res.status(400).send("Bad request");
    res.send(await getImg(fname));
  })
  .post(
    "/",
    authorize,
    saveFileLocation,
    (req, res, next) => {
      imgUploader.single("file")(req, res, function (err) {
        if (err) return res.status(400).send(err.message);
        next();
      });
    },
    (req, res) => {
      const { uploadedFileName } = req.body;
      res.json({
        fname: uploadedFileName,
      });
    }
  );

module.exports = router;
