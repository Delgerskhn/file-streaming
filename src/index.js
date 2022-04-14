const app = require("./app");
console.info("NODE_ENV:", process.env.NODE_ENV);
app.listen(3535, () => {
  console.log("hls streaming service listening on port 3535");
});
