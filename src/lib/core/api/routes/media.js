const { Router } = require("express");
const authorize = require("../middlewares/authorize");
var path = require("path");
const fs = require("fs");
const router = Router();

router.use("", authorize);

module.exports = router;
