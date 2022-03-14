const { Router } = require("express");
const authorize = require("../middlewares/authorize");
const { imgUploader } = require("../lib/img/multer");

const router = Router();

router.post(
  "/",
  authorize,
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
