const { default: axios } = require("axios");

const saveFileLocation = (req, res, next) => {
  res.on("finish", () => {
    const { uploadedFileName } = req.body;
    const data = {
      file: uploadedFileName,
      host: req.protocol + "://" + req.get("host"),
    };
    console.log(data);
    axios
      .post(`${process.env.ELEARN_APP_HOST}/api/file`, data)
      .then((res) => console.log(res.data))
      .catch((error) => {
        return console.log(error.message);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log("response data", error.response.data);
          // console.log("response status", error.response.status);
          // console.log("response headers", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log("request", error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log("error config", error.config);
      });
  });
  next();
};

module.exports = { saveFileLocation };
