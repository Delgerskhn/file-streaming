const exceptionHandler = (req, res, next) => {
  console.log("exception handler");
  try {
    next();
  } catch (e) {
    console.log("exception handler error");
    console.log(e);
    res.status(500).send(e);
  }
};

module.exports = {
  exceptionHandler,
};
