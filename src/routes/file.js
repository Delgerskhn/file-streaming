const { Router } = require("express");
const authorize = require("../middlewares/authorize");
const { fileUploader } = require("../lib/file/multer");

const router = Router();

router.post(
  "/",
  authorize,
  (req, res, next) => {
    fileUploader.single("file")(req, res, function (err) {
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
