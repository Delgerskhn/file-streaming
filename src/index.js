const app = require("./app");
console.log(process.env.NODE_ENV);
app.listen(3535, () => {
  console.log("hls streaming service listening on port 3535");
});
