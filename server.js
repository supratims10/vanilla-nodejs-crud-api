const http = require("http");
let movies = require("./data/movies.json");

// Import API methods
const getReq = require("./methods/get");
const postReq = require("./methods/post");
const putReq = require("./methods/put");
const deleteReq = require("./methods/delete");

const PORT = process.env.PORT || 5001;

const server = http.createServer((req, res) => {
  req.movies = movies;

  switch (req.method) {
    case "GET":
      getReq(req, res);
      break;
    case "POST":
      postReq(req, res);
      break;
    case "PUT":
      putReq(req, res);
      break;
    case "DELETE":
      deleteReq(req, res);
      break;
    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          title: "Not Found",
          message: "Route not found",
        })
      );
  }
});

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
