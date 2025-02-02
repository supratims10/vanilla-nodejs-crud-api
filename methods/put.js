const requestBodyParser = require("../util/bodyparser");
const writeFile = require("../util/writeFile");

module.exports = async (req, res) => {
  let parts = req.url.split("/");
  let id = parts.pop();
  let baseURL = parts.join("/");

  const regex = new RegExp(/^cq-\d+-\d+-[a-z]{2}$/);

  if (!regex.test(id)) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        title: "Validation failed",
        message: "id not found",
      })
    );
  } else if (baseURL == "/api/movies" && regex.test(id)) {
    try {
      let body = await requestBodyParser(req);
      const index = req.movies.findIndex((movie) => {
        return movie.id === id;
      });
      if (index == -1) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({
            title: "Not found",
            message: "corresponding movie not found",
          })
        );
      } else {
        req.movies[index] = { id, ...body };
        writeFile(req.movies);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(req.movies[index]));
      }
    } catch (err) {
      console.log(err);
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          title: "Validation failed",
          message: "body not valid",
        })
      );
    }
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        title: "Not Found",
        message: "Route not found",
      })
    );
  }
};
