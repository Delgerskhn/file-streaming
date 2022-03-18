const jwt = require("jsonwebtoken");

const authorize = (req, res, next) => {
  const { t } = req.query;
  if (!t) return res.status(401).send("Not authorized");

  jwt.verify(t, "TOP_SECRET", (err, decoded) => {
    if (err) return res.status(401).send("Not authorized");
    req.user = decoded.user;
    next();
  });
};

module.exports = authorize;
