const { Router } = require("express");
const { videoUploader } = require("../../../../video/multer");
const { getVideo } = require("../../../utils/getResource");
const authorize = require("../../middlewares/authorize");
const router = Router();
const { saveFileLocation } = require("../../middlewares/saveFileLocation");
const path = require("path");
const { RESOURCE_PATH } = require("../../../../../const/paths");
router.use(authorize);

router.get("/:fname", async (req, res) => {
  const { fname } = req.params;
  if (!fname) res.status(400).send("Bad request");
  getVideo(fname)
    .then((buff) => res.send(buff))
    .catch((e) => res.status(404).send("File not found!"));
});

router.post(
  "/",
  (req, res, next) => {
    videoUploader(path.join(RESOURCE_PATH, "videos")).single("file")(
      req,
      res,
      function (err) {
        if (err) return res.status(400).send(err.message);
        next();
      }
    );
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
