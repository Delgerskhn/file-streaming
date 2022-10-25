const { Router } = require("express");
const router = Router();
const videoRoute = require("./video");

router.use("/video", videoRoute);

module.exports = router;
